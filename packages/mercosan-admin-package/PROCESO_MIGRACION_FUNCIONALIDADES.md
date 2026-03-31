# 📋 PROCESO DE MIGRACIÓN DE FUNCIONALIDADES

**Guía completa para migrar funcionalidades desde Mercosan hacia otros proyectos**

Fecha de creación: 2025-01-XX
Autor: FunctionBytes Development Team

---

## 🎯 OBJETIVO

Este documento describe el proceso paso a paso para analizar, extraer y empaquetar funcionalidades del sistema Mercosan para su reutilización en otros proyectos Laravel.

---

## 📊 PROCESO GENERAL (5 FASES)

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌────────────┐    ┌─────────────┐
│  FASE 1     │───▶│   FASE 2     │───▶│   FASE 3    │───▶│  FASE 4    │───▶│   FASE 5    │
│  Análisis   │    │   Backend    │    │  Frontend   │    │  Database  │    │  Empaqueta  │
│   de URLs   │    │              │    │             │    │            │    │             │
└─────────────┘    └──────────────┘    └─────────────┘    └────────────┘    └─────────────┘
```

---

## FASE 1️⃣: ANÁLISIS DE URLs Y RUTAS

### 1.1. Identificar las URLs a migrar

**Ejemplo realizado:**
```
/admin/pages
/admin/ecommerce/settings/general
/admin/ecommerce/settings/invoices
/admin/system/users
/admin/theme/options
... (20+ URLs analizadas)
```

### 1.2. Encontrar archivos de rutas

**Comando:**
```bash
find . -name "web.php" -o -name "admin.php" | grep -E "(routes|Routes)" | head -20
```

**O usar Glob:**
```bash
**/routes/*.php
```

### 1.3. Leer y documentar cada archivo de rutas

**Para cada archivo de ruta, documentar:**

```php
// Ejemplo: platform/packages/page/routes/web.php
Route::group(['prefix' => 'pages', 'as' => 'pages.'], function () {
    Route::resource('', 'PageController')->parameters(['' => 'page']);
});
```

**Información a extraer:**
- ✅ Prefijo de la ruta
- ✅ Nombre de la ruta (as)
- ✅ Controlador utilizado
- ✅ Middleware aplicado
- ✅ Permisos requeridos

### 1.4. Crear mapa de rutas

**Template para documentar:**

| URL | Ruta Named | Controlador | Método | Permiso |
|-----|------------|-------------|--------|---------|
| /admin/pages | pages.index | PageController | index | pages.index |
| /admin/pages/create | pages.create | PageController | create | pages.create |

---

## FASE 2️⃣: ANÁLISIS DE BACKEND

### 2.1. Ubicar los controladores

**Patrón de búsqueda:**
```bash
find platform -name "*Controller.php" -path "*/Http/Controllers/*"
```

### 2.2. Analizar cada controlador

**Para cada controlador, documentar:**

#### A) Métodos disponibles
```php
public function index()      // Lista recursos
public function create()     // Formulario de creación
public function store()      // Guardar nuevo recurso
public function edit($id)    // Formulario de edición
public function update($id)  // Actualizar recurso
public function destroy($id) // Eliminar recurso
```

#### B) Validaciones (FormRequest)
```bash
# Buscar FormRequest asociado
grep -r "PageRequest" platform/packages/page/src/Http/Requests/
```

**Documentar reglas de validación:**
```php
'name' => ['required', 'string', 'max:120'],
'content' => ['nullable', 'string'],
'status' => [Rule::in(BaseStatusEnum::values())],
```

#### C) Modelos utilizados
```php
use Botble\Page\Models\Page;

// Documentar:
- Campos (fillable, casts)
- Relaciones (hasMany, belongsTo)
- Scopes
- Traits utilizados
```

#### D) Settings keys
```php
// Buscar en el controlador:
setting('key_name')
setting()->get('key_name')
setting()->set('key_name', $value)

// Documentar TODAS las keys encontradas
```

#### E) Permisos
```php
// Buscar en rutas y controladores:
'permission' => 'pages.index'
hasPermission('pages.create')

// Documentar estructura jerárquica:
core.cms
  └─ pages.index
     ├─ pages.create
     ├─ pages.edit
     └─ pages.destroy
```

#### F) Lógica de negocio importante
```php
// Documentar:
- Eventos disparados
- Observers
- Jobs en cola
- Notificaciones
- Transacciones
- Cálculos especiales
```

### 2.3. Crear informe de backend

**Template:**

```markdown
## NombreDelControlador

**Ubicación:** `/ruta/al/Controller.php`

**Métodos disponibles:**
- index() - Descripción
- store() - Descripción

**Validaciones (NombreRequest):**
- campo1: reglas
- campo2: reglas

**Modelos utilizados:**
- Modelo1 (campos, relaciones)

**Settings keys:**
- prefix_setting_key_1
- prefix_setting_key_2

**Permisos:**
- permiso.padre
  - permiso.hijo

**Lógica especial:**
- Descripción de procesos complejos
```

---

## FASE 3️⃣: ANÁLISIS DE FRONTEND

### 3.1. Ubicar las vistas

**Patrón de búsqueda:**
```bash
find platform -name "*.blade.php" -path "*/resources/views/*"
```

**Para el módulo específico:**
```bash
find platform/packages/page/resources/views -name "*.blade.php"
```

### 3.2. Analizar cada vista

**Para cada vista Blade, documentar:**

#### A) Layout utilizado
```blade
@extends(BaseHelper::getAdminMasterLayoutTemplate())
@extends('layouts.master')
```

#### B) Componentes utilizados
```blade
<x-core::card>
<x-core::form>
<x-core::button>
<x-core-setting::section>
```

#### C) Campos del formulario

**Template de documentación:**

| Campo | Tipo | Atributos | Validación | Valor default |
|-------|------|-----------|------------|---------------|
| name | text | required, max:120 | required | null |
| content | textarea | nullable | nullable | null |

#### D) JavaScript/Assets
```blade
@push('footer')
<script src="{{ asset('vendor/core/plugins/page/js/page.js') }}"></script>
@endpush

// Documentar:
- Archivos JS incluidos
- Librerías externas
- Eventos JavaScript
- AJAX calls
```

#### E) Traducciones
```blade
{{ trans('plugins/page::pages.name') }}
{{ __('Save Changes') }}

// Documentar todas las keys de traducción utilizadas
```

#### F) Estructura HTML importante
```blade
// Documentar:
- Tabs/pestañas
- Modales
- Accordions/collapse
- Tablas dinámicas
- Formularios complejos
```

### 3.3. Crear informe de frontend

**Template:**

```markdown
## Vista: nombre.blade.php

**Ubicación:** `/ruta/a/vista.blade.php`

**Layout:** `layouts.master`

**Componentes:**
- x-core::card
- x-core::form

**Campos del formulario:**
[Tabla con campos]

**JavaScript:**
- archivo1.js - Descripción
- Eventos: click, submit, etc.

**Traducciones:**
- plugins/page::pages.name
- core/base::forms.save

**Estructura especial:**
- 3 tabs: Info, SEO, Advanced
- Modal de confirmación
```

---

## FASE 4️⃣: ANÁLISIS DE BASE DE DATOS

### 4.1. Encontrar migraciones

**Comando:**
```bash
find platform -name "*.php" -path "*/database/migrations/*" | grep -i "page\|setting\|user\|role"
```

### 4.2. Leer y documentar migraciones

**Para cada migración:**

```php
// Ejemplo
Schema::create('pages', function (Blueprint $table) {
    $table->id();
    $table->string('name', 120);
    $table->longText('content')->nullable();
    $table->foreignId('user_id')->index()->nullable();
    $table->timestamps();
});
```

**Documentar:**
- ✅ Nombre de tabla
- ✅ Columnas (nombre, tipo, atributos)
- ✅ Índices
- ✅ Foreign keys
- ✅ Unique constraints
- ✅ Default values

### 4.3. Identificar relaciones entre tablas

**Crear diagrama ER:**

```
pages
  └─ belongsTo: users (user_id)

users
  ├─ hasMany: pages
  └─ belongsToMany: roles (role_users)

roles
  └─ belongsToMany: users (role_users)
```

### 4.4. Documentar seeders (si existen)

```bash
find platform -name "*Seeder.php" -path "*/database/seeders/*"
```

---

## FASE 5️⃣: CREACIÓN DEL PAQUETE

### 5.1. Estructura del paquete

**Crear estructura base:**

```
packages/nombre-paquete/
├── composer.json
├── README.md
├── INSTALL.md
├── CHANGELOG.md
├── LICENSE
├── src/
│   ├── PackageServiceProvider.php
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Requests/
│   │   └── Middleware/
│   ├── Models/
│   ├── Database/
│   │   ├── Migrations/
│   │   └── Seeders/
│   ├── Routes/
│   │   ├── web.php
│   │   └── api.php
│   ├── Resources/
│   │   └── views/
│   ├── Config/
│   ├── Helpers/
│   └── Traits/
└── tests/
```

### 5.2. Crear composer.json

**Template:**

```json
{
    "name": "vendor/package-name",
    "description": "Descripción del paquete",
    "type": "library",
    "keywords": ["laravel", "admin"],
    "require": {
        "php": "^8.1",
        "illuminate/support": "^10.0|^11.0"
    },
    "autoload": {
        "psr-4": {
            "Vendor\\PackageName\\": "src/"
        },
        "files": [
            "src/Helpers/helpers.php"
        ]
    },
    "extra": {
        "laravel": {
            "providers": [
                "Vendor\\PackageName\\PackageServiceProvider"
            ]
        }
    },
    "minimum-stability": "dev",
    "prefer-stable": true
}
```

### 5.3. Crear ServiceProvider

**Template completo:**

```php
<?php

namespace Vendor\PackageName;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class PackageServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Merge config
        $this->mergeConfigFrom(
            __DIR__.'/../config/package.php', 'package'
        );
    }

    public function boot(): void
    {
        // Load routes
        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');

        // Load views
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'package');

        // Load migrations
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');

        // Publish config
        $this->publishes([
            __DIR__.'/../config/package.php' => config_path('package.php'),
        ], 'package-config');

        // Publish views
        $this->publishes([
            __DIR__.'/../resources/views' => resource_path('views/vendor/package'),
        ], 'package-views');

        // Publish migrations
        $this->publishes([
            __DIR__.'/../database/migrations' => database_path('migrations'),
        ], 'package-migrations');

        // Publish assets
        $this->publishes([
            __DIR__.'/../resources/assets' => public_path('vendor/package'),
        ], 'package-assets');
    }
}
```

### 5.4. Copiar y adaptar código

**Para cada archivo:**

#### Controladores
```php
// ANTES (Mercosan)
namespace Botble\Page\Http\Controllers;
use Botble\Base\Http\Controllers\BaseController;

// DESPUÉS (Paquete)
namespace Vendor\PackageName\Http\Controllers;
use Vendor\PackageName\Http\Controllers\BaseController;
```

#### Modelos
```php
// Adaptar namespace
// Mantener relaciones
// Actualizar referencias a otros modelos
```

#### Vistas
```blade
{{-- ANTES --}}
@extends(BaseHelper::getAdminMasterLayoutTemplate())

{{-- DESPUÉS --}}
@extends('package::layouts.master')
```

#### Rutas
```php
// Agrupar bajo prefijo del paquete
Route::prefix('package-prefix')->group(function () {
    // Rutas aquí
});
```

### 5.5. Crear migraciones limpias

**Usar migraciones originales como base pero:**

```php
// ✅ HACER:
- Usar timestamps actuales (2024_01_01_000001)
- Eliminar dependencias externas
- Usar tipos de datos estándar
- Incluir todos los índices

// ❌ NO HACER:
- Referenciar tablas que no están en el paquete
- Usar helpers externos
- Depender de plugins específicos
```

### 5.6. Crear helpers

```php
// src/Helpers/helpers.php

if (!function_exists('package_setting')) {
    function package_setting($key, $default = null)
    {
        return \Vendor\PackageName\Models\Setting::get($key, $default);
    }
}

if (!function_exists('package_url')) {
    function package_url($path = '')
    {
        return url(config('package.route_prefix', 'admin') . '/' . ltrim($path, '/'));
    }
}
```

### 5.7. Crear configuración

```php
// config/package.php

return [
    'route_prefix' => 'admin',
    'middleware' => ['web', 'auth'],
    'table_prefix' => '',
    'cache_enabled' => true,
    'cache_ttl' => 3600,
    'per_page' => 20,
];
```

### 5.8. Documentar instalación

**Crear README.md completo con:**

```markdown
# Nombre del Paquete

## Instalación

1. Require del paquete
2. Publicar archivos
3. Migrar base de datos
4. Configuración

## Uso

Ejemplos de código

## Configuración

Opciones disponibles

## API

Documentación de endpoints

## Testing

Cómo ejecutar tests
```

---

## 🔧 HERRAMIENTAS UTILIZADAS

### Comandos útiles

```bash
# Buscar controladores
find . -name "*Controller.php" -path "*/Http/Controllers/*"

# Buscar modelos
find . -name "*.php" -path "*/Models/*"

# Buscar migraciones
find . -name "*.php" -path "*/database/migrations/*"

# Buscar vistas
find . -name "*.blade.php" -path "*/resources/views/*"

# Buscar traducciones
find . -name "*.php" -path "*/lang/*"

# Buscar settings keys
grep -r "setting(" platform/ --include="*.php" | head -50

# Buscar permisos
grep -r "permission" platform/ --include="*.php" | grep -E "'=>|=>" | head -50

# Buscar rutas
grep -r "Route::" platform/*/routes/ --include="*.php"
```

### Scripts PHP útiles

```php
// Extraer todas las settings keys
php artisan tinker
> DB::table('settings')->pluck('key')->toArray();

// Listar todas las rutas
php artisan route:list --path=admin

// Ver estructura de tabla
php artisan db:show
php artisan db:table users
```

---

## 📝 CHECKLIST DE MIGRACIÓN

### ✅ Fase 1: Análisis de URLs
- [ ] Listar todas las URLs a migrar
- [ ] Encontrar archivos de rutas
- [ ] Documentar rutas con controladores
- [ ] Identificar middleware y permisos

### ✅ Fase 2: Backend
- [ ] Ubicar todos los controladores
- [ ] Documentar métodos de cada controlador
- [ ] Extraer FormRequests y validaciones
- [ ] Documentar modelos y relaciones
- [ ] Listar settings keys utilizados
- [ ] Mapear permisos
- [ ] Documentar lógica de negocio

### ✅ Fase 3: Frontend
- [ ] Ubicar todas las vistas
- [ ] Documentar componentes utilizados
- [ ] Listar campos de formularios
- [ ] Identificar JavaScript/Assets
- [ ] Extraer traducciones
- [ ] Documentar estructura HTML

### ✅ Fase 4: Database
- [ ] Encontrar migraciones
- [ ] Documentar estructura de tablas
- [ ] Mapear relaciones
- [ ] Identificar seeders

### ✅ Fase 5: Empaquetado
- [ ] Crear estructura de carpetas
- [ ] Crear composer.json
- [ ] Crear ServiceProvider
- [ ] Copiar y adaptar controladores
- [ ] Copiar y adaptar modelos
- [ ] Copiar y adaptar vistas
- [ ] Crear migraciones limpias
- [ ] Crear helpers
- [ ] Crear configuración
- [ ] Escribir documentación
- [ ] Crear tests
- [ ] Versionar con git

---

## 🎓 LECCIONES APRENDIDAS

### ✅ Buenas Prácticas

1. **Documentar TODO desde el inicio**
   - No confiar en la memoria
   - Crear informes estructurados
   - Usar tablas y esquemas

2. **Mantener el código desacoplado**
   - No depender de plugins externos
   - Usar interfaces cuando sea posible
   - Inyección de dependencias

3. **Configuración flexible**
   - Todo debe ser configurable
   - Usar constantes en config
   - Permitir override

4. **Versionado semántico**
   - Major: Cambios incompatibles
   - Minor: Nueva funcionalidad
   - Patch: Bug fixes

### ⚠️ Errores Comunes a Evitar

1. ❌ No documentar las settings keys
2. ❌ Olvidar copiar validaciones
3. ❌ No adaptar namespaces
4. ❌ Copiar dependencias innecesarias
5. ❌ No probar el paquete en proyecto limpio
6. ❌ Hardcodear valores
7. ❌ No incluir migraciones
8. ❌ Olvidar traducciones

---

## 🔄 PROCESO PARA PRÓXIMAS FUNCIONALIDADES

### Plantilla rápida

```bash
# 1. Identificar funcionalidad
FUNCIONALIDAD="newsletter"

# 2. Buscar archivos relacionados
find platform -iname "*${FUNCIONALIDAD}*"

# 3. Analizar rutas
cat platform/plugins/${FUNCIONALIDAD}/routes/web.php

# 4. Analizar controlador
cat platform/plugins/${FUNCIONALIDAD}/src/Http/Controllers/*

# 5. Analizar modelo
cat platform/plugins/${FUNCIONALIDAD}/src/Models/*

# 6. Analizar migraciones
cat platform/plugins/${FUNCIONALIDAD}/database/migrations/*

# 7. Crear estructura en paquete
mkdir -p packages/mercosan-${FUNCIONALIDAD}/src/{Http/{Controllers,Requests},Models,Database/Migrations,Routes,Resources/views,Config}

# 8. Copiar y adaptar archivos
# ... seguir plantillas de este documento

# 9. Probar en proyecto limpio
cd ../proyecto-prueba
composer require functionbytes/mercosan-${FUNCIONALIDAD}:dev-main
```

---

## 📚 RECURSOS ADICIONALES

### Documentación generada

En este proyecto se generaron:
- ✅ `INFORME_BACKEND.md` - Análisis completo de controladores
- ✅ `INFORME_FRONTEND.md` - Análisis completo de vistas
- ✅ `INSTALL.md` - Guía de instalación
- ✅ `CHANGELOG.md` - Historial de versiones
- ✅ `STRUCTURE.md` - Estructura del paquete

### Links útiles

- [Laravel Package Development](https://laravel.com/docs/packages)
- [Orchestra Testbench](https://github.com/orchestral/testbench)
- [Spatie Package Tools](https://github.com/spatie/laravel-package-tools)

---

## 💡 TIPS FINALES

1. **Siempre probar en proyecto limpio** antes de publicar
2. **Mantener changelog actualizado** con cada cambio
3. **Usar PHPStan o Psalm** para análisis estático
4. **Escribir tests** desde el principio
5. **Documentar API** con PHPDoc completo
6. **Usar GitHub Actions** para CI/CD
7. **Semantic versioning** estricto
8. **Keep it simple** - no sobre-ingenierizar

---

## ✍️ CONCLUSIÓN

Este proceso ha demostrado ser efectivo para migrar funcionalidades complejas de un sistema monolítico a paquetes reutilizables. El tiempo invertido en análisis y documentación se recupera con creces en la fase de empaquetado.

**Tiempo estimado por funcionalidad:**
- Análisis: 2-4 horas
- Backend: 1-2 horas
- Frontend: 1-2 horas
- Database: 30min - 1 hora
- Empaquetado: 2-3 horas
- Testing: 1-2 horas
- **TOTAL: 8-14 horas** por módulo complejo

---

**Fecha última actualización:** 2025-01-XX
**Versión del documento:** 1.0.0
**Autor:** FunctionBytes Development Team
