# Mercosan Admin Package

Paquete completo de administración para Laravel que incluye gestión de páginas, configuraciones, control de acceso (ACL), historial de auditoría y gestión de temas.

## Características

- **Gestión de Páginas**: CRUD completo para páginas del sitio
- **Sistema de Configuración**: Administración centralizada de settings
- **Control de Acceso (ACL)**: Gestión de usuarios, roles y permisos
- **Historial de Auditoría**: Registro completo de acciones del sistema
- **Gestión de Temas**: Soporte para temas personalizados
- **Cache Management**: Control de caché del sistema
- **Cronjobs**: Gestión de tareas programadas
- **Información del Sistema**: Dashboard con información del servidor

## Requisitos

- PHP 8.1 o superior
- Laravel 10.x o 11.x
- MySQL 5.7+ / PostgreSQL 10+

## Instalación

### 1. Instalar el paquete

```bash
composer require functionbytes/mercosan-admin-package
```

### 2. Publicar archivos de configuración

```bash
php artisan vendor:publish --tag=mercosan-admin-config
```

### 3. Publicar migraciones

```bash
php artisan vendor:publish --tag=mercosan-admin-migrations
```

### 4. Ejecutar migraciones

```bash
php artisan migrate
```

### 5. Publicar assets (vistas, traducciones)

```bash
php artisan vendor:publish --tag=mercosan-admin-views
php artisan vendor:publish --tag=mercosan-admin-lang
```

## Configuración

El archivo de configuración se publica en `config/mercosan-admin.php`. Aquí puedes personalizar:

```php
return [
    // Prefijo de rutas
    'route_prefix' => 'admin',

    // Middleware
    'middleware' => ['web', 'auth'],

    // Modelos personalizados
    'models' => [
        'user' => \FunctionBytes\MercosanAdmin\Models\User::class,
        'role' => \FunctionBytes\MercosanAdmin\Models\Role::class,
    ],

    // Configuración de auditoría
    'audit_log' => [
        'enabled' => true,
        'retention_days' => 30,
    ],

    // Paginación
    'pagination' => [
        'per_page' => 20,
    ],
];
```

## Uso

### Rutas

El paquete registra automáticamente las siguientes rutas bajo el prefijo `admin`:

- **Páginas**: `/admin/pages`
- **Usuarios**: `/admin/users`
- **Roles**: `/admin/roles`
- **Configuración**: `/admin/settings`
- **Auditoría**: `/admin/audit-logs`
- **Sistema**: `/admin/system`
- **Temas**: `/admin/themes`

### Gestión de Usuarios

```php
use FunctionBytes\MercosanAdmin\Models\User;

// Crear usuario
$user = User::create([
    'username' => 'admin',
    'email' => 'admin@example.com',
    'password' => bcrypt('password'),
    'first_name' => 'Admin',
    'last_name' => 'User',
]);

// Asignar rol
$user->roles()->attach($roleId);

// Verificar permisos
if ($user->hasPermission('users.edit')) {
    // Usuario tiene permiso
}
```

### Gestión de Roles

```php
use FunctionBytes\MercosanAdmin\Models\Role;

// Crear rol
$role = Role::create([
    'name' => 'Editor',
    'slug' => 'editor',
    'description' => 'Content editor role',
    'permissions' => [
        'pages.index' => true,
        'pages.create' => true,
        'pages.edit' => true,
    ],
]);
```

### Configuración del Sistema

```php
use FunctionBytes\MercosanAdmin\Models\Setting;

// Guardar configuración
Setting::updateOrCreate(
    ['key' => 'site_title'],
    ['value' => 'Mi Sitio Web']
);

// Obtener configuración
$siteTitle = Setting::where('key', 'site_title')->value('value');

// O usando helper
$siteTitle = setting('site_title', 'Default Title');
```

### Auditoría

```php
use FunctionBytes\MercosanAdmin\Models\AuditHistory;

// El paquete registra automáticamente las acciones
// Consultar historial
$logs = AuditHistory::where('module', 'pages')
    ->where('action', 'created')
    ->latest()
    ->get();
```

### Páginas

```php
use FunctionBytes\MercosanAdmin\Models\Page;

// Crear página
$page = Page::create([
    'name' => 'Acerca de',
    'content' => '<h1>Contenido de la página</h1>',
    'status' => 'published',
    'template' => 'default',
]);
```

## Middleware

El paquete incluye los siguientes middleware:

- `CheckPermission`: Verifica permisos de usuario
- `AuditLog`: Registra acciones en el historial

Para usar en tus rutas:

```php
Route::middleware(['mercosan.permission:users.edit'])->group(function () {
    // Rutas protegidas
});
```

## Personalización

### Extender Modelos

Puedes extender los modelos del paquete:

```php
namespace App\Models;

use FunctionBytes\MercosanAdmin\Models\User as BaseUser;

class User extends BaseUser
{
    // Tus personalizaciones
}
```

Luego actualiza la configuración en `config/mercosan-admin.php`:

```php
'models' => [
    'user' => \App\Models\User::class,
],
```

### Personalizar Vistas

Publica las vistas y personalízalas:

```bash
php artisan vendor:publish --tag=mercosan-admin-views
```

Las vistas se copiarán a `resources/views/vendor/mercosan-admin/`.

## Comandos Artisan

El paquete incluye los siguientes comandos:

```bash
# Crear super usuario
php artisan mercosan:create-super-admin

# Limpiar caché del sistema
php artisan mercosan:clear-cache

# Limpiar auditorías antiguas
php artisan mercosan:clean-audit-logs
```

## Testing

```bash
composer test
```

## Seguridad

Si descubres algún problema de seguridad, por favor envía un email a security@functionbytes.com en lugar de usar el sistema de issues.

## Licencia

Este paquete es open-source bajo la licencia MIT.

## Créditos

- [FunctionBytes](https://github.com/functionbytes)
- Basado en el sistema Botble CMS

## Soporte

Para obtener soporte:
- Issues: https://github.com/functionbytes/mercosan-admin-package/issues
- Email: support@functionbytes.com
