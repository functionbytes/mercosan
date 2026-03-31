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
| Mercosan Admin API Routes
|--------------------------------------------------------------------------
*/

Route::name('mercosan-admin.api.')->group(function () {

    // Pages API
    Route::apiResource('pages', PageController::class);
    Route::post('pages/bulk-delete', [PageController::class, 'bulkDelete'])->name('pages.bulk-delete');
    Route::post('pages/{page}/change-status', [PageController::class, 'changeStatus'])->name('pages.change-status');

    // Users API
    Route::apiResource('users', UserController::class);
    Route::post('users/{user}/make-super', [UserController::class, 'makeSuper'])->name('users.make-super');
    Route::post('users/{user}/remove-super', [UserController::class, 'removeSuper'])->name('users.remove-super');
    Route::get('profile', [UserController::class, 'profile'])->name('profile');
    Route::put('profile', [UserController::class, 'updateProfile'])->name('profile.update');
    Route::put('password', [UserController::class, 'updatePassword'])->name('password.update');

    // Roles API
    Route::apiResource('roles', RoleController::class);
    Route::post('roles/{role}/duplicate', [RoleController::class, 'duplicate'])->name('roles.duplicate');
    Route::post('roles/{role}/assign-users', [RoleController::class, 'assignUsers'])->name('roles.assign-users');
    Route::delete('roles/{role}/users/{user}', [RoleController::class, 'removeUser'])->name('roles.remove-user');

    // Settings API
    Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('settings', [SettingController::class, 'update'])->name('settings.update');
    Route::get('settings/{key}', [SettingController::class, 'get'])->name('settings.get');
    Route::post('settings/set', [SettingController::class, 'set'])->name('settings.set');

    // Audit Logs API
    Route::get('audit-logs', [AuditLogController::class, 'index'])->name('audit-logs.index');
    Route::get('audit-logs/{auditLog}', [AuditLogController::class, 'show'])->name('audit-logs.show');
    Route::delete('audit-logs/{auditLog}', [AuditLogController::class, 'destroy'])->name('audit-logs.destroy');
    Route::post('audit-logs/bulk-delete', [AuditLogController::class, 'bulkDelete'])->name('audit-logs.bulk-delete');
    Route::post('audit-logs/clean', [AuditLogController::class, 'clean'])->name('audit-logs.clean');
    Route::get('audit-logs/stats/overview', [AuditLogController::class, 'stats'])->name('audit-logs.stats');

    // Cache API
    Route::post('cache/clear', [CacheController::class, 'clear'])->name('cache.clear');
    Route::post('cache/optimize', [CacheController::class, 'optimize'])->name('cache.optimize');
    Route::post('cache/clear-optimize', [CacheController::class, 'clearOptimize'])->name('cache.clear-optimize');
    Route::get('cache/stats', [CacheController::class, 'stats'])->name('cache.stats');
    Route::post('cache/test', [CacheController::class, 'test'])->name('cache.test');

    // Cronjob API
    Route::get('cronjob', [CronjobController::class, 'index'])->name('cronjob.index');
    Route::post('cronjob/run', [CronjobController::class, 'run'])->name('cronjob.run');
    Route::post('cronjob/run-scheduler', [CronjobController::class, 'runScheduler'])->name('cronjob.run-scheduler');
    Route::get('cronjob/commands', [CronjobController::class, 'listCommands'])->name('cronjob.commands');
    Route::get('cronjob/test', [CronjobController::class, 'testScheduler'])->name('cronjob.test');

    // System Info API
    Route::get('system/info', [SystemInfoController::class, 'index'])->name('system.info');
    Route::get('system/requirements', [SystemInfoController::class, 'checkRequirements'])->name('system.requirements');

    // Theme API
    Route::get('theme', [ThemeController::class, 'index'])->name('theme.index');
    Route::post('theme/activate', [ThemeController::class, 'activate'])->name('theme.activate');
    Route::post('theme/toggle-mode', [ThemeController::class, 'toggleMode'])->name('theme.toggle-mode');
    Route::post('theme/customize', [ThemeController::class, 'updateCustomization'])->name('theme.customize');
    Route::post('theme/reset', [ThemeController::class, 'resetCustomization'])->name('theme.reset');
});
