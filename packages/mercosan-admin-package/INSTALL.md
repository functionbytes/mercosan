# Guía de Instalación - Mercosan Admin Package

## Instalación Paso a Paso

### 1. Requisitos del Sistema

Antes de instalar, asegúrate de cumplir con los siguientes requisitos:

- PHP >= 8.1
- Laravel >= 10.0
- Extensiones PHP requeridas:
  - OpenSSL
  - PDO
  - Mbstring
  - Tokenizer
  - XML
  - Ctype
  - JSON
  - BCMath
  - Fileinfo

### 2. Instalación del Paquete

#### Opción A: Instalación desde Repositorio Local

Si estás desarrollando localmente, agrega el paquete al `composer.json` de tu proyecto principal:

```json
{
    "repositories": [
        {
            "type": "path",
            "url": "./packages/mercosan-admin-package"
        }
    ],
    "require": {
        "functionbytes/mercosan-admin-package": "@dev"
    }
}
```

Luego ejecuta:

```bash
composer update functionbytes/mercosan-admin-package
```

#### Opción B: Instalación desde Packagist (Cuando esté publicado)

```bash
composer require functionbytes/mercosan-admin-package
```

### 3. Configuración Inicial

#### 3.1 Publicar Configuración

```bash
php artisan vendor:publish --tag=mercosan-admin-config
```

Esto creará el archivo `config/mercosan-admin.php` donde puedes personalizar el paquete.

#### 3.2 Publicar Migraciones

```bash
php artisan vendor:publish --tag=mercosan-admin-migrations
```

#### 3.3 Ejecutar Migraciones

```bash
php artisan migrate
```

#### 3.4 Publicar Vistas (Opcional)

Si deseas personalizar las vistas:

```bash
php artisan vendor:publish --tag=mercosan-admin-views
```

### 4. Configurar el Modelo de Usuario

Si tu aplicación ya tiene un modelo de Usuario, necesitas extenderlo:

```php
<?php

namespace App\Models;

use FunctionBytes\MercosanAdmin\Models\User as MercosanUser;

class User extends MercosanUser
{
    // Tus personalizaciones
}
```

Luego actualiza `config/mercosan-admin.php`:

```php
'models' => [
    'user' => \App\Models\User::class,
    // ...
],
```

### 5. Configurar Rutas

Las rutas se registran automáticamente bajo el prefijo `/admin`. Puedes cambiar esto en `config/mercosan-admin.php`:

```php
'route_prefix' => env('MERCOSAN_ADMIN_PREFIX', 'admin'),
```

### 6. Configurar Middleware

El paquete usa middleware `web` y `auth` por defecto. Para personalizarlo:

```php
'middleware' => ['web', 'auth', 'tu-middleware'],
```

### 7. Crear Primer Usuario Super Admin

Ejecuta en tinker:

```bash
php artisan tinker
```

```php
$user = \FunctionBytes\MercosanAdmin\Models\User::create([
    'username' => 'admin',
    'email' => 'admin@example.com',
    'password' => bcrypt('password'),
    'first_name' => 'Super',
    'last_name' => 'Admin',
    'super_user' => true,
    'manage_supers' => true,
]);

// Activar el usuario
\FunctionBytes\MercosanAdmin\Models\Activation::create([
    'user_id' => $user->id,
    'code' => \Illuminate\Support\Str::random(40),
    'completed' => true,
    'completed_at' => now(),
]);
```

### 8. Acceder al Panel de Administración

Navega a: `http://tu-dominio.com/admin`

Credenciales por defecto:
- Usuario: admin
- Contraseña: password

**IMPORTANTE**: Cambia la contraseña inmediatamente después del primer inicio de sesión.

## Configuración Avanzada

### Permisos Personalizados

Edita `config/mercosan-admin.php` para agregar permisos personalizados:

```php
'permissions' => [
    'mi-modulo' => [
        'mi-modulo.index' => 'Ver Mi Módulo',
        'mi-modulo.create' => 'Crear en Mi Módulo',
        'mi-modulo.edit' => 'Editar Mi Módulo',
        'mi-modulo.delete' => 'Eliminar en Mi Módulo',
    ],
],
```

### Configuración de Auditoría

```php
'audit_log' => [
    'enabled' => true,
    'retention_days' => 30, // 0 = nunca eliminar
    'modules' => [
        'pages',
        'users',
        'roles',
        'settings',
        'mi-modulo', // Agregar tus módulos
    ],
],
```

### Configuración de Cache

```php
'cache' => [
    'enabled' => true,
    'ttl' => 3600, // segundos
],
```

## Actualización del Paquete

```bash
composer update functionbytes/mercosan-admin-package
php artisan migrate
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

## Desinstalación

1. Eliminar el paquete:
```bash
composer remove functionbytes/mercosan-admin-package
```

2. (Opcional) Eliminar las migraciones:
```bash
php artisan migrate:rollback
```

3. Eliminar archivos publicados:
```bash
rm -rf config/mercosan-admin.php
rm -rf resources/views/vendor/mercosan-admin
```

## Solución de Problemas

### Error: "Class not found"

Ejecuta:
```bash
composer dump-autoload
php artisan config:clear
```

### Error: "Route not found"

Verifica que el ServiceProvider esté registrado:
```bash
php artisan vendor:publish --tag=mercosan-admin-config
php artisan config:clear
```

### Error de Permisos

Asegúrate de que tu usuario tenga los permisos correctos asignados a través de roles.

### Base de Datos

Si tienes problemas con las migraciones, verifica que tu tabla `users` exista antes de ejecutar las migraciones del paquete.

## Soporte

Para obtener ayuda:
- Issues: https://github.com/functionbytes/mercosan-admin-package/issues
- Email: support@functionbytes.com
- Documentación: README.md
