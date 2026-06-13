<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('ec_discount_usages')) {
            return;
        }

        Schema::create('ec_discount_usages', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('discount_id')
                ->constrained('ec_discounts')
                ->cascadeOnDelete();
            $table->foreignId('customer_id')
                ->nullable()
                ->constrained('ec_customers')
                ->nullOnDelete();
            $table->foreignId('order_id')
                ->nullable()
                ->constrained('ec_orders')
                ->nullOnDelete();
            $table->string('coupon_code', 60)->nullable();
            $table->decimal('amount', 15, 2)->default(0);
            $table->timestamp('created_at')->useCurrent();

            $table->index(['discount_id', 'customer_id']);
            $table->index('order_id');
            $table->index('coupon_code');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ec_discount_usages');
    }
};
