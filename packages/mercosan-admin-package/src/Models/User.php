<?php

namespace FunctionBytes\MercosanAdmin\Models;

use FunctionBytes\MercosanAdmin\Traits\HasPermissions;
use FunctionBytes\MercosanAdmin\Traits\HasPreferences;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasPermissions, HasPreferences;

    protected $table = 'users';

    protected $fillable = [
        'username',
        'email',
        'first_name',
        'last_name',
        'password',
        'avatar_id',
        'permissions',
        'last_login',
        'super_user',
        'manage_supers',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'password' => 'hashed',
        'email_verified_at' => 'datetime',
        'permissions' => 'json',
        'last_login' => 'datetime',
        'super_user' => 'boolean',
        'manage_supers' => 'boolean',
    ];

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(
            config('mercosan-admin.models.role', Role::class),
            'role_users',
            'user_id',
            'role_id'
        )->withTimestamps();
    }

    public function activations(): HasMany
    {
        return $this->hasMany(Activation::class, 'user_id');
    }

    public function meta(): HasMany
    {
        return $this->hasMany(UserMeta::class, 'user_id');
    }

    protected function firstName(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => ucfirst((string) $value),
            set: fn ($value) => ucfirst((string) $value),
        );
    }

    protected function lastName(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => ucfirst((string) $value),
            set: fn ($value) => ucfirst((string) $value),
        );
    }

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn () => trim($this->first_name . ' ' . $this->last_name),
        );
    }

    protected function activated(): Attribute
    {
        return Attribute::get(fn (): bool => $this->activations()->where('completed', true)->exists());
    }

    protected function avatarUrl(): Attribute
    {
        return Attribute::get(function () {
            if ($this->avatar_id) {
                return asset('storage/avatars/' . $this->avatar_id);
            }

            return $this->generateAvatarUrl();
        });
    }

    public function isSuperUser(): bool
    {
        return $this->super_user || $this->hasPermission('core.super');
    }

    public function inRole($role): bool
    {
        $roleId = null;
        if ($role instanceof Role) {
            $roleId = $role->getKey();
        }

        foreach ($this->roles as $instance) {
            if ($role instanceof Role) {
                if ($instance->getKey() === $roleId) {
                    return true;
                }
            } elseif ($instance->getKey() == $role || $instance->slug == $role) {
                return true;
            }
        }

        return false;
    }

    public function delete(): ?bool
    {
        if ($this->exists) {
            $this->activations()->delete();
            $this->roles()->detach();
            $this->meta()->delete();
        }

        return parent::delete();
    }

    protected function generateAvatarUrl(): string
    {
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->name) . '&color=7F9CF5&background=EBF4FF';
    }

    public function getMeta(string $key, $default = null)
    {
        $meta = $this->meta()->where('key', $key)->first();
        return $meta ? $meta->value : $default;
    }

    public function setMeta(string $key, $value): void
    {
        $this->meta()->updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }
}
