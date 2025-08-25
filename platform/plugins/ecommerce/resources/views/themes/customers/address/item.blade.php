


<div class="col-sp-12 col-xs-12 col-sm-12 col-md-6 col-lg-6 address-box-item">
    <div class="address-box">
        <div class="address-header">
            <div class="name">
                {{ $address->name }}
            </div>
            @if ($address->is_default)
            <div class="alias">
                {{ __('Default') }}
            </div>
            @endif
        </div>
        <div class="address-body">
            <div class="table-responsive address-table">
                <table class="table">
                    <tbody>
                    <tr>
                        <td>{{ __('Address') }} :</td>
                        <td>
                            <p>{{ $address->full_address }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>{{ __('Phone') }} :</td>
                        <td>
                            {{ $address->phone }}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="button-group">
            <a class="btn  w-100" href="{{ route('customer.address.edit', $address->id) }}" >
                {{ __('Edit') }}
            </a>
            <x-core::form  :url="route('customer.address.destroy', $address->id)" method="get" onsubmit="return confirm('{{ __('Are you sure you want to delete this address?') }}')">
                <a class="btn  w-100" type="submit" onclick="$(this).closest('form').submit()">{{ __('Remove') }}</a>
            </x-core::form>
        </div>
    </div>
</div>

