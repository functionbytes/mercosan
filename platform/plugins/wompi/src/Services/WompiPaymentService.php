<?php

namespace Functionbytes\Wompi\Services;

use Botble\Payment\Services\Abstracts\PaymentAbstract;
use Functionbytes\Wompi\Providers\WompiServiceProvider;
use Illuminate\Http\Request;
use Throwable;

class WompiPaymentService extends PaymentAbstract
{
    public function makePayment(Request $request): string
    {
        $paymentData = $this->preparePaymentData($request);

        try {
            $wompiService = new WompiService();

            // Preparar datos para Wompi Web Checkout
            $wompiService->withData([
                'reference'        => $paymentData['order_id'][0], // Referencia única del pedido
                'amount'           => $paymentData['amount'],
                'currency'         => $paymentData['currency'] ?? 'COP',
                'customer_email'   => $paymentData['address']['email'],
                'customer_name'    => trim(($paymentData['address']['first_name'] ?? '') . ' ' . ($paymentData['address']['last_name'] ?? '')),
                'customer_phone'   => $paymentData['address']['phone'] ?? '',
                'redirect_url'     => route('payment.wompi.callback'), // URL de retorno
                'tax'              => $this->calculateTax($paymentData['amount']),
                // Datos completos de dirección de envío
                'shipping_address' => $paymentData['address']['address'] ?? '',
                'shipping_city'    => $paymentData['address']['city'] ?? '',
                'shipping_region'  => $paymentData['address']['state'] ?? $paymentData['address']['region'] ?? '',
                'shipping_phone'   => $paymentData['address']['phone'] ?? '',
                'shipping_country' => $paymentData['address']['country'] ?? 'CO', // Colombia por defecto
            ]);

            // Redirigir al Web Checkout de Wompi
            $wompiService->redirectToCheckoutPage();

            // Este return nunca se ejecutará porque redirectToCheckoutPage() hace exit()
            return '';

        } catch (Throwable $exception) {
            $this->setErrorMessageAndLogging($exception);
            return '';
        }
    }

    public function afterMakePayment(Request $request)
    {
        // No se necesita implementación ya que la redirección se maneja en makePayment
        // y el procesamiento del pago se hace vía webhook
    }

    public function getServiceProvider(): string
    {
        return WompiServiceProvider::MODULE_NAME;
    }

    public function isSupportRefundOnline(): bool
    {
        return false; // Wompi soporta reembolsos pero requiere implementación adicional
    }

    public function refund(string $chargeId, float $amount, array $options = []): array
    {
        // TODO: Implementar reembolsos usando la API de Wompi
        // Por ahora retornamos error
        return [
            'error' => true,
            'message' => 'Refunds are not implemented yet for Wompi.',
        ];
    }

    /**
     * Calculate tax based on Colombian tax rules
     * This is a simple example - adjust according to your business needs
     */
    private function calculateTax(float $amount): float
    {
        // Colombian IVA is typically 19%
        // Adjust this calculation based on your tax requirements
        return $amount * 0.19;
    }
}
