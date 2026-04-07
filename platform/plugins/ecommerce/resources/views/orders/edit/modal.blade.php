<x-core::modal.action
    id="resend-order-confirmation-email-modal"
    :title="trans('plugins/ecommerce::order.resend_order_confirmation')"
    :description="trans('plugins/ecommerce::order.resend_order_confirmation_description', [
            'email' => $order->user->id ? $order->user->email : $order->address->email,
        ])"
    :submit-button-attrs="['id' => 'confirm-resend-confirmation-email-button']"
    :submit-button-label="trans('plugins/ecommerce::order.send')"
/>

<x-core::modal
    id="update-shipping-address-modal"
    :title="trans('plugins/ecommerce::order.update_address')"
    button-id="confirm-update-shipping-address-button"
    :button-label="trans('plugins/ecommerce::order.update')"
    size="md"
>
    @include('plugins/ecommerce::orders.shipping-address.form', [
        'address' => $order->address,
        'orderId' => $order->id,
        'url' => route($updateShippingAddressRoute, $order->address->id ?? 0),
    ])
</x-core::modal>

<div class="modal fade" id="add-product-modal" tabindex="-1" role="dialog" aria-labelledby="add-product-modal-title" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="add-product-modal-title">Agregar producto a la orden</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="position-relative box-search-advance product"
                     data-action="{{ route('orders.add-product', $order->getKey()) }}"
                     data-search-url="{{ route('products.get-all-products-and-variations') }}">
                    <input
                        type="text"
                        id="add-product-search"
                        class="form-control textbox-advancesearch-order"
                        placeholder="Buscar producto por nombre o SKU..."
                        autocomplete="off"
                    >
                    <div id="add-product-results" class="card position-absolute z-1 w-100 mt-1" style="display:none; max-height:400px; overflow-y:auto;">
                        <div class="list-group list-group-flush overflow-auto" style="max-height: 25rem;" id="add-product-list"></div>
                        <div class="card-footer d-none" id="add-product-pagination">
                            <ul class="pagination my-0 d-flex justify-content-end"></ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>

<x-core::modal.action
    id="cancel-order-modal"
    type="warning"
    :title="trans('plugins/ecommerce::order.cancel_order_confirmation')"
    :description="trans('plugins/ecommerce::order.cancel_order_confirmation_description')"
    :submit-button-attrs="['id' => 'confirm-cancel-order-button']"
    :submit-button-label="trans('plugins/ecommerce::order.cancel_order')"
/>
