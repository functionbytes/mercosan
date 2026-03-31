<?php

use FunctionBytes\MercosanAdmin\Models\Setting;
use Illuminate\Support\Facades\Cache;

if (!function_exists('setting')) {
    /**
     * Get or set a setting value
     *
     * @param string|null $key
     * @param mixed $default
     * @return mixed
     */
    function setting(?string $key = null, $default = null)
    {
        if ($key === null) {
            return Setting::all();
        }

        return Setting::get($key, $default);
    }
}

if (!function_exists('set_setting')) {
    /**
     * Set a setting value
     *
     * @param string $key
     * @param mixed $value
     * @return bool
     */
    function set_setting(string $key, $value): bool
    {
        return Setting::set($key, $value);
    }
}

if (!function_exists('has_permission')) {
    /**
     * Check if the current user has a permission
     *
     * @param string|array $permission
     * @return bool
     */
    function has_permission($permission): bool
    {
        $user = auth()->user();

        if (!$user) {
            return false;
        }

        if (method_exists($user, 'hasPermission')) {
            return $user->hasPermission($permission);
        }

        return false;
    }
}

if (!function_exists('has_any_permission')) {
    /**
     * Check if the current user has any of the given permissions
     *
     * @param array $permissions
     * @return bool
     */
    function has_any_permission(array $permissions): bool
    {
        $user = auth()->user();

        if (!$user) {
            return false;
        }

        if (method_exists($user, 'hasAnyPermission')) {
            return $user->hasAnyPermission($permissions);
        }

        return false;
    }
}

if (!function_exists('has_all_permissions')) {
    /**
     * Check if the current user has all of the given permissions
     *
     * @param array $permissions
     * @return bool
     */
    function has_all_permissions(array $permissions): bool
    {
        $user = auth()->user();

        if (!$user) {
            return false;
        }

        if (method_exists($user, 'hasAllPermissions')) {
            return $user->hasAllPermissions($permissions);
        }

        return false;
    }
}

if (!function_exists('is_super_user')) {
    /**
     * Check if the current user is a super user
     *
     * @return bool
     */
    function is_super_user(): bool
    {
        $user = auth()->user();

        if (!$user) {
            return false;
        }

        if (method_exists($user, 'isSuperUser')) {
            return $user->isSuperUser();
        }

        return false;
    }
}

if (!function_exists('audit_log')) {
    /**
     * Create an audit log entry
     *
     * @param string $module
     * @param string $action
     * @param array $data
     * @return void
     */
    function audit_log(string $module, string $action, array $data = []): void
    {
        if (!config('mercosan-admin.audit_log.enabled', true)) {
            return;
        }

        try {
            $user = auth()->user();

            \FunctionBytes\MercosanAdmin\Models\AuditHistory::create([
                'user_id' => $user?->id,
                'user_type' => $user ? get_class($user) : null,
                'actor_id' => $user?->id,
                'actor_type' => $user ? get_class($user) : null,
                'module' => $module,
                'action' => $action,
                'reference_id' => $data['reference_id'] ?? null,
                'reference_name' => $data['reference_name'] ?? null,
                'type' => $data['type'] ?? null,
                'request' => $data['request'] ?? request()->all(),
                'user_agent' => request()->userAgent(),
                'ip_address' => request()->ip(),
            ]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Failed to create audit log: ' . $e->getMessage());
        }
    }
}

if (!function_exists('mercosan_admin_url')) {
    /**
     * Generate a URL for the admin panel
     *
     * @param string $path
     * @return string
     */
    function mercosan_admin_url(string $path = ''): string
    {
        $prefix = config('mercosan-admin.route_prefix', 'admin');
        return url($prefix . ($path ? '/' . ltrim($path, '/') : ''));
    }
}

if (!function_exists('format_bytes')) {
    /**
     * Format bytes to human readable format
     *
     * @param int $bytes
     * @param int $precision
     * @return string
     */
    function format_bytes(int $bytes, int $precision = 2): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, $precision) . ' ' . $units[$i];
    }
}

if (!function_exists('cache_remember_forever')) {
    /**
     * Cache a value forever with a key
     *
     * @param string $key
     * @param callable $callback
     * @return mixed
     */
    function cache_remember_forever(string $key, callable $callback)
    {
        if (!config('mercosan-admin.cache.enabled', true)) {
            return $callback();
        }

        return Cache::rememberForever($key, $callback);
    }
}

if (!function_exists('mercosan_version')) {
    /**
     * Get the Mercosan Admin package version
     *
     * @return string
     */
    function mercosan_version(): string
    {
        return '1.0.0';
    }
}

if (!function_exists('is_active_route')) {
    /**
     * Check if the given route is active
     *
     * @param string|array $route
     * @param string $class
     * @return string
     */
    function is_active_route($route, string $class = 'active'): string
    {
        $routes = is_array($route) ? $route : [$route];

        foreach ($routes as $r) {
            if (request()->routeIs($r)) {
                return $class;
            }
        }

        return '';
    }
}

if (!function_exists('mercosan_config')) {
    /**
     * Get a configuration value from mercosan-admin config
     *
     * @param string $key
     * @param mixed $default
     * @return mixed
     */
    function mercosan_config(string $key, $default = null)
    {
        return config("mercosan-admin.{$key}", $default);
    }
}
