<?php

namespace Functionbytes\Wompi\Providers;

use Botble\Payment\Enums\PaymentMethodEnum;
use Botble\Payment\Facades\PaymentMethods;
use Functionbytes\Wompi\Services\WompiPaymentService;
use Functionbytes\Wompi\Services\WompiService;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;
use Throwable;

class HookServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Agregar configuraciones de Wompi a la página de configuración de pagos
        add_filter(PAYMENT_METHODS_SETTINGS_PAGE, function (?string $settings) {
            return $settings . view('plugins/wompi::index')->render();
        }, 999);

        // Registrar Wompi como método de pago en el enum
        add_filter(BASE_FILTER_ENUM_ARRAY, function (array $values, string $class): array {
            if ($class === PaymentMethodEnum::class) {
                $values['WOMPI'] = WompiServiceProvider::MODULE_NAME;
            }
            return $values;
        }, 999, 2);

        // Definir la etiqueta para mostrar en el admin
        add_filter(BASE_FILTER_ENUM_LABEL, function ($value, $class): string {
            if ($class === PaymentMethodEnum::class && $value === WompiServiceProvider::MODULE_NAME) {
                $value = 'Wompi';
            }
            return $value;
        }, 999, 2);

        // Agregar el método de pago a la lista de métodos disponibles
        add_filter(PAYMENT_FILTER_ADDITIONAL_PAYMENT_METHODS, function (?string $html, array $data): ?string {
            if (get_payment_setting('status', WompiServiceProvider::MODULE_NAME)) {
                PaymentMethods::method(WompiServiceProvider::MODULE_NAME, [
                    'html' => view(
                        'plugins/wompi::method',
                        array_merge($data, [
                            'moduleName' => WompiServiceProvider::MODULE_NAME,
                            'selecting_method' => PaymentMethods::getSelectingMethod()
                        ])
                    )->render(),
                ]);
            }
            return $html;
        }, 999, 2);

        // Registrar el servicio de pago de Wompi
        add_filter(PAYMENT_FILTER_GET_SERVICE_CLASS, function (?string $data, string $value): ?string {
            if ($value === WompiServiceProvider::MODULE_NAME) {
                $data = WompiPaymentService::class;
            }
            return $data;
        }, 20, 2);

        // Procesar el checkout para Wompi
        add_filter(PAYMENT_FILTER_AFTER_POST_CHECKOUT, function (array $data, Request $request): array {
            if ($data['type'] !== WompiServiceProvider::MODULE_NAME) {
                return $data;
            }

            $paymentData = apply_filters(PAYMENT_FILTER_PAYMENT_DATA, [], $request);

            try {
                $wompiService = new WompiService();

                // Preparar datos para el Web Checkout de Wompi
                $wompiService->withData([
                    'reference'        => $paymentData['order_id'][0], // Usar el primer ID de orden como referencia
                    'amount'           => (float) $paymentData['amount'],
                    'currency'         => $paymentData['currency'] ?? 'COP',
                    'customer_email'   => $paymentData['address']['email'],
                    'customer_name'    => trim(($paymentData['address']['first_name'] ?? '') . ' ' . ($paymentData['address']['last_name'] ?? '')),
                    'customer_phone'   => $paymentData['address']['phone'] ?? '',
                    'redirect_url'     => route('payment.wompi.callback'),
                    'tax'              => $this->calculateTax($paymentData['amount']),
                    // Datos completos de dirección de envío
                    'shipping_address' => $paymentData['address']['address'] ?? '',
                    'shipping_city'    => $paymentData['address']['city'] ?? '',
                    'shipping_region'  => $paymentData['address']['state'] ?? $paymentData['address']['region'] ?? '',
                    'shipping_phone'   => $paymentData['address']['phone'] ?? '',
                    'shipping_country' => $paymentData['address']['country'] ?? 'CO', // Colombia por defecto
                ]);

                // Redirigir al Web Checkout
                $wompiService->redirectToCheckoutPage();

            } catch (Throwable $exception) {
                $data['error'] = true;
                $data['message'] = $exception->getMessage();
            }

            return $data;
        }, 999, 2);
    }

    /**
     * Calculate tax based on Colombian tax rules
     */
    private function calculateTax(float $amount): float
    {
        // Colombian IVA is typically 19%
        // Adjust this calculation based on your business needs
        return $amount * 0.19;
    }
}
