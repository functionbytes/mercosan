<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('ec_discounts', 'max_uses_per_customer')) {
            return;
        }

        Schema::table('ec_discounts', function (Blueprint $table): void {
            $table->unsignedInteger('max_uses_per_customer')->nullable()->after('first_order_only');
        });
    }

    public function down(): void
    {
        if (! Schema::hasColumn('ec_discounts', 'max_uses_per_customer')) {
            return;
        }

        Schema::table('ec_discounts', function (Blueprint $table): void {
            $table->dropColumn('max_uses_per_customer');
        });
    }
};
