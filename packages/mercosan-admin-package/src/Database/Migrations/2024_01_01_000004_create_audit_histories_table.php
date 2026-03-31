<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('audit_histories')) {
            Schema::create('audit_histories', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->nullable()->index();
                $table->string('user_type')->nullable();
                $table->foreignId('actor_id')->nullable();
                $table->string('actor_type')->nullable();
                $table->string('module', 60)->index();
                $table->text('request')->nullable();
                $table->string('action', 120);
                $table->text('user_agent')->nullable();
                $table->ipAddress('ip_address')->nullable();
                $table->foreignId('reference_id')->nullable();
                $table->string('reference_name')->nullable();
                $table->string('type', 20)->nullable();
                $table->timestamps();

                $table->index(['user_id', 'module']);
                $table->index(['actor_id', 'actor_type']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_histories');
    }
};
