<?php
// FILE: platform/packages/payment/src/Services/Traits/PaymentTrait.php
// This is a core Botble file provided for reference.
// DO NOT add or modify this file inside your PayU plugin folder.

namespace Botble\Payu\Traits;

use Botble\Payment\Models\Payment;
use Botble\Payment\Repositories\Interfaces\PaymentInterface;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Enum;
use Throwable;

trait PaymentsTrait
{
    public function storeLocalPayment(array $data = []): string
    {
        $data = apply_filters(PAYMENT_FILTER_PAYMENT_DATA, $data, request());

        $orderIds = (array) Arr::get($data, 'order_id', []);

        $payment = app(PaymentInterface::class)->create([
            'amount' => $data['amount'],
            'currency' => $data['currency'],
            'payment_channel' => $data['payment_channel'],
            'charge_id' => $data['charge_id'],
            'order_id' => Arr::first($orderIds),
            'customer_id' => Arr::get($data, 'customer_id'),
            'customer_type' => Arr::get($data, 'customer_type'),
            'status' => $data['status'],
            'payment_type' => Arr::get($data, 'payment_type', 'direct'),
        ]);

        if (count($orderIds) > 1) {
            $payment->orders()->sync($orderIds);
        }

        return $payment->charge_id;
    }

    public function afterPaymentCompleted(string|null $chargeId): bool
    {
        do_action(PAYMENT_ACTION_PAYMENT_PROCESSED, [
            'charge_id' => $chargeId,
        ]);

        $payment = app(PaymentInterface::class)->getFirstBy(compact('charge_id'));

        if (! $payment) {
            return false;
        }

        return $this->processPayment($payment);
    }

    protected function processPayment(Model|Payment $payment): bool
    {
        try {
            DB::beginTransaction();

            $this->beforeProcessPayment($payment);

            $payment->status = $payment->status->getValue();

            do_action(ACTION_AFTER_PAYMENT_STATUS_COMPLETED, $payment, request());

            DB::commit();

            return true;
        } catch (Throwable $exception) {
            DB::rollBack();
            report($exception);
        }

        return false;
    }

    protected function beforeProcessPayment(Model|Payment $payment): void
    {
        // to be implemented
    }

    /**
     * @deprecated
     */
    public function getPaymentDetails(string $chargeId): Model|Payment|null
    {
        return app(PaymentInterface::class)->getFirstBy(compact('chargeId'));
    }

    /**
     * @deprecated since v5.15
     */
    public function success(Request $request, string $message = null): void
    {
        $this->afterPaymentCompleted($request->input('charge_id'));
    }

    /**
     * @deprecated since v5.15
     */
    public function error(Request $request, string $message = null): void
    {
        $this->afterPaymentCompleted($request->input('charge_id'));
    }

    public function getPaymentStatus(Request $request): Enum|string|null
    {
        $chargeId = $request->input('charge_id');

        if (! $chargeId) {
            return null;
        }

        $payment = $this->getPaymentDetails($chargeId);

        if (! $payment) {
            return null;
        }

        return $payment->status;
    }
}
