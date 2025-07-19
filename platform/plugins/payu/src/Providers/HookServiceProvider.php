<?php

namespace FriendsOfBotble\PayU\Providers;

use Botble\Payment\Enums\PaymentMethodEnum;
use Botble\Payment\Facades\PaymentMethods;
use FriendsOfBotble\PayU\Services\PayUPaymentService;
use FriendsOfBotble\PayU\Services\PayUService;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;
use Throwable;

class HookServiceProvider extends ServiceProvider
{
    public function boot(): void
    {


        $paymentData = apply_filters(PAYMENT_FILTER_PAYMENT_DATA, [], $request);

        add_filter(PAYMENT_METHODS_SETTINGS_PAGE, function (?string $settings) {
            return $settings . view('plugins/payu::index')->render();
        }, 999);

        add_filter(BASE_FILTER_ENUM_ARRAY, function (array $values, string $class): array {
            if ($class === PaymentMethodEnum::class) {
                $values['PAYU'] = PayUServiceProvider::MODULE_NAME;
            }
            return $values;
        }, 999, 2);

        add_filter(BASE_FILTER_ENUM_LABEL, function ($value, $class): string {
            if ($class === PaymentMethodEnum::class && $value === PayUServiceProvider::MODULE_NAME) {
                $value = 'PayU Latam';
            }
            return $value;
        }, 999, 2);

        add_filter(PAYMENT_FILTER_ADDITIONAL_PAYMENT_METHODS, function (?string $html, array $data): ?string {
            if (get_payment_setting('status', PayUServiceProvider::MODULE_NAME)) {
                PaymentMethods::method(PayUServiceProvider::MODULE_NAME, [
                    'html' => view(
                        'plugins/payu::method',
                        $data,
                        ['moduleName' => PayUServiceProvider::MODULE_NAME]
                    )->render(),
                ]);
            }
            return $html;
        }, 999, 2);

        add_filter(PAYMENT_FILTER_GET_SERVICE_CLASS, function (?string $data, string $value): ?string {
            if ($value === PayUServiceProvider::MODULE_NAME) {
                $data = PayUPaymentService::class;
            }
            return $data;
        }, 20, 2);
        // --- CRITICAL CHANGE: This filter prepares the data for PayU Latam ---
        add_filter(PAYMENT_FILTER_AFTER_POST_CHECKOUT, function (array $data, Request $request): array {
            if ($data['type'] !== PayUServiceProvider::MODULE_NAME) {
                return $data;
            }

            $paymentData = apply_filters(PAYMENT_FILTER_PAYMENT_DATA, [], $request);

            try {
                $payUService = new PayUService();

                // Prepare data specifically for PayU Latam
                $payUService->withData([
                    'referenceCode'   => $paymentData['order_id'][0], // Use the first order ID as the reference
                    'description'     => 'Pedido ' . $paymentData['order_id'][0],
                    'amount'          => number_format($paymentData['amount'], 2, '.', ''),
                    'currency'        => 'COP',
                    'buyerEmail'      => $paymentData['address']['email'],
                    'responseUrl'     => route('payment.payu.callback'),
                    'confirmationUrl' => route('payment.payu.confirmation'),
                    'test'            => get_payment_setting('mode', PayUServiceProvider::MODULE_NAME) === 'sandbox' ? '1' : '0',
                ]);

                $payUService->redirectToCheckoutPage();

            } catch (Throwable $exception) {
                $data['error'] = true;
                $data['message'] = json_encode($exception->getMessage());
            }

            return $data;
        }, 999, 2);
    }
}
