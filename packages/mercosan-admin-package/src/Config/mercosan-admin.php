<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Route Configuration
    |--------------------------------------------------------------------------
    |
    | Configure the route prefix and middleware for the admin panel
    |
    */
    'route_prefix' => env('MERCOSAN_ADMIN_PREFIX', 'admin'),

    'middleware' => ['web', 'auth'],

    'api_middleware' => ['api', 'auth:sanctum'],

    /*
    |--------------------------------------------------------------------------
    | Model Configuration
    |--------------------------------------------------------------------------
    |
    | Configure custom models if you want to extend the default ones
    |
    */
    'models' => [
        'user' => \FunctionBytes\MercosanAdmin\Models\User::class,
        'role' => \FunctionBytes\MercosanAdmin\Models\Role::class,
        'page' => \FunctionBytes\MercosanAdmin\Models\Page::class,
        'setting' => \FunctionBytes\MercosanAdmin\Models\Setting::class,
        'audit_history' => \FunctionBytes\MercosanAdmin\Models\AuditHistory::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    |
    | Configure default pagination settings
    |
    */
    'pagination' => [
        'per_page' => 20,
        'per_page_options' => [10, 20, 50, 100],
    ],

    /*
    |--------------------------------------------------------------------------
    | Audit Log Configuration
    |--------------------------------------------------------------------------
    |
    | Configure audit log settings
    |
    */
    'audit_log' => [
        'enabled' => true,
        'retention_days' => 30, // 0 = never delete
        'modules' => [
            'pages',
            'users',
            'roles',
            'settings',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Permissions Configuration
    |--------------------------------------------------------------------------
    |
    | Define all available permissions in the system
    |
    */
    'permissions' => [
        'pages' => [
            'pages.index' => 'View Pages',
            'pages.create' => 'Create Pages',
            'pages.edit' => 'Edit Pages',
            'pages.delete' => 'Delete Pages',
        ],
        'users' => [
            'users.index' => 'View Users',
            'users.create' => 'Create Users',
            'users.edit' => 'Edit Users',
            'users.delete' => 'Delete Users',
        ],
        'roles' => [
            'roles.index' => 'View Roles',
            'roles.create' => 'Create Roles',
            'roles.edit' => 'Edit Roles',
            'roles.delete' => 'Delete Roles',
        ],
        'settings' => [
            'settings.index' => 'View Settings',
            'settings.edit' => 'Edit Settings',
        ],
        'audit-log' => [
            'audit-log.index' => 'View Audit Logs',
            'audit-log.delete' => 'Delete Audit Logs',
        ],
        'system' => [
            'system.info' => 'View System Info',
            'system.cache' => 'Manage Cache',
            'system.cronjob' => 'Manage Cronjobs',
        ],
        'theme' => [
            'theme.index' => 'View Themes',
            'theme.customize' => 'Customize Theme',
        ],
        'core' => [
            'core.super' => 'Super User',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Theme Configuration
    |--------------------------------------------------------------------------
    |
    | Configure theme settings
    |
    */
    'theme' => [
        'default' => 'default',
        'mode' => 'light', // light, dark, auto
    ],

    /*
    |--------------------------------------------------------------------------
    | Cache Configuration
    |--------------------------------------------------------------------------
    |
    | Configure cache settings for the admin panel
    |
    */
    'cache' => [
        'enabled' => true,
        'ttl' => 3600, // 1 hour
    ],

    /*
    |--------------------------------------------------------------------------
    | Media Configuration
    |--------------------------------------------------------------------------
    |
    | Configure media upload settings
    |
    */
    'media' => [
        'driver' => 'public',
        'disk' => 'public',
        'max_upload_size' => 10240, // KB
        'allowed_image_extensions' => 'jpg,jpeg,png,gif,webp',
        'allowed_file_extensions' => 'pdf,doc,docx,xls,xlsx,zip',
        'image_quality' => 90,
        'thumbnail' => [
            'width' => 150,
            'height' => 150,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Email Configuration
    |--------------------------------------------------------------------------
    |
    | Configure email settings for the admin panel
    |
    */
    'email' => [
        'from' => [
            'address' => env('MAIL_FROM_ADDRESS', 'hello@example.com'),
            'name' => env('MAIL_FROM_NAME', 'Example'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Date & Time Configuration
    |--------------------------------------------------------------------------
    |
    | Configure date and time display formats
    |
    */
    'datetime' => [
        'date_format' => 'Y-m-d',
        'time_format' => 'H:i:s',
        'datetime_format' => 'Y-m-d H:i:s',
        'timezone' => 'UTC',
    ],

    /*
    |--------------------------------------------------------------------------
    | Security Configuration
    |--------------------------------------------------------------------------
    |
    | Configure security settings
    |
    */
    'security' => [
        'password_min_length' => 8,
        'session_timeout' => 120, // minutes
        'max_login_attempts' => 5,
    ],
];
