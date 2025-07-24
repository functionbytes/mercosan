<?php

namespace Functionbytes\Wompi\Http\Controllers;

use Botble\Base\Http\Controllers\BaseController;
use Botble\Payment\Enums\PaymentStatusEnum;
use Functionbytes\Wompi\Providers\WompiServiceProvider;
use Functionbytes\Wompi\Services\WompiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Botble\Ecommerce\Models\Order;
use Exception;

class WompiController extends BaseController
{

    /**
     * Handle user redirection from Wompi Web Checkout
     */
    public function callback(Request $request)
    {
        $transactionId = $request->input('id');
        $reference = $request->input('reference');

        // Log the callback for debugging (especialmente útil en desarrollo)
        Log::info('Wompi Callback received', [
            'transaction_id' => $transactionId,
            'reference' => $reference,
            'all_params' => $request->all(),
            'environment' => app()->environment(),
            'url' => $request->fullUrl()
        ]);

        if ($transactionId) {
            try {
                $wompiService = new WompiService();
                $transaction = $wompiService->getTransaction($transactionId);

                Log::info('Wompi Transaction details', $transaction);

                $status = $transaction['data']['status'] ?? 'PENDING';

                if ($status === 'APPROVED') {
                    return redirect()->route('public.checkout.success', $reference);
                } else {
                    Log::warning('Wompi transaction not approved', [
                        'status' => $status,
                        'transaction_id' => $transactionId
                    ]);
                    return redirect()->route('public.checkout.failure', $reference);
                }

            } catch (Exception $e) {
                Log::error('Error processing Wompi callback: ' . $e->getMessage(), [
                    'transaction_id' => $transactionId,
                    'reference' => $reference,
                    'exception' => $e->getTraceAsString()
                ]);
                return redirect()->route('public.checkout.failure', $reference);
            }
        }

        Log::error('Wompi callback received without transaction ID', $request->all());
        return redirect()->route('public.checkout.failure');
    }


    /**
     * Handle webhook from Wompi (server-to-server notification)
     */
    public function webhook(Request $request)
    {
        $payload = $request->all();
        $signature = $request->header('X-Signature');

        Log::info('Wompi Webhook received', $payload);

        if (!$signature) {
            Log::error('Wompi Webhook: Missing signature');
            return response('Missing signature', 400);
        }

        try {
            $wompiService = new WompiService();

            // Verify signature
            if (!$wompiService->verifySignature($payload, $signature)) {
                Log::error('Wompi Webhook: Invalid signature');
                return response('Invalid signature', 400);
            }

            $transaction = $payload['data']['transaction'] ?? null;

            if (!$transaction) {
                Log::error('Wompi Webhook: No transaction data');
                return response('No transaction data', 400);
            }

            $reference = $transaction['reference'];
            $transactionId = $transaction['id'];
            $status = $transaction['status'];
            $amountInCents = $transaction['amount_in_cents'];

            // Find the order
            $order = Order::where('code', $reference)->with('payment')->first();

            if (!$order) {
                Log::error("Wompi Webhook: Order with reference {$reference} not found");
                return response('Order not found', 404);
            }

            // Check if already processed
            if ($order->payment && $order->payment->status == PaymentStatusEnum::COMPLETED) {
                Log::info("Wompi Webhook: Order {$reference} already processed");
                return response('Already processed', 200);
            }

            // Verify amount (convert cents to currency)
            $receivedAmount = $amountInCents / 100;
            $expectedAmount = round($order->amount, 2);

            if (abs($receivedAmount - $expectedAmount) > 0.01) {
                Log::error("Wompi Webhook: Amount mismatch for order {$reference}", [
                    'expected' => $expectedAmount,
                    'received' => $receivedAmount
                ]);
                return response('Amount mismatch', 400);
            }

            // Determine payment status
            $paymentStatus = match($status) {
                'APPROVED' => PaymentStatusEnum::COMPLETED,
                'DECLINED', 'ERROR' => PaymentStatusEnum::FAILED,
                default => PaymentStatusEnum::PENDING
            };

            // Store payment using Botble's trait
            $chargeId = $this->storeLocalPayment([
                'amount' => $receivedAmount,
                'currency' => $transaction['currency'] ?? 'COP',
                'charge_id' => $transactionId,
                'payment_channel' => WompiServiceProvider::MODULE_NAME,
                'status' => $paymentStatus,
                'order_id' => $order->id,
            ]);

            // If payment completed, trigger post-payment actions
            if ($paymentStatus == PaymentStatusEnum::COMPLETED) {
                $this->afterPaymentCompleted($chargeId);
            }

            Log::info("Wompi Webhook: Payment processed successfully for order {$reference}");

            return response('OK', 200);

        } catch (Exception $e) {
            Log::error('Wompi Webhook Error: ' . $e->getMessage(), [
                'payload' => $payload
            ]);
            return response('Error processing webhook', 500);
        }
    }

    /**
     * Handle transaction inquiry (optional endpoint for checking status)
     */
    public function checkTransaction(Request $request, string $transactionId)
    {
        try {
            $wompiService = new WompiService();
            $transaction = $wompiService->getTransaction($transactionId);

            return response()->json([
                'success' => true,
                'data' => $transaction
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Simulate webhook for local development
     * URL: /payment/wompi/simulate-webhook/{transactionId}
     */
    public function simulateWebhook(Request $request, string $transactionId)
    {
        if (!app()->environment('local')) {
            return response('Not available in production', 403);
        }

        try {
            $wompiService = new WompiService();
            $transaction = $wompiService->getTransaction($transactionId);

            // Simular payload de webhook
            $simulatedPayload = [
                'event' => 'transaction.updated',
                'data' => [
                    'transaction' => $transaction['data']
                ],
                'signature' => [
                    'checksum' => 'simulated_checksum_for_local_dev'
                ],
                'timestamp' => now()->timestamp,
                'sent_at' => now()->toISOString()
            ];

            Log::info('Simulating Wompi webhook for local development', $simulatedPayload);

            // Procesar como si fuera un webhook real (saltando verificación de firma)
            $this->processWebhookTransaction($simulatedPayload['data']['transaction']);

            return response()->json([
                'success' => true,
                'message' => 'Webhook simulated successfully',
                'transaction' => $transaction['data']
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Process webhook transaction (extracted for reuse)
     */
    private function processWebhookTransaction(array $transaction)
    {
        $reference = $transaction['reference'];
        $transactionId = $transaction['id'];
        $status = $transaction['status'];
        $amountInCents = $transaction['amount_in_cents'];

        // Find the order
        $order = Order::where('code', $reference)->with('payment')->first();

        if (!$order) {
            throw new Exception("Order with reference {$reference} not found");
        }

        // Check if already processed
        if ($order->payment && $order->payment->status == PaymentStatusEnum::COMPLETED) {
            Log::info("Order {$reference} already processed");
            return;
        }

        // Verify amount
        $receivedAmount = $amountInCents / 100;
        $expectedAmount = round($order->amount, 2);

        if (abs($receivedAmount - $expectedAmount) > 0.01) {
            throw new Exception("Amount mismatch for order {$reference}");
        }

        // Determine payment status
        $paymentStatus = match($status) {
            'APPROVED' => PaymentStatusEnum::COMPLETED,
            'DECLINED', 'ERROR' => PaymentStatusEnum::FAILED,
            default => PaymentStatusEnum::PENDING
        };

        // Store payment
        $chargeId = $this->storeLocalPayment([
            'amount' => $receivedAmount,
            'currency' => $transaction['currency'] ?? 'COP',
            'charge_id' => $transactionId,
            'payment_channel' => WompiServiceProvider::MODULE_NAME,
            'status' => $paymentStatus,
            'order_id' => $order->id,
        ]);

        // If payment completed, trigger post-payment actions
        if ($paymentStatus == PaymentStatusEnum::COMPLETED) {
            $this->afterPaymentCompleted($chargeId);
        }

        Log::info("Payment processed successfully for order {$reference}");
    }

}
