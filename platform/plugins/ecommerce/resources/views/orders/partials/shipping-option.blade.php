@php
    $isAutoSelected = $isAutoSelected ?? false;
    $isFreeShipping = (float) $shippingItem['price'] === 0.0;
    $citySpecific = Arr::get($shippingItem, 'city_specific', false);
    $cityName = Arr::get($shippingItem, 'city_name');
    $adjustmentPrice = Arr::get($shippingItem, 'adjustment_price', 0);
    $basePrice = Arr::get($shippingItem, 'base_price', $shippingItem['price']);
@endphp

<li class="list-group-item {{ $isAutoSelected ? 'border-danger' : '' }}">
    {!! Form::radio(Arr::get($attributes, 'name'), $shippingKey, Arr::get($attributes, 'checked'), $attributes) !!}
    <label for="{{ Arr::get($attributes, 'id') }}" class="{{ $isAutoSelected ? '' : '' }}">
        <div class="d-flex justify-content-between align-items-start">
            <div class="flex-grow-1">
                @if ($image = Arr::get($shippingItem, 'image'))
                    <img
                        src="{{ $image }}"
                        alt="{{ $shippingItem['name'] }}"
                        style="max-height: 40px; max-width: 55px"
                        class="me-2"
                    >
                @endif

                <div class="d-inline-block">
                    {{ $shippingItem['name'] }}

                    @if ($isAutoSelected)
                        <span class="badge bg-danger ms-2">{{ __('Auto-selected') }}</span>
                    @endif

                    @if ($citySpecific && $cityName)
                        <br><small class="text-muted">
                            <i class="fas fa-map-marker-alt me-1"></i>{{ __('Special rate for :city', ['city' => $cityName]) }}
                        </small>
                    @endif
                </div>
            </div>

            <div class="text-end">
                @if ($isFreeShipping)
                    @if(Arr::get($shippingItem, 'method_type') === 'pickup')
                        <strong class="text-danger ">{{ __('Gratis') }}</strong>
                    @else
                        <strong class="text-danger ">{{ __('Envío gratis') }}</strong>
                    @endif
                @else
                    <strong class="">{{ format_price($shippingItem['price']) }}</strong>
                    @if ($citySpecific && $adjustmentPrice != 0)
                        <br><small class="text-muted">
                            {{ __('Base') }}: {{ format_price($basePrice) }}
                            @if ($adjustmentPrice > 0)
                                <span class="text-danger">+ {{ format_price($adjustmentPrice) }}</span>
                            @else
                                <span class="text-success">- {{ format_price(abs($adjustmentPrice)) }}</span>
                            @endif
                        </small>
                    @endif
                @endif
            </div>
        </div>


    </label>
</li>
