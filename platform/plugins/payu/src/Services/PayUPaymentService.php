<?php
// FILE: platform/plugins/payu/src/Services/PayUPaymentService.php
// NEW: This class handles the integration with Botble's payment system.

namespace FriendsOfBotble\PayU\Services;

use Botble\Payment\Services\Abstracts\PaymentAbstract;
use FriendsOfBotble\PayU\Providers\PayUServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Throwable;

class PayUPaymentService extends PaymentAbstract
{
    public function makePayment(Request $request): string
    {
        dd($request,"makePayment");
        $paymentData = $this->preparePaymentData($request);

        try {
            $payUService = new PayUService();
            $referenceCode = $data['checkout_token'] ?? Str::random(20);;
            $payUService->withData([
                'referenceCode'   => $referenceCode,
                'description'     => 'Pedido ' . $referenceCode,
                'amount'          => number_format($paymentData['amount'], 2, '.', ''),
                'currency'        => 'COP',
                'buyerEmail'      => $paymentData['address']['email'],
                'responseUrl'     => route('payment.payu.callback'),      // <-- Debe ser 'payment.payu.callback'
                'confirmationUrl' => route('payment.payu.confirmation'),  // <-- Debe ser 'payment.payu.confirmation'
                'test'            => get_payment_setting('mode', PayUServiceProvider::MODULE_NAME) === 'sandbox' ? '1' : '0',
            ]);

            return $payUService->redirectToCheckoutPage();

        } catch (Throwable $exception) {
            $this->setErrorMessageAndLogging($exception);
            return '';
        }
    }

    public function afterMakePayment(Request $request)
    {
        // This method is intentionally left blank as the redirection is handled in makePayment.
    }

    public function getServiceProvider(): string
    {
        return PayUServiceProvider::MODULE_NAME;
    }

    public function isSupportRefundOnline(): bool
    {
        return false; // PayU Latam refund API is complex, disabling for now.
    }

    public function refund(string $chargeId, float $amount, array $options = []): array
    {
        return [
            'error' => true,
            'message' => 'Refunds are not supported at this time.',
        ];
    }
}
