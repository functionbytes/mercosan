<?php

namespace Botble\Ecommerce\Http\Controllers\Fronts;

use Botble\Base\Http\Controllers\BaseController;
use Botble\Ecommerce\AdsTracking\FacebookPixel;
use Botble\Ecommerce\AdsTracking\GoogleTagManager;
use Botble\Ecommerce\Enums\DiscountTypeEnum;
use Botble\Ecommerce\Facades\Cart;
use Botble\Ecommerce\Facades\EcommerceHelper;
use Botble\Ecommerce\Facades\OrderHelper;
use Botble\Ecommerce\Http\Requests\CartRequest;
use Botble\Ecommerce\Http\Requests\UpdateCartRequest;
use Botble\Ecommerce\Models\Discount;
use Botble\Ecommerce\Models\Product;
use Botble\Ecommerce\Services\HandleApplyCouponService;
use Botble\Ecommerce\Services\HandleApplyPromotionsService;
use Botble\Ecommerce\Services\HandleCheckoutOrderData;
use Botble\Ecommerce\Services\HandleTaxService;
use Botble\Ecommerce\Services\DynamicShippingValidationService;
use Botble\Ecommerce\Services\FreeShippingAutoHandler;
use Botble\SeoHelper\Facades\SeoHelper;
use Botble\Theme\Facades\Theme;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;
use Throwable;

class PublicCartController extends BaseController
{
    public function __construct(
        protected HandleApplyPromotionsService $applyPromotionsService,
        protected HandleApplyCouponService $handleApplyCouponService
    ) {
    }

    public function index()
    {
        $promotionDiscountAmount = 0;
        $couponDiscountAmount = 0;

        $products = new Collection();
        $crossSellProducts = new Collection();

        if (Cart::instance('cart')->isNotEmpty()) {
            [$products, $promotionDiscountAmount, $couponDiscountAmount] = $this->getCartData();

            $crossSellProducts = get_cart_cross_sale_products(
                $products->pluck('original_product.id')->all(),
                (int) theme_option('number_of_cross_sale_product', 4)
            ) ?: new Collection();
        }

        $title = __('Shopping Cart');

        SeoHelper::setTitle(theme_option('ecommerce_cart_seo_title') ?: $title)
            ->setDescription(theme_option('ecommerce_cart_seo_description'));

        Theme::breadcrumb()->add($title, route('public.cart'));

        app(GoogleTagManager::class)->viewCart();

        return Theme::scope(
            'ecommerce.cart',
            compact('promotionDiscountAmount', 'couponDiscountAmount', 'products', 'crossSellProducts'),
            'plugins/ecommerce::themes.cart'
        )->render();
    }

    public function store(CartRequest $request)
    {
        $response = $this->httpResponse();

        $product = Product::query()->find($request->input('id'));

        if (! $product) {
            return $response
                ->setError()
                ->setMessage(__('This product is out of stock or not exists!'));
        }

        if ($product->variations->count() > 0 && ! $product->is_variation && $product->defaultVariation->product->id) {
            $product = $product->defaultVariation->product;
        }

        $originalProduct = $product->original_product;

        if ($product->isOutOfStock()) {
            return $response
                ->setError()
                ->setMessage(
                    __(
                        'Product :product is out of stock!',
                        ['product' => $originalProduct->name ?: $product->name]
                    )
                );
        }

        try {
            do_action('ecommerce_before_add_to_cart', $product);
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }

        $maxQuantity = $product->max_cart_quantity;

        $requestQuantity = $request->integer('qty', 1);

        $existingAddedToCart = Cart::instance('cart')->content()->firstWhere('id', $product->id);

        if ($existingAddedToCart) {
            $requestQuantity += $existingAddedToCart->qty;
        }

        if (! $product->canAddToCart($requestQuantity)) {
            return $response
                ->setError()
                ->setMessage(__('Sorry, you can only order a maximum of :quantity units of :product at a time. Please adjust the quantity and try again.', ['quantity' => $maxQuantity, 'product' => $product->name]));
        }

        $outOfQuantity = false;
        foreach (Cart::instance('cart')->content() as $item) {
            if ($item->id == $product->id) {
                $originalQuantity = $product->quantity;
                $product->quantity = (int) $product->quantity - $item->qty;

                if ($product->quantity < 0) {
                    $product->quantity = 0;
                }

                if ($product->isOutOfStock()) {
                    $outOfQuantity = true;

                    break;
                }

                $product->quantity = $originalQuantity;
            }
        }

        $product->quantity = (int) $product->quantity - $request->integer('qty', 1);

        if (
            EcommerceHelper::isEnabledProductOptions() &&
            $originalProduct->options()->where('required', true)->exists()
        ) {
            if (! $request->input('options')) {
                return $response
                    ->setError()
                    ->setData(['next_url' => $originalProduct->url])
                    ->setMessage(__('Please select product options!'));
            }

            $requiredOptions = $originalProduct->options()->where('required', true)->get();

            $message = null;

            foreach ($requiredOptions as $requiredOption) {
                if (! $request->input('options.' . $requiredOption->id . '.values')) {
                    $message .= trans(
                        'plugins/ecommerce::product-option.add_to_cart_value_required',
                        ['value' => $requiredOption->name]
                    );
                }
            }

            if ($message) {
                return $response
                    ->setError()
                    ->setMessage(__('Please select product options!'));
            }
        }

        if ($outOfQuantity) {
            return $response
                ->setError()
                ->setMessage(__(
                    'Product :product is out of stock!',
                    ['product' => $originalProduct->name ?: $product->name]
                ));
        }

        $cartItems = OrderHelper::handleAddCart($product, $request);


        $cartItem = Arr::first(array_filter($cartItems, fn ($item) => $item['id'] == $product->id));

        $response->setMessage(__(
            'Added product :product to cart successfully!',
            ['product' => $originalProduct->name ?: $product->name]
        ));


        $token = OrderHelper::getOrderSessionToken();

        if (!session('tracked_start_checkout')) {
            session(['tracked_start_checkout' => $token]);
        }

        $checkout = route('public.checkout.information', session('tracked_start_checkout'));

        $modalContent = view(
            EcommerceHelper::viewPath('modal'),
            compact('checkout', 'cartItem')
        )->render();

        $responseData = [
            'status' => true,
            'content' => $cartItems,
            'content_modal' => $modalContent,
        ];

        app(GoogleTagManager::class)->addToCart(
            $originalProduct,
            $cartItem['qty'],
            $cartItem['subtotal'],
        );

        app(FacebookPixel::class)->addToCart(
            $originalProduct,
            $cartItem['qty'],
            $cartItem['subtotal'],
        );


        $nextUrl = route('public.checkout.information', $token);

        if (EcommerceHelper::getQuickBuyButtonTarget() == 'cart') {
            $nextUrl = route('public.cart');
        }

        if ($request->input('checkout')) {
            Cart::instance('cart')->refresh();

            $responseData['next_url'] = $nextUrl;

            $this->applyAutoCouponCode();

            if ($request->ajax() && $request->wantsJson()) {
                return $response->setData($responseData);
            }

            return $response
                ->setData($responseData)
                ->setNextUrl($nextUrl);
        }

        return $response
            ->setData([
                ...$this->getDataForResponse(),
                ...$responseData,
            ]);
    }

    public function update(UpdateCartRequest $request)
    {
        if ($request->has('checkout')) {
            $token = OrderHelper::getOrderSessionToken();

            return $this
                ->httpResponse()
                ->setNextUrl(route('public.checkout.information', $token));
        }

        $data = $request->input('items', []);

        $outOfQuantity = false;
        foreach ($data as $item) {
            $cartItem = Cart::instance('cart')->get($item['rowId']);

            if (! $cartItem) {
                continue;
            }

            /**
             * @var Product $product
             */
            $product = Product::query()->find($cartItem->id);

            if ($product) {
                $originalQuantity = $product->quantity;
                $product->quantity = (int) $product->quantity - (int) Arr::get($item, 'values.qty', 0) + 1;

                if ($product->quantity < 0) {
                    $product->quantity = 0;
                }

                if ($product->isOutOfStock()) {
                    $outOfQuantity = true;
                } else {
                    Cart::instance('cart')->update($item['rowId'], Arr::get($item, 'values'));
                }

                $product->quantity = $originalQuantity;
            }
        }

        if ($outOfQuantity) {
            return $this
                ->httpResponse()
                ->setError()
                ->setData($this->getDataForResponse())
                ->setMessage(__('One or all products are not enough quantity so cannot update!'));
        }

        $responseData = $this->getDataForResponse();
        
        // If we're in checkout context, also update shipping information
        if ($request->has('checkout_context') || str_contains($request->header('referer', ''), 'checkout')) {
            $checkoutData = $this->getCheckoutShippingData($request);
            $responseData = array_merge($responseData, $checkoutData);
        }
        
        return $this
            ->httpResponse()
            ->setData($responseData)
            ->setMessage(__('Update cart successfully!'));
    }

    public function destroy(string $id)
    {
        try {
            $cartItem = Cart::instance('cart')->get($id);
            app(GoogleTagManager::class)->removeFromCart($cartItem);

            Cart::instance('cart')->remove($id);

            $responseData = [
                ...$this->getDataForResponse(),
            ];

            return $this
                ->httpResponse()
                ->setData($responseData)
                ->setMessage(__('Removed item from cart successfully!'));
        } catch (Throwable) {
            return $this
                ->httpResponse()
                ->setError()
                ->setMessage(__('Cart item is not existed!'));
        }
    }

    public function empty()
    {
        Cart::instance('cart')->destroy();

        return $this
            ->httpResponse()
            ->setData(Cart::instance('cart')->content())
            ->setMessage(__('Empty cart successfully!'));
    }

    protected function getCartData(): array
    {
        $products = Cart::instance('cart')->products();

        $promotionDiscountAmount = $this->applyPromotionsService->execute();

        $couponDiscountAmount = $this->applyAutoCouponCode();

        $sessionData = OrderHelper::getOrderSessionData();

        if (session()->has('applied_coupon_code')) {
            $couponDiscountAmount = (float) Arr::get($sessionData, 'coupon_discount_amount', 0);
        }

        return [$products, $promotionDiscountAmount, $couponDiscountAmount];
    }

    protected function getDataForResponse(): array
    {
        $cartContent = null;

        $cartData = $this->getCartData();

        [$products, $promotionDiscountAmount, $couponDiscountAmount] = $cartData;

        if (Route::is('public.cart.*')) {
            $crossSellProducts = get_cart_cross_sale_products(
                $products->pluck('original_product.id')->all(),
                (int) theme_option('number_of_cross_sale_product', 4)
            ) ?: collect();

            $cartContent = view(
                EcommerceHelper::viewPath('cart'),
                compact('products', 'promotionDiscountAmount', 'couponDiscountAmount', 'crossSellProducts')
            )->render();
        }


        return apply_filters('ecommerce_cart_data_for_response', [
            'count' => Cart::instance('cart')->count(),
            'total_price' => format_price(Cart::instance('cart')->rawSubTotal()),
            'content' => Cart::instance('cart')->content(),
            'cart_content' => $cartContent,
        ], $cartData);
    }

    protected function applyAutoCouponCode(): float
    {
        $couponDiscountAmount = 0;

        if ($couponCode = session('auto_apply_coupon_code')) {
            $coupon = Discount::query()
                ->where('code', $couponCode)
                ->where('apply_via_url', true)
                ->where('type', DiscountTypeEnum::COUPON)
                ->exists();

            if ($coupon) {
                $couponData = $this->handleApplyCouponService->execute($couponCode);

                if (! Arr::get($couponData, 'error')) {
                    $couponDiscountAmount = Arr::get($couponData, 'data.discount_amount', 0);
                }
            }
        }

        return (float) $couponDiscountAmount;
    }
    
    /**
     * Get checkout shipping data for AJAX updates from checkout page
     */
    protected function getCheckoutShippingData($request): array
    {
        $token = OrderHelper::getOrderSessionToken();
        $sessionCheckoutData = OrderHelper::getOrderSessionData($token);
        
        if (empty($sessionCheckoutData)) {
            return [];
        }
        
        try {
            $products = Cart::instance('cart')->products();
            
            $handleCheckoutOrderData = app(HandleCheckoutOrderData::class);
            $checkoutOrderData = $handleCheckoutOrderData->execute(
                $request,
                $products,
                $token,
                $sessionCheckoutData
            );

            app(HandleTaxService::class)->execute($products, $sessionCheckoutData);
            
            // Prepare shipping data including currently selected method
            // Priority: request data > session data
            $currentShippingMethod = $request->input('current_shipping_method') ?: data_get($sessionCheckoutData, 'shipping_method');
            $currentShippingOption = $request->input('current_shipping_option') ?: data_get($sessionCheckoutData, 'shipping_option');
            
            $shippingData = [
                'order_total' => $checkoutOrderData->orderAmount,
                'city' => data_get($sessionCheckoutData, 'city'),
                'state' => data_get($sessionCheckoutData, 'state'),
                'country' => data_get($sessionCheckoutData, 'country') ?: 'CO',
                'weight' => $products->sum('weight'),
                // Preserve currently selected shipping method from request or session
                'shipping_option' => $currentShippingOption,
                'shipping_method' => $currentShippingMethod,
            ];
            
            $dynamicShippingValidation = app(DynamicShippingValidationService::class);
            $freeShippingHandler = app(FreeShippingAutoHandler::class);
            
            // FIRST: Check for free shipping (highest priority)
            $shouldAutoApplyFreeShipping = $freeShippingHandler->shouldAutoApplyFreeShipping($shippingData);
            $skipShippingSelection = $shouldAutoApplyFreeShipping && $freeShippingHandler->shouldSkipShippingSelection($shippingData);
            
            \Log::info('PublicCartController: Free shipping check in checkout context', [
                'order_total' => $shippingData['order_total'],
                'shouldAutoApplyFreeShipping' => $shouldAutoApplyFreeShipping,
                'skipShippingSelection' => $skipShippingSelection,
                'currently_selected' => [
                    'shipping_option' => $shippingData['shipping_option'],
                    'shipping_method' => $shippingData['shipping_method']
                ]
            ]);
            
            if ($shouldAutoApplyFreeShipping) {
                // Create and use auto free shipping method (highest priority)
                $autoFreeShipping = $freeShippingHandler->createAutoFreeShippingMethod($shippingData);
                \Log::info('PublicCartController: Auto free shipping result', [
                    'autoFreeShipping' => $autoFreeShipping,
                    'isEmpty' => empty($autoFreeShipping)
                ]);
                
                if (!empty($autoFreeShipping)) {
                    $validatedShipping = $autoFreeShipping;
                } else {
                    // Empty array means a price-based rule was found - use normal validation
                    \Log::info('PublicCartController: Price-based rule found, using normal validation');
                    $validatedShipping = $dynamicShippingValidation->validateShippingMethods($shippingData);
                }
            } else {
                // Check normal shipping validation when free shipping doesn't apply
                $validatedShipping = $dynamicShippingValidation->validateShippingMethods($shippingData);
            }
            
            // When using normal validation (empty autoFreeShipping), set proper defaults
            $useNormalDefaults = $shouldAutoApplyFreeShipping && empty($autoFreeShipping);
            
            $finalShippingData = $validatedShipping ?: $checkoutOrderData->shipping;
            
            \Log::info('PublicCartController: Final shipping data before view', [
                'validated_shipping_count' => $validatedShipping ? count($validatedShipping) : 0,
                'checkout_shipping_count' => $checkoutOrderData->shipping ? count($checkoutOrderData->shipping) : 0,
                'final_shipping_count' => $finalShippingData ? count($finalShippingData) : 0,
                'final_shipping_methods' => $finalShippingData ? array_keys($finalShippingData) : [],
                'final_shipping_detail' => $finalShippingData
            ]);
            
            $shippingViewData = [
                'shipping' => $finalShippingData,
                'defaultShippingOption' => $useNormalDefaults ? '7' : ($shouldAutoApplyFreeShipping ? 'free_shipping_auto' : $checkoutOrderData->defaultShippingOption),
                'defaultShippingMethod' => $useNormalDefaults ? 'default' : ($shouldAutoApplyFreeShipping ? 'default' : $checkoutOrderData->defaultShippingMethod),
                'orderTotal' => $checkoutOrderData->orderAmount,
                'skipShippingSelection' => $useNormalDefaults ? false : $skipShippingSelection,
                // Pass selected method info to preserve selection
                'selectedShippingOption' => $currentShippingOption,
                'selectedShippingMethod' => $currentShippingMethod,
            ];
            
            \Log::info('PublicCartController: View data prepared', [
                'view_data_keys' => array_keys($shippingViewData),
                'shipping_in_view_data' => $shippingViewData['shipping'] ? array_keys($shippingViewData['shipping']) : []
            ]);
            
            $shippingMethodsHtml = view('plugins/ecommerce::orders.partials.shipping-methods', $shippingViewData)->render();
            
            \Log::info('PublicCartController: HTML generated', [
                'html_length' => strlen($shippingMethodsHtml),
                'contains_pickup' => strpos($shippingMethodsHtml, 'pickup') !== false,
                'contains_paid_delivery' => strpos($shippingMethodsHtml, 'paid_delivery') !== false
            ]);
            
            $amountHtml = view('plugins/ecommerce::orders.partials.amount', [
                'products' => $products,
                'rawTotal' => $checkoutOrderData->rawTotal,
                'orderAmount' => $checkoutOrderData->orderAmount,
                'shipping' => $checkoutOrderData->shipping,
                'sessionCheckoutData' => $sessionCheckoutData,
                'shippingAmount' => $checkoutOrderData->shippingAmount,
                'promotionDiscountAmount' => $checkoutOrderData->promotionDiscountAmount,
                'couponDiscountAmount' => $checkoutOrderData->couponDiscountAmount,
                'paymentFee' => $checkoutOrderData->paymentFee,
            ])->render();
            
            return [
                'shipping_methods' => $shippingMethodsHtml,
                'amount' => $amountHtml,
                'checkout_updated' => true,
            ];
            
        } catch (Exception $e) {
            \Log::error('Error updating checkout shipping data: ' . $e->getMessage());
            return [];
        }
    }
}
