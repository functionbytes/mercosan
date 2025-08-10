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
        // Use product subtotal (without shipping) for free shipping threshold calculation
        $productSubtotal = $checkoutOrderData->rawTotal - $checkoutOrderData->promotionDiscountAmount - $checkoutOrderData->couponDiscountAmount;
        $productSubtotal = max($productSubtotal, 0);
        
        // Get current shipping selection from request
        $selectedShippingOption = $request->input('shipping_option', data_get($sessionCheckoutData, 'shipping_option'));
        $selectedShippingMethod = $request->input('shipping_method', data_get($sessionCheckoutData, 'shipping_method'));
        
        $shippingData = [
            'order_total' => $productSubtotal, // Use product subtotal, not total with shipping
            'city' => data_get($sessionCheckoutData, 'city'),
            'state' => data_get($sessionCheckoutData, 'state'),
            'country' => data_get($sessionCheckoutData, 'country') ?: 'CO', // Default to Colombia
            'weight' => $products->sum('weight'),
            'shipping_option' => $selectedShippingOption,
            'shipping_method' => $selectedShippingMethod,
        ];

        // FIRST: Check if free shipping should be auto-applied based on order total (highest priority)
        $shouldAutoApplyFreeShipping = $freeShippingHandler->shouldAutoApplyFreeShipping($shippingData);
        $skipShippingSelection = $shouldAutoApplyFreeShipping && $freeShippingHandler->shouldSkipShippingSelection($shippingData);

        \Log::info('PublicUpdateCheckoutController: Free shipping check', [
            'product_subtotal' => $productSubtotal,
            'order_amount_with_shipping' => $checkoutOrderData->orderAmount,
            'selectedShippingOption' => $selectedShippingOption,
            'selectedShippingMethod' => $selectedShippingMethod,
            'shouldAutoApplyFreeShipping' => $shouldAutoApplyFreeShipping,
            'skipShippingSelection' => $skipShippingSelection
        ]);

        // Always use business rules service for consistent shipping method handling
        $validatedShipping = $checkoutOrderData->shipping;
        $shippingSummary = [
            'skip_delivery_selection' => false,
            'auto_applied_free_shipping' => false,
            'message' => null
        ];

        add_filter('payment_order_total_amount', function () use ($checkoutOrderData) {
            return $checkoutOrderData->orderAmount - $checkoutOrderData->paymentFee;
        }, 120);

        $shippingViewData = [
            'shipping' => $validatedShipping ?: $checkoutOrderData->shipping,
            'defaultShippingOption' => $checkoutOrderData->defaultShippingOption,
            'defaultShippingMethod' => $checkoutOrderData->defaultShippingMethod,
            'shippingSummary' => $shippingSummary,
            'orderTotal' => $checkoutOrderData->orderAmount,
            'skipShippingSelection' => false, // Always allow shipping selection
        ];


        $shippingMethodsHtml = view('plugins/ecommerce::orders.partials.shipping-methods', $shippingViewData)->render();

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
