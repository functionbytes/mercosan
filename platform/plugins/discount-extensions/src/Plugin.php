<?php

namespace Mercosan\DiscountExtensions;

use Botble\PluginManagement\Abstracts\PluginOperationAbstract;
use Illuminate\Support\Facades\Schema;

class Plugin extends PluginOperationAbstract
{
    public static function remove(): void
    {
        Schema::dropIfExists('ec_discount_usages');

        if (Schema::hasColumn('ec_discounts', 'first_order_only')) {
            Schema::table('ec_discounts', function ($table): void {
                $table->dropColumn('first_order_only');
            });
        }

        if (Schema::hasColumn('ec_discounts', 'max_uses_per_customer')) {
            Schema::table('ec_discounts', function ($table): void {
                $table->dropColumn('max_uses_per_customer');
            });
        }
    }
}
