<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('ec_discount_excluded_products', function (Blueprint $table): void {
            $table->foreignId('discount_id');
            $table->foreignId('product_id');
            $table->primary(['discount_id', 'product_id'], 'discount_excluded_products_primary');
        });

        Schema::create('ec_discount_excluded_product_categories', function (Blueprint $table): void {
            $table->foreignId('discount_id');
            $table->foreignId('product_category_id');
            $table->primary(['discount_id', 'product_category_id'], 'discount_excluded_product_categories_primary');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ec_discount_excluded_products');
        Schema::dropIfExists('ec_discount_excluded_product_categories');
    }
};
