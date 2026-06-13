<?php

namespace Mercosan\DiscountExtensions\Providers;

use Botble\Base\Facades\Assets;
use Botble\Base\Supports\ServiceProvider;
use Botble\Base\Traits\LoadAndPublishDataTrait;
use Botble\Ecommerce\Events\OrderPlacedEvent;
use Botble\Ecommerce\Models\Discount;
use Botble\Ecommerce\Services\HandleApplyCouponService;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\View;
use Mercosan\DiscountExtensions\Listeners\RecordDiscountUsageOnOrderPlaced;
use Mercosan\DiscountExtensions\Models\DiscountUsage;
use Mercosan\DiscountExtensions\Services\ExtendedHandleApplyCouponService;

class DiscountExtensionsServiceProvider extends ServiceProvider
{
    use LoadAndPublishDataTrait;

    public function register(): void
    {
        $this->app->bind(
            HandleApplyCouponService::class,
            ExtendedHandleApplyCouponService::class,
        );
    }

    public function boot(): void
    {
        $this
            ->setNamespace('plugins/discount-extensions')
            ->loadMigrations();

        $this->publishes([
            __DIR__ . '/../../public' => public_path('vendor/discount-extensions'),
        ], ['public', 'discount-extensions-assets']);

        $this->registerDiscountExtensions();
        $this->registerAdminAssets();
        $this->registerEventListeners();
    }

    protected function registerDiscountExtensions(): void
    {
        Discount::resolveRelationUsing('usages', function ($discount) {
            return $discount->hasMany(DiscountUsage::class, 'discount_id');
        });

        Discount::saving(function (Discount $discount): void {
            $request = request();

            if (! $request) {
                return;
            }

            if (! in_array($request->method(), ['POST', 'PUT', 'PATCH'], true)) {
                return;
            }

            if ($request->has('first_order_only')) {
                $discount->first_order_only = $request->boolean('first_order_only');
            }

            if ($request->exists('max_uses_per_customer')) {
                $value = $request->input('max_uses_per_customer');
                $discount->max_uses_per_customer = ($value === null || $value === '' || (int) $value <= 0)
                    ? null
                    : (int) $value;
            }
        });
    }

    protected function registerAdminAssets(): void
    {
        View::composer(
            ['plugins/ecommerce::discounts.create', 'plugins/ecommerce::discounts.edit'],
            function (): void {
                Assets::addScriptsDirectly([
                    'vendor/discount-extensions/js/admin-discount-fields.js',
                ]);
            }
        );
    }

    protected function registerEventListeners(): void
    {
        Event::listen(OrderPlacedEvent::class, RecordDiscountUsageOnOrderPlaced::class);
    }
}
