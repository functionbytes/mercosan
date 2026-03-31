<?php

use Illuminate\Support\Facades\Route;
use FunctionBytes\MercosanAdmin\Http\Controllers\PageController;
use FunctionBytes\MercosanAdmin\Http\Controllers\ACL\UserController;
use FunctionBytes\MercosanAdmin\Http\Controllers\ACL\RoleController;
use FunctionBytes\MercosanAdmin\Http\Controllers\Settings\SettingController;
use FunctionBytes\MercosanAdmin\Http\Controllers\AuditLogController;
use FunctionBytes\MercosanAdmin\Http\Controllers\System\CacheController;
use FunctionBytes\MercosanAdmin\Http\Controllers\System\CronjobController;
use FunctionBytes\MercosanAdmin\Http\Controllers\System\SystemInfoController;
use FunctionBytes\MercosanAdmin\Http\Controllers\Theme\ThemeController;

/*
|--------------------------------------------------------------------------
| Mercosan Admin Web Routes
|--------------------------------------------------------------------------
*/

Route::name('mercosan-admin.')->group(function () {

    // Dashboard
    Route::get('/', function () {
        return view('mercosan-admin::dashboard');
    })->name('dashboard');

    // Pages Routes
    Route::prefix('pages')->name('pages.')->group(function () {
        Route::get('/', [PageController::class, 'index'])->name('index');
        Route::get('/create', [PageController::class, 'create'])->name('create');
        Route::post('/', [PageController::class, 'store'])->name('store');
        Route::get('/{page}', [PageController::class, 'show'])->name('show');
        Route::get('/{page}/edit', [PageController::class, 'edit'])->name('edit');
        Route::put('/{page}', [PageController::class, 'update'])->name('update');
        Route::delete('/{page}', [PageController::class, 'destroy'])->name('destroy');
        Route::post('/bulk-delete', [PageController::class, 'bulkDelete'])->name('bulk-delete');
        Route::post('/{page}/change-status', [PageController::class, 'changeStatus'])->name('change-status');
    });

    // Users Routes
    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/create', [UserController::class, 'create'])->name('create');
        Route::post('/', [UserController::class, 'store'])->name('store');
        Route::get('/{user}', [UserController::class, 'show'])->name('show');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->name('edit');
        Route::put('/{user}', [UserController::class, 'update'])->name('update');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('destroy');
        Route::get('/profile/view', [UserController::class, 'profile'])->name('profile');
        Route::post('/profile/update', [UserController::class, 'updateProfile'])->name('profile.update');
        Route::post('/password/update', [UserController::class, 'updatePassword'])->name('password.update');
        Route::post('/{user}/make-super', [UserController::class, 'makeSuper'])->name('make-super');
        Route::post('/{user}/remove-super', [UserController::class, 'removeSuper'])->name('remove-super');
    });

    // Roles Routes
    Route::prefix('roles')->name('roles.')->group(function () {
        Route::get('/', [RoleController::class, 'index'])->name('index');
        Route::get('/create', [RoleController::class, 'create'])->name('create');
        Route::post('/', [RoleController::class, 'store'])->name('store');
        Route::get('/{role}', [RoleController::class, 'show'])->name('show');
        Route::get('/{role}/edit', [RoleController::class, 'edit'])->name('edit');
        Route::put('/{role}', [RoleController::class, 'update'])->name('update');
        Route::delete('/{role}', [RoleController::class, 'destroy'])->name('destroy');
        Route::post('/{role}/duplicate', [RoleController::class, 'duplicate'])->name('duplicate');
        Route::post('/{role}/assign-users', [RoleController::class, 'assignUsers'])->name('assign-users');
        Route::delete('/{role}/users/{user}', [RoleController::class, 'removeUser'])->name('remove-user');
    });

    // Settings Routes
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('/', [SettingController::class, 'index'])->name('index');
        Route::post('/', [SettingController::class, 'update'])->name('update');

        // General Settings
        Route::get('/general', [SettingController::class, 'general'])->name('general');
        Route::post('/general', [SettingController::class, 'updateGeneral'])->name('general.update');

        // Email Settings
        Route::get('/email', [SettingController::class, 'email'])->name('email');
        Route::post('/email', [SettingController::class, 'updateEmail'])->name('email.update');

        // Media Settings
        Route::get('/media', [SettingController::class, 'media'])->name('media');
        Route::post('/media', [SettingController::class, 'updateMedia'])->name('media.update');
    });

    // Audit Log Routes
    Route::prefix('audit-logs')->name('audit-logs.')->group(function () {
        Route::get('/', [AuditLogController::class, 'index'])->name('index');
        Route::get('/{auditLog}', [AuditLogController::class, 'show'])->name('show');
        Route::delete('/{auditLog}', [AuditLogController::class, 'destroy'])->name('destroy');
        Route::post('/bulk-delete', [AuditLogController::class, 'bulkDelete'])->name('bulk-delete');
        Route::post('/clean', [AuditLogController::class, 'clean'])->name('clean');
        Route::get('/export/csv', [AuditLogController::class, 'export'])->name('export');
        Route::get('/stats/overview', [AuditLogController::class, 'stats'])->name('stats');
    });

    // System Routes
    Route::prefix('system')->name('system.')->group(function () {
        // Cache Management
        Route::prefix('cache')->name('cache.')->group(function () {
            Route::get('/', [CacheController::class, 'index'])->name('index');
            Route::post('/clear', [CacheController::class, 'clear'])->name('clear');
            Route::post('/optimize', [CacheController::class, 'optimize'])->name('optimize');
            Route::post('/clear-optimize', [CacheController::class, 'clearOptimize'])->name('clear-optimize');
            Route::get('/stats', [CacheController::class, 'stats'])->name('stats');
            Route::post('/test', [CacheController::class, 'test'])->name('test');
        });

        // Cronjob Management
        Route::prefix('cronjob')->name('cronjob.')->group(function () {
            Route::get('/', [CronjobController::class, 'index'])->name('index');
            Route::post('/run', [CronjobController::class, 'run'])->name('run');
            Route::post('/run-scheduler', [CronjobController::class, 'runScheduler'])->name('run-scheduler');
            Route::get('/commands', [CronjobController::class, 'listCommands'])->name('commands');
            Route::get('/test', [CronjobController::class, 'testScheduler'])->name('test');
        });

        // System Info
        Route::prefix('info')->name('info.')->group(function () {
            Route::get('/', [SystemInfoController::class, 'index'])->name('index');
            Route::get('/phpinfo', [SystemInfoController::class, 'phpinfo'])->name('phpinfo');
            Route::get('/requirements', [SystemInfoController::class, 'checkRequirements'])->name('requirements');
        });
    });

    // Theme Routes
    Route::prefix('theme')->name('theme.')->group(function () {
        Route::get('/', [ThemeController::class, 'index'])->name('index');
        Route::post('/activate', [ThemeController::class, 'activate'])->name('activate');
        Route::post('/toggle-mode', [ThemeController::class, 'toggleMode'])->name('toggle-mode');
        Route::get('/customize', [ThemeController::class, 'customize'])->name('customize');
        Route::post('/customize', [ThemeController::class, 'updateCustomization'])->name('customize.update');
        Route::post('/reset', [ThemeController::class, 'resetCustomization'])->name('reset');
        Route::get('/export', [ThemeController::class, 'export'])->name('export');
        Route::post('/import', [ThemeController::class, 'import'])->name('import');
    });
});
