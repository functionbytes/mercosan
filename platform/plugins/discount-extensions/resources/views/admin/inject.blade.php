@push('header')
    <script>
        window.discountExtensionsData = {
            first_order_only: {{ (int) ($discount->first_order_only ?? 0) }},
            max_uses_per_customer: {!! isset($discount) && $discount->max_uses_per_customer !== null ? (int) $discount->max_uses_per_customer : 'null' !!}
        };
    </script>
@endpush

@push('footer')
    <script src="{{ asset('vendor/discount-extensions/js/admin-discount-fields.js') }}"></script>
@endpush
