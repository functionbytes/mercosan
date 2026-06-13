<?php

namespace Mercosan\DiscountExtensions\Listeners;

use Botble\Ecommerce\Events\OrderPlacedEvent;
use Botble\Ecommerce\Models\Discount;
use Mercosan\DiscountExtensions\Models\DiscountUsage;

class RecordDiscountUsageOnOrderPlaced
{
    public function handle(OrderPlacedEvent $event): void
    {
        $order = $event->order;

        if (! $order->coupon_code) {
            return;
        }

        $discount = Discount::query()
            ->where('code', $order->coupon_code)
            ->first();

        if (! $discount) {
            return;
        }

        $alreadyTracked = DiscountUsage::query()
            ->where('order_id', $order->id)
            ->where('discount_id', $discount->id)
            ->exists();

        if ($alreadyTracked) {
            return;
        }

        DiscountUsage::query()->create([
            'discount_id' => $discount->id,
            'customer_id' => $order->user_id ?: null,
            'order_id' => $order->id,
            'coupon_code' => $order->coupon_code,
            'amount' => (float) $order->discount_amount,
        ]);
    }
}
