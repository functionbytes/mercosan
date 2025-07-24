
@php
    $name = 'Wompi';
    $description = 'Customer can buy product and pay directly using Visa, Credit card via Wompi (Colombian payment gateway)';
    $link = 'https://comercios.wompi.co/';
    $image = asset('vendor/core/plugins/wompi/images/wompi.png');
    $moduleName = \Functionbytes\Wompi\Providers\WompiServiceProvider::MODULE_NAME;
    $status = (bool) get_payment_setting('status', $moduleName);
@endphp

<table class="table payment-method-item">
    <tbody>
    <tr class="border-pay-row">
        <td class="border-pay-col">
            <i class="fa fa-theme-payments"></i>
        </td>
        <td style="width: 20%">
            <img class="filter-black" src="{{ $image }}" alt="{{ $name }}">
        </td>
        <td class="border-right">
            <ul>
                <li>
                    <a href="{{ $link }}" target="_blank">{{ $name }}</a>
                    <p>{{ $description }}</p>
                </li>
            </ul>
        </td>
    </tr>
    <tr class="bg-white">
        <td colspan="3">
            <div class="float-start" style="margin-top: 5px;">
                <div @class(['payment-name-label-group', 'hidden' => ! $status])>
                    <span class="payment-note v-a-t">{{ trans('plugins/payment::payment.use') }}:</span>
                    <label class="ws-nm inline-display method-name-label">{{ get_payment_setting('name', $moduleName) }}</label>
                </div>
            </div>
            <div class="float-end">
                <a @class(['btn btn-secondary toggle-payment-item edit-payment-item-btn-trigger', 'hidden' => ! $status])>{{ trans('plugins/payment::payment.edit') }}</a>
                <a @class(['btn btn-secondary toggle-payment-item save-payment-item-btn-trigger', 'hidden' => $status])>{{ trans('plugins/payment::payment.settings') }}</a>
            </div>
        </td>
    </tr>
    <tr class="paypal-online-payment payment-content-item hidden">
        <td class="border-left" colspan="3">
            <form>
                <input type="hidden" name="type" value="{{ $moduleName }}" class="payment_type">

                <div class="row">
                    <div class="col-sm-6">
                        <ul>
                            <li>
                                <label>{{ trans('plugins/payment::payment.configuration_instruction', ['name' => $name]) }}</label>
                            </li>
                            <li class="payment-note">
                                <p>{{ trans('plugins/payment::payment.configuration_requirement', ['name' => $name]) }}:</p>
                                <ul class="m-md-l" style="list-style-type:decimal">
                                    <li style="list-style-type:decimal">
                                        <a href="https://comercios.wompi.co/" target="_blank">
                                            {{ trans('plugins/payment::payment.service_registration', ['name' => $name]) }}
                                        </a>
                                    </li>
                                    <li style="list-style-type:decimal">
                                        <p>After registration at <a href="https://comercios.wompi.co/" target="_blank">Wompi</a>, you will have Public Key, Private Key and Integrity Secret</p>
                                    </li>
                                    <li style="list-style-type:decimal">
                                        <p>Enter the Public Key, Private Key and Integrity Secret in the form below</p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="col-sm-6">
                        <div class="well bg-white">
                            <x-core-setting::text-input
                                name="payment_wompi_name"
                                :label="trans('plugins/payment::payment.method_name')"
                                :value="get_payment_setting('name', $moduleName, trans('plugins/payment::payment.pay_online_via', ['name' => $name]))"
                                data-counter="400"
                            />

                            <x-core-setting::form-group>
                                <label class="text-title-field" for="payment_wompi_description">{{ trans('core/base::forms.description') }}</label>
                                <textarea class="next-input" name="payment_wompi_description" id="payment_wompi_description">{{ get_payment_setting('description', $moduleName, $description) }}</textarea>
                            </x-core-setting::form-group>

                            <x-core-setting::select
                                :name="'payment_' . $moduleName . '_mode'"
                                :label="trans('plugins/payment::payment.mode')"
                                :options="[
                                    'sandbox' => 'Sandbox',
                                    'live' => 'Live',
                                ]"
                                :value="get_payment_setting('mode', $moduleName, 'sandbox')"
                            />

                            <x-core-setting::text-input
                                :name="'payment_' . $moduleName . '_public_key'"
                                :label="'Public Key'"
                                :value="get_payment_setting('public_key', $moduleName)"
                                placeholder="pub_sandbox_..."
                            />

                            <x-core-setting::text-input
                                :name="'payment_' . $moduleName . '_private_key'"
                                :label="'Private Key'"
                                :value="get_payment_setting('private_key', $moduleName)"
                                placeholder="prv_sandbox_..."
                                type="password"
                            />

                            <x-core-setting::text-input
                                :name="'payment_' . $moduleName . '_integrity_secret'"
                                :label="'Integrity Secret'"
                                :value="get_payment_setting('integrity_secret', $moduleName)"
                                placeholder="sandbox_integrity_..."
                                type="password"
                            />

                            {!! apply_filters(PAYMENT_METHOD_SETTINGS_CONTENT, null, $moduleName) !!}
                        </div>
                    </div>
                </div>

                @if (get_payment_setting('status', $moduleName) == 1)
                    <div class="col-12 bg-white">
                        <div class="alert alert-warning">
                            <strong>Important URLs for Wompi configuration:</strong>
                            <ul class="m-0 pl-4">
                                <li><strong>Callback URL:</strong> <code>{{ route('payment.wompi.callback') }}</code></li>
                                <li><strong>Webhook URL:</strong> <code>{{ route('payment.wompi.webhook') }}</code></li>
                            </ul>
                            <small class="text-muted">Configure these URLs in your Wompi merchant dashboard to receive payment notifications.</small>
                            <br><small class="text-info"><strong>Note:</strong> For local development, webhooks won't work. Use the callback URL only.</small>
                        </div>
                    </div>
                @endif

                <div class="col-12 bg-white text-end">
                    <button @class(['btn btn-warning disable-payment-item', 'hidden' => ! $status]) type="button">{{ trans('plugins/payment::payment.deactivate') }}</button>
                    <button @class(['btn btn-info save-payment-item btn-text-trigger-save', 'hidden' => $status]) type="button">{{ trans('plugins/payment::payment.activate') }}</button>
                    <button @class(['btn btn-info save-payment-item btn-text-trigger-update', 'hidden' => ! $status]) type="button">{{ trans('plugins/payment::payment.update') }}</button>
                </div>
            </form>
        </td>
    </tr>
    </tbody>
</table>
