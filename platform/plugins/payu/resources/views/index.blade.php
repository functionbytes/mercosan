<?php
// FILE: platform/plugins/payu/resources/views/index.blade.php
// REWRITTEN: This is the main settings view, adapted for PayU Latam.

$name = 'PayU Latam';
$description = 'Paga con tarjeta de crédito/débito o PSE a través de PayU Latam.';
$link = 'https://www.payu.com.co';
$image = asset('vendor/core/plugins/payu/images/payu.png');
$moduleName = \FriendsOfBotble\PayU\Providers\PayUServiceProvider::MODULE_NAME;
$status = (bool) get_payment_setting('status', $moduleName);
?>

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
                                        <a href="https://www.payu.com.co/" target="_blank">
                                            {{ trans('plugins/payment::payment.service_registration', ['name' => $name]) }}
                                        </a>
                                    </li>
                                    <li style="list-style-type:decimal">
                                        <p>Después de registrarte, inicia sesión en tu panel de PayU Latam.</p>
                                    </li>
                                    <li style="list-style-type:decimal">
                                        <p>Busca tus credenciales (Merchant ID, Account ID, API Key) en la sección de configuración técnica y pégalas aquí.</p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="col-sm-6">
                        <div class="well bg-white">
                            <x-core-setting::text-input
                                name="payment_payu_name"
                                :label="trans('plugins/payment::payment.method_name')"
                                :value="get_payment_setting('name', $moduleName, 'PayU Latam')"
                                data-counter="400"
                            />

                            <x-core-setting::form-group>
                                <label class="text-title-field" for="payment_payu_description">{{ trans('core/base::forms.description') }}</label>
                                <textarea class="next-input" name="payment_payu_description" id="payment_payu_description">{{ get_payment_setting('description', $moduleName, 'Paga con tarjeta de crédito/débito o PSE a través de PayU.') }}</textarea>
                            </x-core-setting::form-group>

                            <x-core-setting::select
                                :name="'payment_' . $moduleName . '_mode'"
                                :label="'Entorno'"
                                :options="[
                                    'sandbox' => 'Pruebas (Sandbox)',
                                    'production' => 'Producción',
                                ]"
                                :value="get_payment_setting('mode', $moduleName, 'sandbox')"
                            />

                            <x-core-setting::text-input
                                :name="'payment_' . $moduleName . '_merchant_id'"
                                label="Merchant ID"
                                :value="get_payment_setting('merchant_id', $moduleName)"
                                placeholder="Ej: 508029"
                            />

                            <x-core-setting::text-input
                                :name="'payment_' . $moduleName . '_account_id'"
                                label="Account ID"
                                :value="get_payment_setting('account_id', $moduleName)"
                                placeholder="Ej: 512321"
                            />

                            <div class="form-group">
                                <label class="text-title-field" for="payment_{{ $moduleName }}_api_key">API Key</label>
                                <input type="password" class="form-control" name="payment_{{ $moduleName }}_api_key" id="payment_{{ $moduleName }}_api_key" value="{{ get_payment_setting('api_key', $moduleName) }}" placeholder="Tu API Key secreta">
                            </div>

                            {!! apply_filters(PAYMENT_METHOD_SETTINGS_CONTENT, null, $moduleName) !!}
                        </div>
                    </div>
                </div>

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
