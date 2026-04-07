class OrderAdminManagement {
    init() {
        $(document).on('click', '.btn-confirm-order', (event) => {
            event.preventDefault()

            const _self = $(event.currentTarget)

            $httpClient
                .make()
                .withButtonLoading(_self)
                .post(_self.closest('form').prop('action'), _self.closest('form').serialize())
                .then(({ data }) => {
                    if (!data.error) {
                        $('#main-order-content').load(`${window.location.href} #main-order-content > *`)
                        _self.closest('div').remove()
                        Botble.showSuccess(data.message)
                    } else {
                        Botble.showError(data.message)
                    }
                })
        })

        $(document).on('click', '.btn-confirm-production', (event) => {
            event.preventDefault()

            const _self = $(event.currentTarget)

            $httpClient
                .make()
                .withButtonLoading(_self)
                .post(_self.closest('form').prop('action'), _self.closest('form').serialize())
                .then(({ data }) => {
                    if (!data.error) {
                        $('#main-order-content').load(`${window.location.href} #main-order-content > *`)
                        Botble.showSuccess(data.message)
                    } else {
                        Botble.showError(data.message)
                    }
                })
        })

        $(document).on('click', '.btn-trigger-resend-order-confirmation-modal', (event) => {
            event.preventDefault()
            $('#confirm-resend-confirmation-email-button').data('action', $(event.currentTarget).data('action'))
            $('#resend-order-confirmation-email-modal').modal('show')
        })

        $(document).on('click', '#confirm-resend-confirmation-email-button', (event) => {
            event.preventDefault()

            const _self = $(event.currentTarget)

            $httpClient
                .make()
                .withButtonLoading(_self)
                .post(_self.data('action'))
                .then(({ data }) => {
                    if (!data.error) {
                        Botble.showSuccess(data.message)
                    } else {
                        Botble.showError(data.message)
                    }

                    $('#resend-order-confirmation-email-modal').modal('hide')
                })
        })

        $(document).on('click', '.btn-trigger-shipment', (event) => {
            event.preventDefault()
            const _self = $(event.currentTarget)

            const $formBody = $('.shipment-create-wrap')
            $formBody.slideToggle()

            if (!$formBody.hasClass('shipment-data-loaded')) {
                Botble.showLoading($formBody)

                $httpClient
                    .make()
                    .get(_self.data('target'))
                    .then(({ data }) => {
                        if (data.error) {
                            Botble.showError(data.message)
                        } else {
                            $formBody.html(data.data)
                            $formBody.addClass('shipment-data-loaded')
                            Botble.initResources()
                        }

                        Botble.hideLoading($formBody)
                    })
            }
        })

        $(document).on('change', '#store_id', (event) => {
            const $formBody = $('.shipment-create-wrap')
            Botble.showLoading($formBody)

            $('#select-shipping-provider').load(
                `${$('.btn-trigger-shipment').data('target')}?view=true&store_id=${$(event.currentTarget).val()} #select-shipping-provider > *`,
                () => {
                    Botble.hideLoading($formBody)
                    Botble.initResources()
                }
            )
        })

        $(document).on('change', '.shipment-form-weight', (event) => {
            const $formBody = $('.shipment-create-wrap')
            Botble.showLoading($formBody)

            $('#select-shipping-provider').load(
                `${$('.btn-trigger-shipment').data('target')}?view=true&store_id=${$('#store_id').val()}&weight=${$(event.currentTarget).val()} #select-shipping-provider > *`,
                () => {
                    Botble.hideLoading($formBody)
                    Botble.initResources()
                }
            )
        })

        $(document).on('click', '.table-shipping-select-options .clickable-row', (event) => {
            const _self = $(event.currentTarget)
            $('.input-hidden-shipping-method').val(_self.data('key'))
            $('.input-hidden-shipping-option').val(_self.data('option'))
            $('.input-show-shipping-method').val(_self.find('span.name').text())
        })

        $(document).on('click', '.btn-create-shipment', (event) => {
            event.preventDefault()

            const _self = $(event.currentTarget)

            $httpClient
                .make()
                .withButtonLoading(_self)
                .post(_self.closest('form').prop('action'), _self.closest('form').serialize())
                .then(({ data }) => {
                    if (!data.error) {
                        Botble.showSuccess(data.message)
                        $('#main-order-content').load(`${window.location.href} #main-order-content > *`)
                        $('.btn-trigger-shipment').remove()
                    } else {
                        Botble.showError(data.message)
                    }
                })
        })

        $(document).on('click', '.btn-cancel-shipment', (event) => {
            event.preventDefault()
            $('#confirm-cancel-shipment-button').data('action', $(event.currentTarget).data('action'))
            $('#cancel-shipment-modal').modal('show')
        })

        $(document).on('click', '#confirm-cancel-shipment-button', (event) => {
            event.preventDefault()

            const _self = $(event.currentTarget)

            $httpClient
                .make()
                .withButtonLoading(_self)
                .post(_self.data('action'))
                .then(({ data }) => {
                    if (!data.error) {
                        Botble.showSuccess(data.message)
                        $('.carrier-status').addClass(`carrier-status-${data.data.status}`).text(data.data.status_text)
                        $('#cancel-shipment-modal').modal('hide')
                        $('#order-history-wrapper').load(`${window.location.href} #order-history-wrapper > *`)
                        $('.shipment-actions-wrapper').remove()
                    } else {
                        Botble.showError(data.message)
                    }
                })
        })

        $(document).on('click', '.btn-close-shipment-panel', (event) => {
            event.preventDefault()
            $('.shipment-create-wrap').slideUp()
        })

        $(document).on('click', '.btn-trigger-update-shipping-address', (event) => {
            event.preventDefault()
            $('#update-shipping-address-modal').modal('show')
        })

        $(document).on('click', '.btn-trigger-update-tax-information', (event) => {
            event.preventDefault()
            $('#update-tax-information-modal').modal('show')
        })

        $(document).on('click', '#confirm-update-shipping-address-button', (event) => {
            event.preventDefault()

            const _self = $(event.currentTarget)
            const form = _self.closest('.modal-content').find('form')

            $httpClient
                .make()
                .withLoading(form.find('.shipment-create-wrap'))
                .withButtonLoading(_self)
                .post(form.prop('action'), form.serialize())
                .then(({ data }) => {
                    if (!data.error) {
                        Botble.showSuccess(data.message)
                        $('#update-shipping-address-modal').modal('hide')
                        $('.shipment-address-box-1').html(data.data.line)
                        $('.shipping-address-info').html(data.data.detail)

                        $('#select-shipping-provider').load(
                            `${$('.btn-trigger-shipment').data('target')}?view=true #select-shipping-provider > *`,
                            () => {
                                Botble.initResources()
                            }
                        )
                    } else {
                        Botble.showError(data.message)
                    }
                })
        })

        $(document).on('click', '#confirm-update-tax-information-button', (event) => {
            event.preventDefault()

            const _self = $(event.currentTarget)
            const form = _self.closest('.modal-content').find('form')

            $httpClient
                .make()
                .withButtonLoading(_self)
                .post(form.prop('action'), form.serialize())
                .then(({ data }) => {
                    if (data.error) {
                        Botble.showError(data.message)
                        return
                    }

                    $('.text-infor-subdued.tax-info').html(data.data)
                    $('#update-tax-information-modal').modal('hide')

                    Botble.showSuccess(data.message)
                })
        })

        $(document).on('click', '.btn-update-order', (event) => {
            event.preventDefault()

            const _self = $(event.currentTarget)

            $httpClient
                .make()
                .withButtonLoading(_self)
                .post(_self.closest('form').prop('action'), _self.closest('form').serialize())
                .then(({ data }) => {
                    if (!data.error) {
                        Botble.showSuccess(data.message)
                    } else {
                        Botble.showError(data.message)
                    }

                    if (_self.closest('.modal')) {
                        _self.closest('.modal').modal('hide')

                        $('.page-body').load(`${window.location.href} .page-body > *`)
                    }
                })
        })

        $(document).on('click', '.btn-trigger-cancel-order', (event) => {
            event.preventDefault()
            $('#confirm-cancel-order-button').data('target', $(event.currentTarget).data('target'))
            $('#cancel-order-modal').modal('show')
        })

        $(document).on('click', '#confirm-cancel-order-button', (event) => {
            event.preventDefault()
            const _self = $(event.currentTarget)

            $httpClient
                .make()
                .withButtonLoading(_self)
                .post(_self.data('target'))
                .then(({ data }) => {
                    if (!data.error) {
                        Botble.showSuccess(data.message)
                        $('#main-order-content').load(`${window.location.href} #main-order-content > *`)
                        $('#cancel-order-modal').modal('hide')
                    } else {
                        Botble.showError(data.message)
                    }
                })
        })

        $(document).on('click', '.btn-trigger-confirm-payment', (event) => {
            event.preventDefault()
            $('#confirm-payment-order-button').data('target', $(event.currentTarget).data('target'))
            $('#confirm-payment-modal').modal('show')
        })

        $(document).on('click', '#confirm-payment-order-button', (event) => {
            event.preventDefault()
            const _self = $(event.currentTarget)

            $httpClient
                .make()
                .withButtonLoading(_self)
                .post(_self.data('target'))
                .then(({ data }) => {
                    if (!data.error) {
                        Botble.showSuccess(data.message)
                        $('#main-order-content').load(`${window.location.href} #main-order-content > *`)
                        $('#confirm-payment-modal').modal('hide')
                    } else {
                        Botble.showError(data.message)
                    }
                })
        })

        $(document).on('click', '.show-timeline-dropdown', (event) => {
            event.preventDefault()
            $($(event.currentTarget).data('target')).slideToggle()
        })

        $(document).on('keyup', '.input-sync-item', (event) => {
            let number = $(event.currentTarget).val()
            if (!number || isNaN(number)) {
                number = 0
            }

            $(event.currentTarget)
                .closest('body')
                .find($(event.currentTarget).data('target'))
                .text(Botble.numberFormat(parseFloat(number), 2))
        })

        $(document).on('click', '.btn-trigger-refund', (event) => {
            event.preventDefault()
            $('#confirm-refund-modal').modal('show')
        })

        $(document).on('change', '.j-refund-quantity', () => {
            let total_restock_items = 0
            $.each($('.j-refund-quantity'), (index, el) => {
                let number = $(el).val()
                if (!number || isNaN(number)) {
                    number = 0
                }
                total_restock_items += parseFloat(number)
            })

            $('.total-restock-items').text(total_restock_items)
        })

        $(document).on('click', '#confirm-refund-payment-button', (event) => {
            event.preventDefault()

            const _self = $(event.currentTarget)
            const form = _self.closest('.modal-dialog').find('form')

            $httpClient
                .make()
                .withButtonLoading(_self)
                .post(form.prop('action'), form.serialize())
                .then(({ data }) => {
                    if (!data.error) {
                        if (data.data && data.data.refund_redirect_url) {
                            window.location.href = data.data.refund_redirect_url
                        } else {
                            $('#main-order-content').load(`${window.location.href} #main-order-content > *`)
                            Botble.showSuccess(data.message)
                            _self.closest('.modal').modal('hide')
                        }
                    } else {
                        Botble.showError(data.message)
                    }
                })
        })

        // --- Agregar producto a orden existente ---
        let addProductSearchTimer = null

        const renderAddProductItem = (product, addAction) => {
            const inStock = product.quantity > 0 || !product.with_storehouse_management
            const stockHtml = product.with_storehouse_management
                ? (inStock
                    ? `<small>&nbsp;(${product.quantity} producto(s) disponible)</small>`
                    : `<div class="text-danger"><small>&nbsp;(Agotado)</small></div>`)
                : ''
            const addBtn = inStock
                ? `<div class="w-100 w-sm-auto col-auto">
                    <div class="d-flex align-items-center gap-1">
                        <input type="number" class="form-control form-control-sm add-product-qty-input" value="1" min="1" style="width:60px">
                        <button class="btn btn-outline-primary btn-sm btn-add-product-item" type="button"
                            data-id="${product.id}" data-action="${addAction}">
                            <i class="ti ti-plus icon-sm"></i> Agregar
                        </button>
                    </div>
                   </div>`
                : ''

            return `<a class="list-group-item list-group-item-action">
                <div class="row align-items-start">
                    <div class="col-auto">
                        <span class="avatar" style="background-image: url('${product.image_url}')"></span>
                    </div>
                    <div class="col text-truncate">
                        <div class="row align-items-center gap-2">
                            <div class="col d-flex align-content-center flex-wrap">
                                <span>${product.name}</span>
                                <div>
                                    ${stockHtml}
                                    <span class="text-info ps-1">(${product.formatted_price})</span>
                                </div>
                            </div>
                            ${addBtn}
                        </div>
                    </div>
                </div>
            </a>`
        }

        const loadAddProductList = (keyword = '') => {
            const $modal = $('#add-product-modal')
            const searchUrl = $modal.find('.box-search-advance.product').data('search-url')
            const $list = $('#add-product-list')

            $list.html('<a class="list-group-item list-group-item-action disabled text-center py-3"><span class="spinner-border spinner-border-sm me-2"></span>Cargando...</a>')
            $('#add-product-results').show()

            $.get(searchUrl, { keyword }, (res) => {
                const products = res.data?.data ?? []
                const addAction = $modal.find('.box-search-advance.product').data('action')
                $list.empty()

                if (!products.length) {
                    $list.html('<a class="list-group-item list-group-item-action disabled text-center py-3">Sin resultados</a>')
                    return
                }

                products.forEach((product) => {
                    $list.append(renderAddProductItem(product, addAction))
                })
            })
        }

        $(document).on('click', '.btn-trigger-add-product', (event) => {
            event.preventDefault()
            $('#add-product-search').val('')
            $('#add-product-results').hide()
            $('#add-product-list').empty()
            $('#add-product-modal').modal('show')
            loadAddProductList()
        })

        $(document).on('input', '#add-product-search', (event) => {
            clearTimeout(addProductSearchTimer)
            const term = $(event.currentTarget).val().trim()
            addProductSearchTimer = setTimeout(() => loadAddProductList(term), 400)
        })

        $(document).on('click', '.btn-add-product-item', (event) => {
            event.preventDefault()
            const $btn = $(event.currentTarget)
            const productId = $btn.data('id')
            const addAction = $btn.data('action')
            const qty = $btn.closest('.d-flex').find('.add-product-qty-input').val() || 1

            $httpClient
                .make()
                .withButtonLoading($btn)
                .post(addAction, {
                    product_id: productId,
                    qty: qty,
                    _token: $('meta[name="csrf-token"]').attr('content'),
                })
                .then(({ data }) => {
                    if (!data.error) {
                        Botble.showSuccess(data.message)
                        $('#add-product-modal').modal('hide')
                        $('#main-order-content').load(`${window.location.href} #main-order-content > *`)
                    } else {
                        Botble.showError(data.message)
                    }
                })
        })
        // --- Fin agregar producto ---

        $(document).on('click', '.btn-trigger-update-shipping-status', (event) => {
            event.preventDefault()
            $('#update-shipping-status-modal').modal('show')
        })

        $(document).on('click', '#confirm-update-shipping-status-button', (event) => {
            event.preventDefault()

            const _self = $(event.currentTarget)
            const form = _self.closest('.modal-dialog').find('form')

            $httpClient
                .make()
                .withButtonLoading(_self)
                .post(form.prop('action'), form.serialize())
                .then(({ data }) => {
                    if (!data.error) {
                        $('#main-order-content').load(`${window.location.href} #main-order-content > *`)
                        Botble.showSuccess(data.message)
                        _self.closest('.modal').modal('hide')
                    } else {
                        Botble.showError(data.message)
                    }
                })
        })
    }
}

$(() => {
    new OrderAdminManagement().init()
})
