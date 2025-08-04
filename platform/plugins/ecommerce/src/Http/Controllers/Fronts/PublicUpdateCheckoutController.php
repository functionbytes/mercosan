<?php

namespace Botble\Ecommerce\Http\Controllers\Fronts;

use Botble\Base\Http\Controllers\BaseController;
use Botble\Ecommerce\Facades\Cart;
use Botble\Ecommerce\Facades\OrderHelper;
use Botble\Ecommerce\Services\HandleCheckoutOrderData;
use Botble\Ecommerce\Services\HandleTaxService;
use Botble\Ecommerce\Services\DynamicShippingValidationService;
use Botble\Ecommerce\Services\FreeShippingAutoHandler;
use Botble\Ecommerce\Models\ShippingRule;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class PublicUpdateCheckoutController extends BaseController
{
    public function __invoke(
        Request $request, 
        HandleCheckoutOrderData $handleCheckoutOrderData,
        DynamicShippingValidationService $dynamicShippingValidation,
        FreeShippingAutoHandler $freeShippingHandler
    )
    {
        \Log::info('PublicUpdateCheckoutController: AJAX request received', [
            'request_data' => $request->all(),
            'url' => $request->url(),
            'method' => $request->method()
        ]);

        $sessionCheckoutData = OrderHelper::getOrderSessionData(
            $token = OrderHelper::getOrderSessionToken()
        );
        
        // Handle address data - support both nested address format and direct fields
        $addressData = $request->input('address', []);
        
        // If city/state/country are sent directly (not nested in address), merge them
        if (!isset($addressData['city']) && $request->has('city')) {
            $addressData['city'] = $request->input('city');
        }
        if (!isset($addressData['state']) && $request->has('state')) {
            $addressData['state'] = $request->input('state');
        }
        if (!isset($addressData['country']) && $request->has('country')) {
            $addressData['country'] = $request->input('country');
        }
        
        // Update session data with address information
        if (!empty($addressData)) {
            $sessionCheckoutData = array_merge($sessionCheckoutData, $addressData);
            OrderHelper::setOrderSessionData($token, $sessionCheckoutData);
        }
        
        \Log::info('PublicUpdateCheckoutController: Updated session data', [
            'session_data' => $sessionCheckoutData,
            'address_data' => $addressData,
            'token' => $token
        ]);

        /**
         * @var Collection $products
         */
        $products = Cart::instance('cart')->products();

        $checkoutOrderData = $handleCheckoutOrderData->execute(
            $request,
            $products,
            $token,
            $sessionCheckoutData
        );

        app(HandleTaxService::class)->execute($products, $sessionCheckoutData);
        
        // Validate and enhance shipping methods based on order total and location
        $shippingData = [
            'order_total' => $checkoutOrderData->orderAmount,
            'city' => data_get($sessionCheckoutData, 'city'),
            'state' => data_get($sessionCheckoutData, 'state'),
            'country' => data_get($sessionCheckoutData, 'country') ?: 'CO', // Default to Colombia
            'weight' => $products->sum('weight'),
        ];
        
        // First check normal shipping validation to see if city-specific rates are available
        $validatedShipping = $dynamicShippingValidation->validateShippingMethods($shippingData);
        
        // Always disable free shipping auto-handler when we have city-specific shipping logic
        $hasCitySpecificRates = $this->hasCitySpecificRates($shippingData['city']);
        $shouldAutoApplyFreeShipping = false; // Disable auto free shipping completely
        $skipShippingSelection = false;
        
        $shippingSummary = $dynamicShippingValidation->getShippingMethodsSummary(
            $checkoutOrderData->orderAmount,
            data_get($sessionCheckoutData, 'city')
        );
        
        // Override summary if free shipping is auto-applied
        if ($shouldAutoApplyFreeShipping) {
            $shippingSummary['skip_delivery_selection'] = true;
            $shippingSummary['auto_applied_free_shipping'] = true;
        }

        add_filter('payment_order_total_amount', function () use ($checkoutOrderData) {
            return $checkoutOrderData->orderAmount - $checkoutOrderData->paymentFee;
        }, 120);

        $shippingViewData = [
            'shipping' => $validatedShipping ?: $checkoutOrderData->shipping,
            'defaultShippingOption' => $shouldAutoApplyFreeShipping ? 'free_shipping_auto' : $checkoutOrderData->defaultShippingOption,
            'defaultShippingMethod' => $shouldAutoApplyFreeShipping ? 'default' : $checkoutOrderData->defaultShippingMethod,
            'shippingSummary' => $shippingSummary,
            'orderTotal' => $checkoutOrderData->orderAmount,
            'skipShippingSelection' => $skipShippingSelection ?? false,
        ];
        
        \Log::info('PublicUpdateCheckoutController: Template view data', [
            'shipping_count' => is_array($shippingViewData['shipping']) ? count($shippingViewData['shipping']) : 0,
            'shipping_data' => $shippingViewData['shipping'],
            'defaultShippingOption' => $shippingViewData['defaultShippingOption'],
            'defaultShippingMethod' => $shippingViewData['defaultShippingMethod'],
            'skipShippingSelection' => $shippingViewData['skipShippingSelection']
        ]);
        
        $shippingMethodsHtml = view('plugins/ecommerce::orders.partials.shipping-methods', $shippingViewData)->render();
        
        \Log::info('PublicUpdateCheckoutController: Response data', [
            'shipping_methods_html_length' => strlen($shippingMethodsHtml),
            'shipping_data_count' => is_array($validatedShipping) ? count($validatedShipping) : 0,
            'has_validated_shipping' => !empty($validatedShipping),
            'original_shipping_count' => is_array($checkoutOrderData->shipping) ? count($checkoutOrderData->shipping) : 0
        ]);

        return $this
            ->httpResponse()
            ->setData([
                'amount' => view('plugins/ecommerce::orders.partials.amount', [
                    'products' => $products,
                    'rawTotal' => $checkoutOrderData->rawTotal,
                    'orderAmount' => $checkoutOrderData->orderAmount,
                    'shipping' => $checkoutOrderData->shipping,
                    'sessionCheckoutData' => $sessionCheckoutData,
                    'shippingAmount' => $checkoutOrderData->shippingAmount,
                    'promotionDiscountAmount' => $checkoutOrderData->promotionDiscountAmount,
                    'couponDiscountAmount' => $checkoutOrderData->couponDiscountAmount,
                    'paymentFee' => $checkoutOrderData->paymentFee,
                ])->render(),
                'payment_methods' => view('plugins/ecommerce::orders.partials.payment-methods', [
                    'orderAmount' => $checkoutOrderData->orderAmount,
                ])->render(),
                'shipping_methods' => $shippingMethodsHtml,
            ]);
    }
    
    /**
     * Check if the selected city has specific shipping rates configured
     */
    protected function hasCitySpecificRates(?string $city): bool
    {
        if (!$city) {
            return false;
        }
        
        // Check if there are any shipping rules with items that match this city
        $hasRules = ShippingRule::whereHas('items', function ($query) use ($city) {
            $query->where('is_enabled', true)
                  ->where('city', $city);
        })->exists();
        
        \Log::info('PublicUpdateCheckoutController: City-specific rates check', [
            'city' => $city,
            'has_city_specific_rates' => $hasRules
        ]);
        
        return $hasRules;
    }
}
