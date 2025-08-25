@extends(EcommerceHelper::viewPath('customers.master'))

@section('title', __('Address books'))

@section('content')
    @if($addresses->isNotEmpty())
        <div class="dashboard-address">

            <div class="dashboard-title d-flex justify-content-between align-items-center">
                <div class="title">
                    <h2>Tus direcciones</h2>
                </div>
                <a class="btn btn-add-addresses" ihref="{{ route('customer.address.create') }}">
                    <i class="fa-solid fa-plus"></i>
                    <span>{{ __('Add a new address') }}</span>
                </a>
            </div>

            @if ($addresses->isNotEmpty())
                <div class="row g-sm-4 g-3">
                    @foreach ($addresses as $address)
                        @include(EcommerceHelper::viewPath('customers.address.item'), ['address' => $address])
                    @endforeach
                </div>
            @endif

        </div>
    @else
        @include(EcommerceHelper::viewPath('customers.partials.empty-state'), [
            'title' => __('No addresses!'),
            'subtitle' => __('You have not added any addresses yet.'),
            'actionUrl' => route('customer.address.create'),
            'actionLabel' => __('Add a new address'),
        ])
    @endif
@endsection
