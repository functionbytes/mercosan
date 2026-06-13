<?php

namespace Mercosan\DiscountExtensions\Services;

use Botble\Ecommerce\Models\Discount;
use Botble\Ecommerce\Models\Order;
use Botble\Ecommerce\Services\HandleApplyCouponService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Mercosan\DiscountExtensions\Models\DiscountUsage;

class ExtendedHandleApplyCouponService extends HandleApplyCouponService
{
    public function checkConditionDiscount(Discount|Model $discount, array $sessionData = [], ?int $customerId = 0): array
    {
        $baseResult = parent::checkConditionDiscount($discount, $sessionData, $customerId);

        if (Arr::get($baseResult, 'error')) {
            return $baseResult;
        }

        if ($this->isFirstOrderOnlyAndNotEligible($discount, $customerId)) {
            return [
                'error' => true,
                'message' => __('Este cupón solo aplica a tu primera compra.'),
            ];
        }

        if ($this->hasReachedCustomerLimit($discount, $customerId)) {
            return [
                'error' => true,
                'message' => __('Ya alcanzaste el límite de usos para este cupón.'),
            ];
        }

        return ['error' => false];
    }

    protected function isFirstOrderOnlyAndNotEligible(Discount $discount, ?int $customerId): bool
    {
        if (! (bool) ($discount->first_order_only ?? false)) {
            return false;
        }

        if (! $customerId) {
            return true;
        }

        return Order::query()
            ->where('user_id', $customerId)
            ->where('is_finished', true)
            ->exists();
    }

    protected function hasReachedCustomerLimit(Discount $discount, ?int $customerId): bool
    {
        $limit = (int) ($discount->max_uses_per_customer ?? 0);

        if ($limit <= 0 || ! $customerId) {
            return false;
        }

        return DiscountUsage::query()
            ->where('discount_id', $discount->id)
            ->where('customer_id', $customerId)
            ->count() >= $limit;
    }
}
