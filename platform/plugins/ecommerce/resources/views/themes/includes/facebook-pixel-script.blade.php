<script>
    $(function () {
        if (typeof fbq !== 'function') {
            return;
        }

        // Botble default theme buttons
        $(document).on('click', '[data-bb-toggle="add-to-cart-in-form"]', function (e) {
            var currentTarget = $(e.currentTarget);
            var form = currentTarget.closest('form');
            var price = currentTarget.data('product-price');
            var quantity = form.find('input[name="qty"]').val();
            fbq('track', 'AddToCart', {
                content_ids: [String(currentTarget.data('product-id'))],
                content_name: currentTarget.data('product-name'),
                content_type: 'product',
                value: price * quantity,
                currency: '{{ get_application_currency()->title }}',
            });
        });
        $(document).on('click', '[data-bb-toggle="add-to-cart"]', function (e) {
            var currentTarget = $(e.currentTarget);
            var price = currentTarget.data('product-price');
            fbq('track', 'AddToCart', {
                content_ids: [String(currentTarget.data('product-id'))],
                content_name: currentTarget.data('product-name'),
                content_type: 'product',
                value: price,
                currency: '{{ get_application_currency()->title }}',
            });
        });

        // Wowy theme: product listing add-to-cart button
        $(document).on('click', '.add-to-cart-button', function (e) {
            var btn = $(e.currentTarget);
            var id = String(btn.data('id') || '');
            var price = parseFloat(btn.data('product-price') || 0);
            var name = btn.data('product-name') || '';
            if (!id) return;
            fbq('track', 'AddToCart', {
                content_ids: [id],
                content_name: name,
                content_type: 'product',
                value: price,
                currency: '{{ get_application_currency()->title }}',
            });
        });

        // Wowy theme: product detail page form submit button
        $(document).on('click', '.add-to-cart-form button[type="submit"]', function (e) {
            var form = $(e.currentTarget).closest('form');
            var id = String(form.data('product-id') || form.find('.hidden-product-id, input[name="id"]').val() || '');
            var price = parseFloat(form.data('product-price') || 0);
            var name = form.data('product-name') || '';
            var qty = parseInt(form.find('input[name="qty"]').val() || 1);
            if (!id) return;
            fbq('track', 'AddToCart', {
                content_ids: [id],
                content_name: name,
                content_type: 'product',
                value: price * qty,
                currency: '{{ get_application_currency()->title }}',
            });
        });
    });
</script>
