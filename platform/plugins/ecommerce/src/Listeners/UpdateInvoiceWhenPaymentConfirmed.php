<?php

namespace Botble\Ecommerce\Listeners;

use Botble\Ecommerce\Enums\InvoiceStatusEnum;
use Botble\Ecommerce\Events\OrderPaymentConfirmedEvent;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateInvoiceWhenPaymentConfirmed implements ShouldQueue
{
    public function handle(OrderPaymentConfirmedEvent $event): void
    {
        $order = $event->order;
        
        if ($order->invoice) {
            // Update invoice status to completed
            $order->invoice->status = InvoiceStatusEnum::COMPLETED;
            $order->invoice->paid_at = Carbon::now();
            $order->invoice->save();
            
            // Send invoice payment created email
            do_action(INVOICE_PAYMENT_CREATED, $order->invoice);
        }
    }
}