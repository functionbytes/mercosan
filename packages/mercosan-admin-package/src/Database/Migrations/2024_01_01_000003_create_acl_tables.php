<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Extend users table if it exists
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                if (!Schema::hasColumn('users', 'first_name')) {
                    $table->string('first_name', 120)->nullable();
                }
                if (!Schema::hasColumn('users', 'last_name')) {
                    $table->string('last_name', 120)->nullable();
                }
                if (!Schema::hasColumn('users', 'username')) {
                    $table->string('username', 60)->unique()->nullable();
                }
                if (!Schema::hasColumn('users', 'avatar_id')) {
                    $table->foreignId('avatar_id')->nullable();
                }
                if (!Schema::hasColumn('users', 'super_user')) {
                    $table->boolean('super_user')->default(0);
                }
                if (!Schema::hasColumn('users', 'manage_supers')) {
                    $table->boolean('manage_supers')->default(0);
                }
                if (!Schema::hasColumn('users', 'permissions')) {
                    $table->text('permissions')->nullable();
                }
                if (!Schema::hasColumn('users', 'last_login')) {
                    $table->timestamp('last_login')->nullable();
                }
            });
        }

        // Create activations table
        if (!Schema::hasTable('activations')) {
            Schema::create('activations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->index();
                $table->string('code', 120);
                $table->boolean('completed')->default(0);
                $table->timestamp('completed_at')->nullable();
                $table->timestamps();
            });
        }

        // Create roles table
        if (!Schema::hasTable('roles')) {
            Schema::create('roles', function (Blueprint $table) {
                $table->id();
                $table->string('slug', 120)->unique();
                $table->string('name', 120);
                $table->text('permissions')->nullable();
                $table->string('description', 400)->nullable();
                $table->tinyInteger('is_default')->unsigned()->default(0);
                $table->foreignId('created_by')->index();
                $table->foreignId('updated_by')->index();
                $table->timestamps();
            });
        }

        // Create role_users table
        if (!Schema::hasTable('role_users')) {
            Schema::create('role_users', function (Blueprint $table) {
                $table->foreignId('user_id')->index();
                $table->foreignId('role_id')->index();
                $table->timestamps();

                $table->primary(['user_id', 'role_id']);
            });
        }

        // Create user_meta table
        if (!Schema::hasTable('user_meta')) {
            Schema::create('user_meta', function (Blueprint $table) {
                $table->id();
                $table->string('key', 120)->nullable();
                $table->text('value')->nullable();
                $table->foreignId('user_id')->index();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('user_meta');
        Schema::dropIfExists('role_users');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('activations');

        // Note: We don't drop columns from users table to avoid data loss
    }
};
