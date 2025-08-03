/**
 * Dynamic Shipping Selector
 * Handles automatic shipping method selection and dynamic updates based on city and order total
 */

class DynamicShippingSelector {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleAutoSelection();
        this.updateShippingOnLocationChange();
    }

    bindEvents() {
        // Listen for city/state changes
        $(document).on('change', 'select[name="city"], select[name="state"]', () => {
            this.updateShippingMethods();
        });

        // Listen for quantity changes that might affect order total
        $(document).on('change', '.qty-input, input[name*="qty"]', () => {
            this.debounce(() => {
                this.updateShippingMethods();
            }, 500);
        });

        // Listen for coupon applications that might affect order total
        $(document).on('coupon:applied coupon:removed', () => {
            this.updateShippingMethods();
        });

        // Auto-submit shipping method when auto-selected
        $(document).on('change', '.shipping_method_input.auto-selected', (e) => {
            if ($(e.target).is(':checked')) {
                this.handleAutoSelectedMethod($(e.target));
            }
        });
    }

    handleAutoSelection() {
        // Check if free shipping is automatically applied (no selection needed)
        const freeShippingAutoApplied = $('input[name="shipping_option"][value="free_shipping_auto"]');
        
        if (freeShippingAutoApplied.length > 0) {
            // Free shipping is auto-applied, skip selection process
            this.handleFreeShippingAutoApplied();
            return;
        }
        
        const autoSelectedMethod = $('.shipping_method_input[data-auto-select="true"]');
        
        if (autoSelectedMethod.length === 1) {
            // Automatically check the auto-selected method
            autoSelectedMethod.prop('checked', true);
            
            // Show notification
            this.showAutoSelectionNotification(autoSelectedMethod);
            
            // Update hidden field for shipping option
            const option = autoSelectedMethod.data('option');
            $('input[name="shipping_option"]').val(option);
            
            // Trigger change event to update totals
            autoSelectedMethod.trigger('change');
        }
    }

    handleFreeShippingAutoApplied() {
        // Hide shipping method selection section
        $('.payment-checkout-form, .list_payment_method').hide();
        
        // Show confirmation message
        if (typeof window.showToast === 'function') {
            window.showToast('success', 'Free Shipping Applied!', 'No delivery selection needed - free shipping automatically applied!');
        }
        
        // Auto-advance to next step if this is part of a multi-step checkout
        this.autoAdvanceCheckout();
    }
    
    showAutoSelectionNotification(method) {
        const methodName = method.closest('li').find('label strong').first().text();
        const price = method.closest('li').find('.fs-5').text();
        
        // Create toast notification
        if (typeof window.showToast === 'function') {
            if (price.includes('Free')) {
                window.showToast('success', 'Free Shipping Applied!', `${methodName} has been automatically selected for your order.`);
            } else {
                window.showToast('info', 'Shipping Method Selected', `${methodName} (${price}) has been automatically selected.`);
            }
        }
    }

    handleAutoSelectedMethod(methodInput) {
        // Add visual feedback
        methodInput.closest('li').addClass('border-success');
        
        // Update shipping summary if available
        this.updateShippingSummary(methodInput);
    }

    updateShippingMethods() {
        const checkoutForm = $('.checkout-form, form[data-update-url]');
        
        if (checkoutForm.length === 0) {
            return;
        }

        const updateUrl = checkoutForm.data('update-url') || checkoutForm.attr('action');
        
        if (!updateUrl) {
            return;
        }

        // Show loading state
        this.showLoadingState();

        // Collect form data
        const formData = new FormData(checkoutForm[0]);
        
        // Add current city and state explicitly
        const selectedCity = $('select[name="city"] option:selected').val();
        const selectedState = $('select[name="state"] option:selected').val();
        
        if (selectedCity) formData.append('city', selectedCity);
        if (selectedState) formData.append('state', selectedState);

        // Make AJAX request
        fetch(updateUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            this.handleShippingUpdate(data);
        })
        .catch(error => {
            console.error('Error updating shipping methods:', error);
            this.hideLoadingState();
        });
    }

    handleShippingUpdate(data) {
        // Update shipping methods section
        if (data.shipping_methods) {
            $('.payment-checkout-form, .shipping-methods-container').html(data.shipping_methods);
            
            // Re-initialize auto-selection for new content
            this.handleAutoSelection();
        }

        // Update order totals
        if (data.amount) {
            $('.checkout-summary, .order-summary').html(data.amount);
        }

        // Update payment methods if needed
        if (data.payment_methods) {
            $('.payment-methods-container').html(data.payment_methods);
        }

        this.hideLoadingState();
        
        // Show notification if free shipping became available
        this.checkForFreeShippingUpgrade();
    }

    checkForFreeShippingUpgrade() {
        const freeShippingAlert = $('.alert-success:contains("Free shipping")');
        const autoSelectedFreeShipping = $('.shipping_method_input[data-auto-select="true"]').closest('li').find('.text-success:contains("Free")');
        
        // Check if free shipping auto-applied after update
        const freeShippingAutoApplied = $('input[name="shipping_option"][value="free_shipping_auto"]');
        
        if (freeShippingAutoApplied.length > 0) {
            this.handleFreeShippingAutoApplied();
            
            if (typeof window.showToast === 'function') {
                window.showToast('success', 'Congratulations!', 'Your order now qualifies for free shipping! No delivery selection needed.');
            }
        } else if (freeShippingAlert.length > 0 || autoSelectedFreeShipping.length > 0) {
            // Animate the free shipping notification
            freeShippingAlert.addClass('animate__animated animate__pulse');
            
            if (typeof window.showToast === 'function') {
                window.showToast('success', 'Great News!', 'Your order now qualifies for free shipping!');
            }
        }
    }

    showLoadingState() {
        $('.shipping-methods-container, .payment-checkout-form').addClass('loading-overlay');
        
        // Add spinner if not exists
        if ($('.shipping-spinner').length === 0) {
            $('.shipping-methods-container').append(`
                <div class="shipping-spinner position-absolute top-50 start-50 translate-middle">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading shipping methods...</span>
                    </div>
                </div>
            `);
        }
    }

    hideLoadingState() {
        $('.shipping-methods-container, .payment-checkout-form').removeClass('loading-overlay');
        $('.shipping-spinner').remove();
    }

    updateShippingSummary(methodInput) {
        const methodName = methodInput.closest('label').find('strong').first().text();
        const price = methodInput.closest('li').find('.fs-5').text();
        
        // Update any shipping summary display
        $('.selected-shipping-method').text(methodName);
        $('.selected-shipping-price').text(price);
    }

    updateShippingOnLocationChange() {
        // Immediate update when location changes significantly
        $(document).on('change', 'select[name="country"]', () => {
            // Country change - immediate update
            this.updateShippingMethods();
        });
        
        $(document).on('change', 'select[name="state"]', () => {
            // State change - update cities and shipping
            setTimeout(() => {
                this.updateShippingMethods();
            }, 500); // Wait for cities to load
        });
    }

    autoAdvanceCheckout() {
        // Auto-advance to next step in checkout process when shipping is auto-applied
        const nextButton = $('.btn-checkout-next, .checkout-continue, .continue-checkout');
        const form = $('.checkout-form');
        
        // Add visual indication that shipping is handled
        $('.shipping-section, .delivery-section').addClass('completed-automatically');
        
        // Optionally auto-click next button after a short delay
        // Uncomment if you want automatic progression
        // setTimeout(() => {
        //     if (nextButton.length > 0 && !nextButton.prop('disabled')) {
        //         nextButton.click();
        //     }
        // }, 2000);
    }
    
    // Utility function for debouncing
    debounce(func, wait) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(func, wait);
    }
}

// Initialize when DOM is ready
$(document).ready(() => {
    if ($('.checkout-form, .shipping-methods-container').length > 0) {
        window.dynamicShippingSelector = new DynamicShippingSelector();
    }
});

// Export for use in other scripts
window.DynamicShippingSelector = DynamicShippingSelector;