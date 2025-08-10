<div @style(['display: none' => (bool) get_ecommerce_setting('disable_shipping_options', false)])>
    {{-- Disabled: Shipping summary information --}}
    {{-- We now handle free shipping messaging directly in the shipping method descriptions --}}

    @if (! empty($shipping))
        <div class="payment-checkout-form">
            <input
                name="shipping_option"
                type="hidden"
                value="{{ BaseHelper::stringify(old('shipping_option', $selectedShippingOption ?? $defaultShippingOption ?? '')) }}"
            >

            <ul class="list-group list_payment_method">

                @foreach ($shipping as $shippingKey => $shippingItems)
                    @foreach ($shippingItems as $shippingOption => $shippingItem)
                        @include(
                            'plugins/ecommerce::orders.partials.shipping-option',
                            [
                                'shippingItem' => $shippingItem,
                                'attributes' => [
                                    'id' => "shipping-method-$shippingKey-$shippingOption",
                                    'name' => 'shipping_method',
                                    'class' => 'magic-radio shipping_method_input',
                                    'checked' => (old('shipping_method', $selectedShippingMethod ?? $defaultShippingMethod ?? '') == $shippingKey && old('shipping_option', $selectedShippingOption ?? $defaultShippingOption ?? '') == $shippingOption),
                                    'disabled' => Arr::get($shippingItem, 'disabled'),
                                    'data-option' => $shippingOption,
                                ],
                                'shippingKey' => $shippingKey,
                                'shippingOption' => $shippingOption,
                                'isAutoSelected' => (($selectedShippingMethod ?? $defaultShippingMethod ?? '') == $shippingKey && ($selectedShippingOption ?? $defaultShippingOption ?? '') == $shippingOption)
                            ]
                        )
                    @endforeach
                @endforeach
            </ul>
        </div>
    @else
        @php
            $sessionCheckoutData = $sessionCheckoutData ?? OrderHelper::getOrderSessionData();
        @endphp

        @if ($sessionCheckoutData && Arr::get($sessionCheckoutData, 'country'))
            <p class="text-muted">{{ __('No shipping methods were found with your provided shipping information!') }}</p>
        @else
            <p class="text-muted">{{ __('Please fill out all shipping information to view available shipping methods!') }}</p>
        @endif
    @endif

    {{-- Simplified message when shipping selection is skipped is now handled in shipping method descriptions --}}
</div>
