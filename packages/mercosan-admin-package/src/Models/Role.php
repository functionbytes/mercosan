<?php

namespace FunctionBytes\MercosanAdmin\Models;

use FunctionBytes\MercosanAdmin\Traits\HasPermissions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Role extends Model
{
    use HasPermissions;

    protected $table = 'roles';

    protected $fillable = [
        'name',
        'slug',
        'permissions',
        'description',
        'is_default',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'permissions' => 'json',
        'is_default' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::saving(function (self $model): void {
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->name);
            }
        });

        static::deleted(function (self $model): void {
            $model->users()->detach();
        });
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(
            config('mercosan-admin.models.user', User::class),
            'role_users',
            'role_id',
            'user_id'
        )->withTimestamps();
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(
            config('mercosan-admin.models.user', User::class),
            'created_by'
        )->withDefault();
    }

    public function delete(): ?bool
    {
        if ($this->exists) {
            $this->users()->detach();
        }

        return parent::delete();
    }

    public function getAvailablePermissions(): array
    {
        $permissions = config('mercosan-admin.permissions', []);

        return $permissions;
    }

    public function scopeDefault($query)
    {
        return $query->where('is_default', true);
    }
}
