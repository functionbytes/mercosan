try {
    window.$ = window.jQuery = require('jquery')

    require('bootstrap')
} catch (e) {
}

import { CheckoutAddress } from './partials/address'
import { DiscountManagement } from './partials/discount'

class MainCheckout {
    constructor() {
        new CheckoutAddress().init()
        new DiscountManagement().init()
    }

    static showNotice(messageType, message, messageHeader = '') {
        toastr.clear()

        toastr.options = {
            closeButton: true,
            positionClass: 'toast-bottom-right',
            onclick: null,
            showDuration: 1000,
            hideDuration: 1000,
            timeOut: 10000,
            extendedTimeOut: 1000,
            showEasing: 'swing',
            hideEasing: 'linear',
            showMethod: 'fadeIn',
            hideMethod: 'fadeOut',
        }

        if (!messageHeader) {
            switch (messageType) {
                case 'error':
                    messageHeader = window.messages.error_header
                    break
                case 'success':
                    messageHeader = window.messages.success_header
                    break
            }
        }

        toastr[messageType](message, messageHeader)
    }

    static handleError(data, $container) {
        if (typeof data.errors !== 'undefined' && !_.isArray(data.errors)) {
            MainCheckout.handleValidationError(data.errors, $container)
        } else {
            if (typeof data.responseJSON !== 'undefined') {
                if (typeof data.responseJSON.errors !== 'undefined') {
                    if (data.status === 422) {
                        MainCheckout.handleValidationError(data.responseJSON.errors, $container)
                    }
                } else if (typeof data.responseJSON.message !== 'undefined') {
                    MainCheckout.showError(data.responseJSON.message)
                } else {
                    $.each(data.responseJSON, (index, el) => {
                        $.each(el, (key, item) => {
                            MainCheckout.showError(item)
                        })
                    })
                }
            } else {
                MainCheckout.showError(data.statusText)
            }
        }
    }

    static dotArrayToJs(str) {
        const splittedStr = str.split('.')

        return splittedStr.length === 1 ? str : splittedStr[0] + '[' + splittedStr.splice(1).join('][') + ']'
    }

    static handleValidationError(errors, $container) {
        $.each(errors, (index, item) => {
            const inputName = MainCheckout.dotArrayToJs(index)
            let $input = $(`*[name="${inputName}"]`)

            if ($container) {
                $input = $container.find(`[name="${inputName}"]`)
            }

            if ($input.closest('.form-group').length) {
                $input.closest('.form-group').addClass('field-is-invalid')
            } else {
                $input.addClass('field-is-invalid')
            }

            if ($input.hasClass('form-control')) {
                $input.addClass('is-invalid')
                if ($input.is('select') && $input.closest('.select--arrow').length) {
                    $input.closest('.select--arrow').addClass('is-invalid')
                    $input.closest('.select--arrow').after(`<div class="invalid-feedback">${item}</div>`)
                } else {
                    $input.after(`<div class="invalid-feedback">${item}</div>`)
                }
            }
        })

        if (errors[0]) {
            MainCheckout.showError(errors[0])
        }
    }

    static showError(message, messageHeader = '') {
        this.showNotice('error', message, messageHeader)
    }

    static showSuccess(message, messageHeader = '') {
        this.showNotice('success', message, messageHeader)
    }

    init() {
        const $checkoutForm = $('form.checkout-form')
        const shippingForm = '#main-checkout-product-info'
        const customerShippingAddressForm = '.customer-address-payment-form .address-form-wrapper'
        const customerBillingAddressForm = '.customer-billing-address-form'
        const customerTaxInformationForm = '.customer-tax-information-form'

        const disablePaymentMethodsForm = () => {
            $('.payment-info-loading').show()
            $('.payment-checkout-btn').prop('disabled', true)
        }

        const enablePaymentMethodsForm = () => {
            $('.payment-info-loading').hide()
            $('.payment-checkout-btn').prop('disabled', false)

            document.dispatchEvent(new CustomEvent('payment-form-reloaded'))
        }

        const calculateShippingFee = (methods) => {
            console.log('calculateShippingFee called with methods:', methods)
            const formData = new FormData($checkoutForm.get(0))

            for (let key in methods) {
                if (key === 'address' && typeof methods[key] === 'object') {
                    // Serialize address object properly
                    for (let addressKey in methods[key]) {
                        formData.set(`address[${addressKey}]`, methods[key][addressKey])
                        console.log('Setting formData:', `address[${addressKey}]`, '=', methods[key][addressKey])
                    }
                } else {
                    formData.set(key, methods[key])
                    console.log('Setting formData:', key, '=', methods[key])
                }
            }
            
            // Log current form values for debugging
            console.log('Current city value:', $('select[name="address[city]"]').val() || $('input[name="address[city]"]').val())
            console.log('Current state value:', $('select[name="address[state]"]').val() || $('input[name="address[state]"]').val())

            $.ajax({
                url: $checkoutForm.data('update-url'),
                method: 'POST',
                processData: false,
                contentType: false,
                data: formData,
                beforeSend: () => {
                    console.log('Sending AJAX request to:', $checkoutForm.data('update-url'))
                    disablePaymentMethodsForm()
                    $('.shipping-info-loading').show()
                },
                success: ({ data }) => {
                    console.log('AJAX success response:', data)
                    console.log('Shipping methods HTML length:', data.shipping_methods ? data.shipping_methods.length : 'undefined')
                    
                    // Remember currently selected payment method before updating
                    const selectedPaymentMethod = $('input[name=payment_method]:checked').val()
                    const selectedShippingMethod = $('input[name=shipping_method]:checked').val()
                    console.log('Currently selected payment method:', selectedPaymentMethod)
                    console.log('Currently selected shipping method:', selectedShippingMethod)
                    
                    $('.cart-item-wrapper').html(data.amount)
                    
                    // Update payment methods area
                    const $paymentArea = $('[data-bb-toggle="checkout-payment-methods-area"]')
                    if (data.payment_methods && data.payment_methods.trim()) {
                        $paymentArea.html(data.payment_methods)
                        
                        // Restore previously selected payment method if it still exists
                        if (selectedPaymentMethod) {
                            const $previousSelection = $paymentArea.find(`input[name=payment_method][value="${selectedPaymentMethod}"]`)
                            if ($previousSelection.length) {
                                $previousSelection.prop('checked', true)
                                console.log('Restored payment method selection:', selectedPaymentMethod)
                            }
                        }
                    } else {
                        console.warn('No payment methods returned from server')
                    }
                    
                    // Update shipping methods and clear any animation styles
                    const $shippingArea = $('[data-bb-toggle="checkout-shipping-methods-area"]')
                    console.log('Before update - shipping area HTML:', $shippingArea.html().substring(0, 200) + '...')
                    $shippingArea.html(data.shipping_methods)
                    console.log('After update - shipping area HTML:', $shippingArea.html().substring(0, 200) + '...')
                    
                    // Count shipping options after update
                    const shippingOptions = $shippingArea.find('input[name="shipping_method"]')
                    console.log('Shipping options found after update:', shippingOptions.length)
                    shippingOptions.each((index, element) => {
                        const $option = $(element)
                        console.log(`Option ${index + 1}:`, $option.val(), '-', $option.closest('label').text().trim())
                    })
                    
                    // Remove any WOW.js animation styles that might interfere
                    $shippingArea.find('*').removeAttr('style').removeClass('wow animated')
                    $shippingArea.removeAttr('style').removeClass('wow animated')
                },
                error: (xhr, status, error) => {
                    console.error('AJAX error:', error, xhr.responseText)
                },
                complete: () => {
                    enablePaymentMethodsForm()
                    $('.shipping-info-loading').hide()
                },
            })
        }

        $(document).on('change', 'input.shipping_method_input', (event) => {
            const data = {}

            if ($('.checkout-products-marketplace').length) {
                const shippingMethods = $(shippingForm).find('input.shipping_method_input')

                if (shippingMethods.length) {
                    shippingMethods.map((i, shm) => {
                        const val = $(shm).filter(':checked').val()
                        const sId = $(shm).data('id')

                        if (val) {
                            data[`shipping_method[${sId}]`] = val
                            data[`shipping_option[${sId}]`] = $(shm).data('option')
                        }
                    })
                }
            } else {
                const $this = $(event.currentTarget)
                $('input[name=shipping_option]').val($this.data('option'))

                $('.mobile-total').text('...')

                const data = {
                    shipping_method: $this.val(),
                    shipping_option: $this.data('option'),
                    payment_method: '',
                    address: {
                        address_id: $('#address_id').val(),
                        city: $('select[name="address[city]"], input[name="address[city]"]').val(),
                        state: $('select[name="address[state]"], input[name="address[state]"]').val(),
                        country: $('select[name="address[country]"], input[name="address[country]"]').val()
                    },
                }

                const paymentMethod = $(document).find('input[name=payment_method]:checked').first()
                if (paymentMethod.length) {
                    data.payment_method = paymentMethod.val()
                }
                
                console.log('Shipping method selection changed:', {
                    method: $this.val(),
                    option: $this.data('option'),
                    fullData: data
                })
            }

            calculateShippingFee(data)
        })

        $(document).on('change', 'input[name=payment_method]', (event) => {
            calculateShippingFee({
                payment_method: $(event.target).val()
            })
        })

        document.addEventListener('coupon:applied', function() {
            const paymentMethod = $(document).find('input[name=payment_method]:checked').first()

            calculateShippingFee(paymentMethod)
        })

        document.addEventListener('coupon:removed', function() {
            const paymentMethod = $(document).find('input[name=payment_method]:checked').first()

            calculateShippingFee(paymentMethod)
        })

        const validatedFormFields = () => {
            const addressId = $('#address_id').val()

            if (addressId && addressId !== 'new') {
                return true
            }

            let validated = true

            $.each($(document).find('.form-control[required]'), (index, el) => {
                if (!$(el).val() || $(el).val() === 'null') {
                    validated = false
                }
            })

            return validated
        }

        if ($checkoutForm.find('.list-customer-address').length) {
            calculateShippingFee()
        }

        const onChangeShippingForm = (event) => {
            const _self = $(event.currentTarget)
            _self.closest('.form-group').find('.text-danger').remove()
            const $form = _self.closest('form')

            if (validatedFormFields() && $form.valid && $form.valid()) {
                $.ajax({
                    type: 'POST',
                    cache: false,
                    url: $('#save-shipping-information-url').val(),
                    data: new FormData($form[0]),
                    contentType: false,
                    processData: false,
                    success: ({ error }) => {
                        if (!error && (/country|state|city|address|address\[country\]|address\[state\]|address\[city\]|address\[zip_code\]/.test($(event.target).prop('name')))) {
                            // Get current payment method and shipping method
                            const currentPaymentMethod = $(document).find('input[name=payment_method]:checked').val()
                            const currentShippingMethod = $(document).find('input[name=shipping_method]:checked').val()
                            const currentShippingOption = $(document).find('input[name=shipping_method]:checked').data('option')
                            
                            const data = {}
                            if (currentPaymentMethod) {
                                data.payment_method = currentPaymentMethod
                            }
                            if (currentShippingMethod) {
                                data.shipping_method = currentShippingMethod
                            }
                            if (currentShippingOption) {
                                data.shipping_option = currentShippingOption
                            }
                            
                            calculateShippingFee(data)
                        }
                    },
                    error: (response) => {
                        MainCheckout.handleError(response, $form)
                    },
                })
            }
        }

        $(document).on('change', '#address_country, #address_state, #address_city, #address_zip_code, select[name="address[country]"], select[name="address[state]"], select[name="address[city]"], input[name="address[city]"], input[name="address[zip_code]"]', (event) => {
            const _self = $(event.currentTarget)
            const $form = _self.closest('form')

            console.log('=== ADDRESS CHANGE EVENT TRIGGERED ===')
            console.log('Element that triggered change:', _self[0])
            console.log('Element ID:', _self.attr('id'))
            console.log('Element name:', _self.attr('name'))
            console.log('New value:', _self.val())
            console.log('Form found:', $form.length > 0)

            // Update taxes
            console.log('Making tax update AJAX call...')
            $.ajax({
                type: 'POST',
                cache: false,
                url: $('#update-checkout-tax-url').val(),
                data: new FormData($form[0]),
                contentType: false,
                processData: false,
                success: ({ data }) => {
                    console.log('Tax update successful')
                    $('.cart-item-wrapper').html(data.amount)
                },
                error: (response) => {
                    console.error('Tax update error:', response)
                    MainCheckout.handleError(response, $form)
                },
            })

            // Calculate shipping fee when address changes
            const fieldName = _self.prop('name')
            console.log('Field changed:', fieldName, 'Value:', _self.val())
            
            if (/address_city|address_state|address_country|address_zip_code|address\[city\]|address\[state\]|address\[country\]|address\[zip_code\]/.test(fieldName)) {
                console.log('Address field detected, recalculating shipping...')
                setTimeout(() => {
                    // Get current payment method and shipping method
                    const currentPaymentMethod = $(document).find('input[name=payment_method]:checked').val()
                    const currentShippingMethod = $(document).find('input[name=shipping_method]:checked').val()
                    const currentShippingOption = $(document).find('input[name=shipping_method]:checked').data('option')
                    
                    const data = {
                        // Always include address data to ensure city change is processed
                        address: {
                            city: $('select[name="address[city]"], input[name="address[city]"]').val(),
                            state: $('select[name="address[state]"], input[name="address[state]"]').val(),
                            country: $('select[name="address[country]"], input[name="address[country]"]').val()
                        }
                    }
                    
                    if (currentPaymentMethod) {
                        data.payment_method = currentPaymentMethod
                    }
                    if (currentShippingMethod) {
                        data.shipping_method = currentShippingMethod
                    }
                    if (currentShippingOption) {
                        data.shipping_option = currentShippingOption
                    } else {
                        // Don't send a default shipping_option when city changes
                        // Let the backend calculate available methods first
                        console.log('No current shipping method selected, will recalculate available methods')
                    }
                    
                    console.log('Calling calculateShippingFee with data:', data)
                    calculateShippingFee(data)
                }, 500) // Small delay to ensure tax calculation completes first
            }
        })

        $(document).on('change', `${customerShippingAddressForm} .form-control`, (event) => {
            onChangeShippingForm(event)
        })

        $(document).on('change', '.list-customer-address .form-control', (event) => {
            onChangeShippingForm(event)
        })

        $(document).on('change', `${customerBillingAddressForm} #billing_address_same_as_shipping_address`, (event) => {
            const _self = $(event.currentTarget)
            const val = _self.find(':selected').val()
            if (val) {
                $('.billing-address-form-wrapper').hide()
            } else {
                $('.billing-address-form-wrapper').show()
            }
        })

        $(document).on('change', `${customerTaxInformationForm} #with_tax_information`, (event) => {
            const _self = $(event.currentTarget)

            $('.tax-information-form-wrapper').toggle(_self.is(':checked'))
        })

        const $addressId = $('#address_id')

        if ($addressId.length && $addressId.val() && $addressId.val() !== 'new') {
            $addressId.trigger('change')
        }

        $(document)
            .on('click', '[data-bb-toggle="decrease-qty"]', (e) => {
                const $input = $(e.currentTarget).parent().find('input')

                let count = parseInt($input.val()) - 1

                if (count < 1) {
                    return
                }

                count = count < 1 ? 1 : count
                $input.val(count)
                $input.trigger('change')
            })
            .on('click', '[data-bb-toggle="increase-qty"]', (e) => {
                const $input = $(e.currentTarget).parent().find('input')

                const max = $input.prop('max')

                if (max && parseInt($input.val()) >= parseInt(max)) {
                    return
                }

                $input.val(parseInt($input.val()) + 1)
                $input.trigger('change')
            })
            .on('change', '[data-bb-toggle="update-cart"]', (e) => {
                const $currentTarget = $(e.currentTarget)
                const $parent = $currentTarget.parent()

                const qtyKey = $currentTarget.prop('name')
                const qtyValue = $currentTarget.val()
                const rowId = $parent.data('row-id')
                
                // Get currently selected shipping method to preserve it
                const currentShippingMethod = $(document).find('input[name=shipping_method]:checked').val()
                const currentShippingOption = $(document).find('input[name=shipping_method]:checked').data('option')

                // Add checkout_context to indicate this is from checkout page
                const requestData = {
                    _token: $('meta[name="csrf-token"]').prop('content'),
                    [qtyKey]: qtyValue,
                    [`items[${rowId}][rowId]`]: rowId,
                    checkout_context: true, // Flag to indicate this is from checkout
                }
                
                // Include current shipping method selection if available
                if (currentShippingMethod) {
                    requestData.current_shipping_method = currentShippingMethod
                }
                if (currentShippingOption) {
                    requestData.current_shipping_option = currentShippingOption
                }

                $.ajax({
                    type: 'POST',
                    url: $parent.data('url'),
                    data: requestData,
                    success: ({ error, message, data }) => {
                        if (error) {
                            MainCheckout.showError(message)
                            return
                        }

                        // If cart update includes checkout data (shipping_methods, amount), use it
                        if (data.checkout_updated && data.shipping_methods && data.amount) {
                            console.log('Cart update included checkout data, updating shipping methods')
                            console.log('Shipping methods HTML preview:', data.shipping_methods.substring(0, 500) + '...')
                            
                            $('.cart-item-wrapper').html(data.amount)
                            
                            const $shippingArea = $('[data-bb-toggle="checkout-shipping-methods-area"]')
                            
                            // Count current shipping methods before update
                            const currentMethodsCount = $shippingArea.find('input[name=shipping_method]').length
                            console.log('Current shipping methods count before update:', currentMethodsCount)
                            
                            $shippingArea.html(data.shipping_methods)
                            
                            // Count shipping methods after update
                            const newMethodsCount = $shippingArea.find('input[name=shipping_method]').length
                            console.log('New shipping methods count after update:', newMethodsCount)
                            
                            // Log all available methods
                            $shippingArea.find('input[name=shipping_method]').each((index, element) => {
                                const $method = $(element)
                                console.log(`Method ${index + 1}:`, {
                                    value: $method.val(),
                                    option: $method.data('option'),
                                    checked: $method.is(':checked'),
                                    label: $method.next('label').find('.d-inline-block').first().text().trim()
                                })
                            })
                            
                            // Remove any WOW.js animation styles that might interfere
                            $shippingArea.find('*').removeAttr('style').removeClass('wow animated')
                            $shippingArea.removeAttr('style').removeClass('wow animated')
                            
                            // Try to restore the selected shipping method if it still exists
                            if (currentShippingMethod && currentShippingOption) {
                                const $newShippingOption = $shippingArea.find(`input[name=shipping_method][value="${currentShippingMethod}"][data-option="${currentShippingOption}"]`)
                                if ($newShippingOption.length) {
                                    $newShippingOption.prop('checked', true)
                                    $('input[name=shipping_option]').val(currentShippingOption)
                                    console.log('Preserved shipping method selection:', currentShippingMethod, currentShippingOption)
                                } else {
                                    console.log('Previously selected shipping method is no longer available')
                                    console.log('Looking for:', currentShippingMethod, currentShippingOption)
                                    console.log('Available options:', $shippingArea.find('input[name=shipping_method]').map((i, el) => 
                                        $(el).val() + ':' + $(el).data('option')).get().join(', '))
                                }
                            }
                        } else {
                            // Fallback to separate shipping fee calculation
                            calculateShippingFee()
                        }
                        
                        MainCheckout.showSuccess(message || 'Cart updated successfully!')
                    },
                    error: (error) => {
                        MainCheckout.handleError(error)
                    }
                })
            })
    }
}

$(() => {
    new MainCheckout().init()

    window.MainCheckout = MainCheckout
})
