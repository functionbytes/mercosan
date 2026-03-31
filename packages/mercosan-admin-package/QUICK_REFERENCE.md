# 🚀 GUÍA RÁPIDA DE REFERENCIA

**Comandos y patrones más usados en el proceso de migración**

---

## 📦 ANÁLISIS RÁPIDO

### Encontrar archivos clave

```bash
# Rutas
find platform -name "web.php" -path "*/routes/*"

# Controladores
find platform -name "*Controller.php" | grep -i "nombre"

# Modelos
find platform -name "*.php" -path "*/Models/*" | grep -i "nombre"

# Migraciones
find platform -name "*.php" -path "*/migrations/*" | grep -i "nombre"

# Vistas
find platform -name "*.blade.php" | grep -i "nombre"
```

### Buscar configuraciones

```bash
# Settings keys
grep -r "setting(" platform/plugins/nombre/ --include="*.php"

# Permisos
grep -r "'permission'" platform/plugins/nombre/ --include="*.php"

# Traducciones
grep -r "trans(" platform/plugins/nombre/ --include="*.php"
grep -r "__(" platform/plugins/nombre/ --include="*.php"
```

---

## 🔧 COMANDOS LARAVEL ÚTILES

```bash
# Ver rutas
php artisan route:list
php artisan route:list --path=admin

# Ver tablas
php artisan db:show
php artisan db:table nombre_tabla

# Ver configuración
php artisan config:show
php artisan config:show database

# Limpiar cache
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Migrar
php artisan migrate
php artisan migrate:status
php artisan migrate:rollback
php artisan migrate:fresh
```

---

## 📝 PATRONES DE CÓDIGO

### Controlador básico

```php
<?php

namespace Vendor\Package\Http\Controllers;

use Vendor\Package\Models\Model;
use Vendor\Package\Http\Requests\ModelRequest;
use Illuminate\Http\Request;

class ModelController extends BaseController
{
    public function index()
    {
        $items = Model::query()->paginate(20);
        return view('package::models.index', compact('items'));
    }

    public function create()
    {
        return view('package::models.create');
    }

    public function store(ModelRequest $request)
    {
        $item = Model::create($request->validated());
        return redirect()->route('package.models.index')
            ->with('success', 'Created successfully');
    }

    public function edit(Model $model)
    {
        return view('package::models.edit', compact('model'));
    }

    public function update(ModelRequest $request, Model $model)
    {
        $model->update($request->validated());
        return redirect()->route('package.models.index')
            ->with('success', 'Updated successfully');
    }

    public function destroy(Model $model)
    {
        $model->delete();
        return redirect()->route('package.models.index')
            ->with('success', 'Deleted successfully');
    }
}
```

### Modelo básico

```php
<?php

namespace Vendor\Package\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ModelName extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'status',
    ];

    protected $casts = [
        'status' => 'string',
        'is_active' => 'boolean',
        'published_at' => 'datetime',
    ];

    protected $hidden = [
        'deleted_at',
    ];

    // Relaciones
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }
}
```

### FormRequest básico

```php
<?php

namespace Vendor\Package\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ModelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // O check de permisos
    }

    public function rules(): array
    {
        $id = $this->route('model')?->id;

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', Rule::unique('table')->ignore($id)],
            'description' => ['nullable', 'string', 'max:1000'],
            'status' => ['required', Rule::in(['draft', 'published'])],
            'is_active' => ['boolean'],
            'image' => ['nullable', 'image', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es obligatorio',
            'email.unique' => 'Este email ya está en uso',
        ];
    }
}
```

### Migración básica

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('table_name', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->text('description')->nullable();
            $table->string('email')->unique();
            $table->string('status', 60)->default('draft');
            $table->boolean('is_active')->default(true);
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Índices
            $table->index('status');
            $table->index('is_active');
            $table->index(['user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('table_name');
    }
};
```

### ServiceProvider básico

```php
<?php

namespace Vendor\Package;

use Illuminate\Support\ServiceProvider;

class PackageServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/package.php', 'package');
    }

    public function boot(): void
    {
        // Rutas
        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');

        // Vistas
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'package');

        // Migraciones
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');

        // Traducciones
        $this->loadTranslationsFrom(__DIR__.'/../lang', 'package');

        // Publicables
        if ($this->app->runningInConsole()) {
            // Config
            $this->publishes([
                __DIR__.'/../config/package.php' => config_path('package.php'),
            ], 'package-config');

            // Vistas
            $this->publishes([
                __DIR__.'/../resources/views' => resource_path('views/vendor/package'),
            ], 'package-views');

            // Migraciones
            $this->publishes([
                __DIR__.'/../database/migrations' => database_path('migrations'),
            ], 'package-migrations');

            // Assets
            $this->publishes([
                __DIR__.'/../public' => public_path('vendor/package'),
            ], 'package-assets');
        }
    }
}
```

### Archivo de rutas

```php
<?php

use Illuminate\Support\Facades\Route;
use Vendor\Package\Http\Controllers\ModelController;

Route::middleware(['web', 'auth'])->prefix('admin')->name('package.')->group(function () {
    Route::resource('models', ModelController::class);

    // Rutas adicionales
    Route::post('models/{model}/publish', [ModelController::class, 'publish'])
        ->name('models.publish');

    Route::get('models/{model}/duplicate', [ModelController::class, 'duplicate'])
        ->name('models.duplicate');
});
```

---

## 🎨 PLANTILLAS BLADE

### Layout master

```blade
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin Panel')</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    @stack('styles')
</head>
<body>
    @include('package::partials.header')

    <div class="container-fluid">
        <div class="row">
            @include('package::partials.sidebar')

            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                @include('package::partials.alerts')

                @yield('content')
            </main>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    @stack('scripts')
</body>
</html>
```

### Vista index

```blade
@extends('package::layouts.master')

@section('title', 'Models')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h1>Models</h1>
    <a href="{{ route('package.models.create') }}" class="btn btn-primary">
        Create New
    </a>
</div>

<div class="card">
    <div class="card-body">
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($items as $item)
                <tr>
                    <td>{{ $item->id }}</td>
                    <td>{{ $item->name }}</td>
                    <td>
                        <span class="badge bg-{{ $item->status === 'published' ? 'success' : 'secondary' }}">
                            {{ $item->status }}
                        </span>
                    </td>
                    <td>{{ $item->created_at->format('Y-m-d') }}</td>
                    <td>
                        <a href="{{ route('package.models.edit', $item) }}" class="btn btn-sm btn-outline-primary">
                            Edit
                        </a>
                        <form action="{{ route('package.models.destroy', $item) }}" method="POST" class="d-inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-outline-danger"
                                    onclick="return confirm('Are you sure?')">
                                Delete
                            </button>
                        </form>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="5" class="text-center">No records found</td>
                </tr>
                @endforelse
            </tbody>
        </table>

        {{ $items->links() }}
    </div>
</div>
@endsection
```

### Vista form

```blade
@extends('package::layouts.master')

@section('title', isset($model) ? 'Edit Model' : 'Create Model')

@section('content')
<h1>{{ isset($model) ? 'Edit' : 'Create' }} Model</h1>

<form action="{{ isset($model) ? route('package.models.update', $model) : route('package.models.store') }}"
      method="POST" enctype="multipart/form-data">
    @csrf
    @if(isset($model))
        @method('PUT')
    @endif

    <div class="card">
        <div class="card-body">
            <div class="mb-3">
                <label for="name" class="form-label">Name *</label>
                <input type="text"
                       class="form-control @error('name') is-invalid @enderror"
                       id="name"
                       name="name"
                       value="{{ old('name', $model->name ?? '') }}"
                       required>
                @error('name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control @error('description') is-invalid @enderror"
                          id="description"
                          name="description"
                          rows="4">{{ old('description', $model->description ?? '') }}</textarea>
                @error('description')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <select class="form-select @error('status') is-invalid @enderror"
                        id="status"
                        name="status">
                    <option value="draft" {{ old('status', $model->status ?? '') === 'draft' ? 'selected' : '' }}>
                        Draft
                    </option>
                    <option value="published" {{ old('status', $model->status ?? '') === 'published' ? 'selected' : '' }}>
                        Published
                    </option>
                </select>
                @error('status')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input"
                           type="checkbox"
                           id="is_active"
                           name="is_active"
                           value="1"
                           {{ old('is_active', $model->is_active ?? true) ? 'checked' : '' }}>
                    <label class="form-check-label" for="is_active">
                        Active
                    </label>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-3">
        <button type="submit" class="btn btn-primary">
            {{ isset($model) ? 'Update' : 'Create' }}
        </button>
        <a href="{{ route('package.models.index') }}" class="btn btn-secondary">
            Cancel
        </a>
    </div>
</form>
@endsection
```

---

## 📊 HELPERS COMUNES

```php
// Configuración
if (!function_exists('package_config')) {
    function package_config($key, $default = null) {
        return config("package.{$key}", $default);
    }
}

// Settings
if (!function_exists('package_setting')) {
    function package_setting($key, $default = null) {
        return \Vendor\Package\Models\Setting::get($key, $default);
    }
}

// URLs
if (!function_exists('package_url')) {
    function package_url($path = '') {
        return url(config('package.route_prefix', 'admin') . '/' . ltrim($path, '/'));
    }
}

// Assets
if (!function_exists('package_asset')) {
    function package_asset($path) {
        return asset('vendor/package/' . ltrim($path, '/'));
    }
}

// Permisos
if (!function_exists('package_can')) {
    function package_can($permission) {
        return auth()->check() && auth()->user()->hasPermission($permission);
    }
}

// Auditoría
if (!function_exists('package_audit')) {
    function package_audit($action, $model) {
        \Vendor\Package\Models\AuditHistory::log($action, $model);
    }
}
```

---

## ⚙️ CONFIGURACIÓN

```php
// config/package.php
return [
    // Rutas
    'route_prefix' => env('PACKAGE_ROUTE_PREFIX', 'admin'),
    'middleware' => ['web', 'auth'],

    // Base de datos
    'table_prefix' => env('PACKAGE_TABLE_PREFIX', ''),
    'connection' => env('PACKAGE_DB_CONNECTION', null),

    // Cache
    'cache_enabled' => env('PACKAGE_CACHE_ENABLED', true),
    'cache_ttl' => env('PACKAGE_CACHE_TTL', 3600),

    // Paginación
    'per_page' => env('PACKAGE_PER_PAGE', 20),

    // Uploads
    'upload_path' => env('PACKAGE_UPLOAD_PATH', 'uploads/package'),
    'max_upload_size' => env('PACKAGE_MAX_UPLOAD_SIZE', 2048), // KB

    // Features
    'enable_audit_log' => env('PACKAGE_ENABLE_AUDIT_LOG', true),
    'enable_soft_deletes' => env('PACKAGE_ENABLE_SOFT_DELETES', true),

    // UI
    'date_format' => env('PACKAGE_DATE_FORMAT', 'Y-m-d'),
    'datetime_format' => env('PACKAGE_DATETIME_FORMAT', 'Y-m-d H:i:s'),
];
```

---

## 🧪 TESTING

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Vendor\Package\Models\Model;

class ModelTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_list_models()
    {
        Model::factory()->count(3)->create();

        $response = $this->get(route('package.models.index'));

        $response->assertStatus(200);
        $response->assertViewHas('items');
    }

    /** @test */
    public function it_can_create_a_model()
    {
        $data = [
            'name' => 'Test Model',
            'description' => 'Test Description',
            'status' => 'draft',
        ];

        $response = $this->post(route('package.models.store'), $data);

        $response->assertRedirect(route('package.models.index'));
        $this->assertDatabaseHas('models', ['name' => 'Test Model']);
    }

    /** @test */
    public function it_validates_required_fields()
    {
        $response = $this->post(route('package.models.store'), []);

        $response->assertSessionHasErrors(['name']);
    }

    /** @test */
    public function it_can_update_a_model()
    {
        $model = Model::factory()->create();

        $response = $this->put(route('package.models.update', $model), [
            'name' => 'Updated Name',
            'status' => 'published',
        ]);

        $response->assertRedirect(route('package.models.index'));
        $this->assertEquals('Updated Name', $model->fresh()->name);
    }

    /** @test */
    public function it_can_delete_a_model()
    {
        $model = Model::factory()->create();

        $response = $this->delete(route('package.models.destroy', $model));

        $response->assertRedirect(route('package.models.index'));
        $this->assertSoftDeleted('models', ['id' => $model->id]);
    }
}
```

---

## 📦 PUBLICACIÓN

```bash
# 1. Commit inicial
git init
git add .
git commit -m "Initial commit"

# 2. Crear repositorio en GitHub
# ...

# 3. Push
git remote add origin git@github.com:usuario/repo.git
git push -u origin master

# 4. Crear tag
git tag -a v1.0.0 -m "First stable release"
git push origin v1.0.0

# 5. Registrar en Packagist
# https://packagist.org/packages/submit
```

---

Creado por: FunctionBytes Development Team
Última actualización: 2025-01-XX
