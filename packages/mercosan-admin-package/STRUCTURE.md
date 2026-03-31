# Estructura del Paquete Mercosan Admin

Este documento describe la estructura completa del paquete.

## Árbol de Archivos

```
mercosan-admin-package/
├── composer.json                              # Configuración de Composer
├── README.md                                   # Documentación principal
├── INSTALL.md                                  # Guía de instalación
├── CHANGELOG.md                                # Historial de cambios
├── LICENSE                                     # Licencia MIT
├── STRUCTURE.md                                # Este archivo
│
└── src/
    ├── MercosanAdminServiceProvider.php       # Service Provider principal
    │
    ├── Config/
    │   └── mercosan-admin.php                 # Archivo de configuración
    │
    ├── Database/
    │   ├── Migrations/
    │   │   ├── 2024_01_01_000001_create_pages_table.php
    │   │   ├── 2024_01_01_000002_create_settings_table.php
    │   │   ├── 2024_01_01_000003_create_acl_tables.php
    │   │   └── 2024_01_01_000004_create_audit_histories_table.php
    │   └── Seeders/
    │
    ├── Models/
    │   ├── Page.php                           # Modelo de páginas
    │   ├── Setting.php                        # Modelo de configuración
    │   ├── User.php                           # Modelo de usuario extendido
    │   ├── Role.php                           # Modelo de roles
    │   ├── AuditHistory.php                   # Modelo de auditoría
    │   ├── UserMeta.php                       # Modelo de metadata de usuario
    │   └── Activation.php                     # Modelo de activaciones
    │
    ├── Http/
    │   ├── Controllers/
    │   │   ├── BaseController.php             # Controlador base
    │   │   ├── PageController.php             # Controlador de páginas
    │   │   ├── AuditLogController.php         # Controlador de auditoría
    │   │   │
    │   │   ├── ACL/
    │   │   │   ├── UserController.php         # Controlador de usuarios
    │   │   │   └── RoleController.php         # Controlador de roles
    │   │   │
    │   │   ├── Settings/
    │   │   │   └── SettingController.php      # Controlador de configuración
    │   │   │
    │   │   ├── System/
    │   │   │   ├── CacheController.php        # Gestión de caché
    │   │   │   ├── CronjobController.php      # Gestión de cronjobs
    │   │   │   └── SystemInfoController.php   # Información del sistema
    │   │   │
    │   │   └── Theme/
    │   │       └── ThemeController.php        # Gestión de temas
    │   │
    │   ├── Requests/
    │   │   ├── PageRequest.php                # Validación de páginas
    │   │   ├── UserRequest.php                # Validación de usuarios
    │   │   ├── RoleRequest.php                # Validación de roles
    │   │   ├── UpdatePasswordRequest.php      # Validación de contraseña
    │   │   └── UpdateProfileRequest.php       # Validación de perfil
    │   │
    │   └── Middleware/
    │
    ├── Traits/
    │   ├── HasPermissions.php                 # Trait de permisos
    │   └── HasPreferences.php                 # Trait de preferencias
    │
    ├── Helpers/
    │   └── helpers.php                        # Funciones helper globales
    │
    ├── Routes/
    │   ├── web.php                            # Rutas web
    │   └── api.php                            # Rutas API
    │
    └── Resources/
        └── views/
            ├── layouts/
            │   └── master.blade.php           # Layout principal
            │
            ├── dashboard.blade.php            # Dashboard principal
            │
            ├── pages/
            │   ├── index.blade.php            # Listado de páginas
            │   ├── create.blade.php           # Crear página
            │   └── edit.blade.php             # Editar página
            │
            ├── users/
            │   └── index.blade.php            # Listado de usuarios
            │
            ├── roles/
            │   └── index.blade.php            # Listado de roles
            │
            ├── settings/
            │   ├── index.blade.php            # Configuración principal
            │   └── general.blade.php          # Configuración general
            │
            ├── system/
            │   └── info.blade.php             # Información del sistema
            │
            ├── audit-log/
            └── theme/
```

## Descripción de Componentes

### Archivos Raíz

- **composer.json**: Define dependencias, autoloading y configuración del paquete
- **README.md**: Documentación principal con características y uso básico
- **INSTALL.md**: Guía detallada de instalación paso a paso
- **CHANGELOG.md**: Registro de versiones y cambios
- **LICENSE**: Licencia MIT del proyecto

### Service Provider

**MercosanAdminServiceProvider.php**
- Registra rutas web y API
- Publica configuración, migraciones y vistas
- Carga vistas del paquete
- Registra comandos Artisan

### Configuración

**Config/mercosan-admin.php**
- Prefijo de rutas
- Middleware
- Modelos personalizables
- Configuración de paginación
- Configuración de auditoría
- Definición de permisos
- Configuración de temas
- Configuración de cache
- Configuración de media
- Configuración de seguridad

### Migraciones

1. **create_pages_table**: Tabla de páginas del sitio
2. **create_settings_table**: Tabla de configuración key-value
3. **create_acl_tables**: Tablas de ACL (users, roles, role_users, user_meta, activations)
4. **create_audit_histories_table**: Tabla de auditoría

### Modelos

- **Page**: Gestión de páginas con relaciones y scopes
- **Setting**: Sistema de configuración con caché automático
- **User**: Usuario extendido con permisos, roles y preferencias
- **Role**: Roles con permisos y relaciones
- **AuditHistory**: Historial de auditoría con pruning automático
- **UserMeta**: Metadata de usuarios
- **Activation**: Sistema de activación de usuarios

### Controladores

#### Base
- **BaseController**: Métodos comunes para respuestas JSON

#### Recursos Principales
- **PageController**: CRUD completo de páginas + bulk operations
- **UserController**: CRUD de usuarios + profile + super user
- **RoleController**: CRUD de roles + duplication + assignment

#### Configuración
- **SettingController**: Gestión de configuración general, email, media

#### Sistema
- **AuditLogController**: Visualización, exportación y estadísticas
- **CacheController**: Limpieza y optimización de caché
- **CronjobController**: Ejecución y gestión de cronjobs
- **SystemInfoController**: Información del servidor, PHP, Laravel, DB

#### Temas
- **ThemeController**: Activación, personalización e import/export

### Form Requests

Validación centralizada para:
- Páginas (creación/edición)
- Usuarios (creación/edición)
- Roles (creación/edición)
- Actualización de contraseña
- Actualización de perfil

### Traits

- **HasPermissions**: Métodos para verificar permisos
- **HasPreferences**: Métodos para gestionar preferencias de usuario

### Helpers

15+ funciones globales para:
- Gestión de settings
- Verificación de permisos
- Auditoría
- URLs del admin
- Formateo de datos
- Cache
- Utilidades de UI

### Rutas

**web.php**
- Rutas para interfaz web del admin
- Agrupadas por recurso
- Middleware configurable

**api.php**
- API RESTful completa
- Endpoints para todos los recursos
- Autenticación con Sanctum

### Vistas

**Layout**
- Master layout con Bootstrap 5
- Sidebar navigation
- Header con usuario
- Sistema de alertas

**Páginas**
- Dashboard con estadísticas
- CRUD de páginas
- CRUD de usuarios (parcial)
- CRUD de roles (parcial)
- Configuración
- Sistema de información

## Características Técnicas

### Tecnologías
- PHP 8.1+
- Laravel 10.x / 11.x
- Bootstrap 5.3
- Bootstrap Icons
- Eloquent ORM

### Patrones de Diseño
- Repository Pattern (implícito en Eloquent)
- Service Provider Pattern
- Request Validation Pattern
- Trait Pattern para funcionalidades compartidas
- Helper Functions Pattern

### Seguridad
- CSRF Protection
- Form Request Validation
- Permission-based Access Control
- Password Hashing
- SQL Injection Protection (Eloquent)
- XSS Protection (Blade escaping)

### Performance
- Query Optimization con Eager Loading
- Settings Caching
- Config Caching
- Route Caching
- View Caching
- Database Indexing

### Extensibilidad
- Modelos extendibles
- Vistas publicables
- Configuración personalizable
- Middleware personalizable
- Permisos configurables

## Tamaño del Paquete

- **Total de archivos**: 47+
- **Archivos PHP**: 39
- **Archivos Blade**: 8+
- **Tamaño en disco**: ~284KB

## Cobertura de Funcionalidades

### ✅ Completo
- Sistema de páginas
- Sistema ACL (usuarios, roles, permisos)
- Sistema de configuración
- Sistema de auditoría
- Gestión de caché
- Gestión de cronjobs
- Información del sistema
- Gestión de temas
- API RESTful
- Helpers globales

### 📝 Incluido en Vistas
- Dashboard
- Páginas (CRUD completo)
- Usuarios (listado)
- Roles (listado)
- Configuración (general)
- Sistema (info)

### 🎯 Para Extensión Futura
- Vistas completas de usuarios (create/edit)
- Vistas completas de roles (create/edit)
- Vistas de auditoría
- Vistas de temas
- Vistas de cache/cronjob
- Tests unitarios
- Tests de integración
- Comandos Artisan adicionales

## Uso del Paquete

```php
// En tu aplicación Laravel

// Verificar permisos
if (has_permission('pages.edit')) {
    // Lógica protegida
}

// Usar settings
$siteTitle = setting('site_title', 'Default');
set_setting('site_title', 'Mi Sitio');

// Crear audit log
audit_log('pages', 'created', [
    'reference_id' => $page->id,
    'reference_name' => $page->name,
]);

// Generar URL del admin
$url = mercosan_admin_url('pages');
```

## Instalación Rápida

```bash
# Instalar paquete
composer require functionbytes/mercosan-admin-package

# Publicar archivos
php artisan vendor:publish --tag=mercosan-admin-config
php artisan vendor:publish --tag=mercosan-admin-migrations

# Migrar
php artisan migrate

# Acceder
http://tu-sitio.com/admin
```

---

**Versión**: 1.0.0
**Fecha**: 2024-10-07
**Autor**: FunctionBytes
**Licencia**: MIT
