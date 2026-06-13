<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('ec_discounts', 'first_order_only')) {
            return;
        }

        Schema::table('ec_discounts', function (Blueprint $table): void {
            $table->boolean('first_order_only')->default(false)->after('display_at_checkout');
        });
    }

    public function down(): void
    {
        if (! Schema::hasColumn('ec_discounts', 'first_order_only')) {
            return;
        }

        Schema::table('ec_discounts', function (Blueprint $table): void {
            $table->dropColumn('first_order_only');
        });
    }
};
