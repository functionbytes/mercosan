<?php
// FILE: platform/plugins/payu/src/Http/Controllers/PayUController.php
// REWRITTEN: Controller methods renamed to match the new route structure.

namespace FriendsOfBotble\PayU\Http\Controllers;

use Botble\Base\Http\Controllers\BaseController;
use Botble\Payment\Enums\PaymentStatusEnum;
use Botble\Payu\Traits\PaymentsTrait;
use FriendsOfBotble\PayU\Providers\PayUServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Botble\Ecommerce\Models\Order;
use Exception;

class PayUController extends BaseController
{

    /**
     * Handles the user redirection from PayU. This is purely informational.
     */
    public function callback(Request $request)
    {
        $referenceCode = $request->input('referenceCode');
        // Simply redirect the user to the success page.
        // The actual order status is updated by the confirmation webhook.
        return redirect()->route('public.checkout.success', $referenceCode);
    }

    /**
     * Handles the server-to-server confirmation webhook from PayU.
     * This is the only reliable way to confirm a payment.
     */
    public function webhook(Request $request)
    {
        // --- 1. GET DATA AND VALIDATE SIGNATURE ---
        $state_pol = $request->input('state_pol');
        $reference_sale = $request->input('reference_sale');
        $value = $request->input('value');
        $sign_received = $request->input('sign');

        Log::info('PayU Confirmation Received for order: ' . $reference_sale, $request->all());

        $apiKey = get_payment_setting('api_key', PayUServiceProvider::MODULE_NAME);
        $merchantId = get_payment_setting('merchant_id', PayUServiceProvider::MODULE_NAME);
        $formattedValue = number_format(round((float)$value, 1), 1, '.', '');
        $stringToSign = "{$apiKey}~{$merchantId}~{$reference_sale}~{$formattedValue}~{$state_pol}";
        $signature_calculated = md5($stringToSign);

        if (strtoupper($signature_calculated) !== strtoupper($sign_received)) {
            Log::error('PayU Confirmation: Invalid signature for order ' . $reference_sale);
            return response('Invalid signature', 400);
        }

        // --- 2. FIND ORDER AND RUN SECURITY CHECKS ---
        $order = Order::where('code', $reference_sale)->with('payment')->first();

        if (!$order) {
            Log::error('PayU Confirmation: Order with code ' . $reference_sale . ' not found.');
            return response('Order not found', 404);
        }

        if ($order->payment && $order->payment->status == PaymentStatusEnum::COMPLETED) {
            Log::warning('PayU Confirmation: Order ' . $reference_sale . ' has already been paid.');
            return response('Order already paid', 200);
        }

        if ((float)$formattedValue != round($order->amount, 1)) {
            Log::error('PayU Confirmation: Amount mismatch for order ' . $reference_sale, ['expected' => round($order->amount, 1), 'received' => $formattedValue]);
            return response('Amount mismatch', 400);
        }

        // --- 3. PROCESS PAYMENT USING BOTBLE'S TRAITS ---
        $paymentStatus = $state_pol == '4' ? PaymentStatusEnum::COMPLETED : PaymentStatusEnum::FAILED;

        try {
            $chargeId = PaymentsTrait::storeLocalPayment([
                'amount'          => (float)$value,
                'currency'        => $request->input('currency'),
                'charge_id'       => $request->input('transaction_id'),
                'payment_channel' => PayUServiceProvider::MODULE_NAME,
                'status'          => $paymentStatus,
                'order_id'        => $order->id,
            ]);

            if ($paymentStatus == PaymentStatusEnum::COMPLETED) {
                $this->afterPaymentCompleted($chargeId);
            }
        } catch (Exception $exception) {
            Log::error('PayU Confirmation Error: ' . $exception->getMessage(), ['order_code' => $reference_sale]);
            return response('Error processing payment', 500);
        }

        return response('OK', 200);
    }
}
