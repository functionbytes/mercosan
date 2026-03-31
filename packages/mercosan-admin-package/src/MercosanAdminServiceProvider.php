<?php

namespace FunctionBytes\MercosanAdmin;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class MercosanAdminServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(
            __DIR__ . '/Config/mercosan-admin.php',
            'mercosan-admin'
        );
    }

    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/Database/Migrations');
        $this->loadViewsFrom(__DIR__ . '/Resources/views', 'mercosan-admin');
        $this->registerRoutes();
        $this->registerPublishing();
        $this->registerCommands();
    }

    protected function registerRoutes(): void
    {
        Route::group($this->routeConfiguration(), function () {
            $this->loadRoutesFrom(__DIR__ . '/Routes/web.php');
        });

        Route::group($this->apiRouteConfiguration(), function () {
            $this->loadRoutesFrom(__DIR__ . '/Routes/api.php');
        });
    }

    protected function routeConfiguration(): array
    {
        return [
            'prefix' => config('mercosan-admin.route_prefix', 'admin'),
            'middleware' => config('mercosan-admin.middleware', ['web', 'auth']),
        ];
    }

    protected function apiRouteConfiguration(): array
    {
        return [
            'prefix' => 'api/' . config('mercosan-admin.route_prefix', 'admin'),
            'middleware' => config('mercosan-admin.api_middleware', ['api', 'auth:sanctum']),
        ];
    }

    protected function registerPublishing(): void
    {
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/Config/mercosan-admin.php' => config_path('mercosan-admin.php'),
            ], 'mercosan-admin-config');

            $this->publishes([
                __DIR__ . '/Database/Migrations' => database_path('migrations'),
            ], 'mercosan-admin-migrations');

            $this->publishes([
                __DIR__ . '/Resources/views' => resource_path('views/vendor/mercosan-admin'),
            ], 'mercosan-admin-views');
        }
    }

    protected function registerCommands(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                // Add console commands here
            ]);
        }
    }
}
