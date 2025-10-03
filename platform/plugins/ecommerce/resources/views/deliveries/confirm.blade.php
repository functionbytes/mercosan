@extends('plugins/ecommerce::orders.master')

@section('title', trans('plugins/ecommerce::order.delivery_confirmed_successfully'))

@section('content')
    <div class="col-lg-7 mx-auto">
        <div class="card">
            <div class="p-5">
                <div class="d-md-block mt-5 mt-md-0 mb-5">
                    <div class="thank-you text-center">
                        <div class="">
                            <x-core::icon name="ti ti-circle-check-filled" />
                        </div>
                        <div>
                            <h3 class="thank-you-sentence mb-1">
                                {{ trans('plugins/ecommerce::order.delivery_confirmed_successfully') }}
                            </h3>
                            <p class="mb-0">{{ trans('plugins/ecommerce::order.delivery_confirmed_automatically') }}</p>
                        </div>
                    </div>

                    <hr class="border-dark-subtle" />

                    <div class="pt-3 mb-3">
                        <div class="alert alert-danger" role="alert">
                            <h5 class="alert-heading mb-2">
                                <x-core::icon name="ti ti-info-circle" class="me-2" />
                                {{ trans('plugins/ecommerce::order.delivery_confirmation_details') }}
                            </h5>
                            <p class="mb-0">
                                <strong>{{ trans('plugins/ecommerce::order.confirmed_at') }}:</strong>
                                {{ $shipment->delivered_at->format('d/m/Y H:i') }}
                            </p>
                        </div>
                    </div>

                    <div class="order-customer-info">
                        <h3>{{ trans('plugins/ecommerce::order.order_information') }}</h3>

                        <p>
                            <span class="d-inline-block-title">{{ trans('plugins/ecommerce::order.order_number') }}:</span>
                            <span class="order-customer-info-meta">{{ $order->code }}</span>
                        </p>

                        <p>
                            <span class="d-inline-block-title">{{ trans('plugins/ecommerce::order.customer_label') }}:</span>
                            <span class="order-customer-info-meta">{{ $order->user->name ?: $order->shippingAddress->name }}</span>
                        </p>

                        <p>
                            <span class="d-inline-block-title">{{ trans('plugins/ecommerce::order.shipping_address') }}:</span>
                            <span class="order-customer-info-meta">{{ $order->shippingAddress->address }}</span>
                        </p>

                    </div>

                    <a class="btn payment-checkout-btn w-100" href="{{ BaseHelper::getHomepageUrl() }}">
                        {{ __('Continue shopping') }}
                    </a>
                </div>
            </div>
        </div>
    </div>
@stop
