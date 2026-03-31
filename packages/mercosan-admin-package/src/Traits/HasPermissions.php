<?php

namespace FunctionBytes\MercosanAdmin\Traits;

trait HasPermissions
{
    public function hasPermission(string|array $permissions): bool
    {
        if (is_array($permissions)) {
            foreach ($permissions as $permission) {
                if ($this->checkPermission($permission)) {
                    return true;
                }
            }
            return false;
        }

        return $this->checkPermission($permissions);
    }

    public function hasAnyPermission(string|array $permissions): bool
    {
        return $this->hasPermission($permissions);
    }

    public function hasAllPermissions(array $permissions): bool
    {
        foreach ($permissions as $permission) {
            if (!$this->checkPermission($permission)) {
                return false;
            }
        }
        return true;
    }

    protected function checkPermission(string $permission): bool
    {
        // Check direct permissions
        if (is_array($this->permissions) && isset($this->permissions[$permission])) {
            return $this->permissions[$permission] === true;
        }

        // Check role permissions
        if (method_exists($this, 'roles')) {
            foreach ($this->roles as $role) {
                if (is_array($role->permissions) && isset($role->permissions[$permission])) {
                    if ($role->permissions[$permission] === true) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    public function updatePermission(string $permission, bool $value = true): void
    {
        $permissions = $this->permissions ?? [];
        $permissions[$permission] = $value;
        $this->permissions = $permissions;
    }

    public function givePermission(string $permission): void
    {
        $this->updatePermission($permission, true);
    }

    public function revokePermission(string $permission): void
    {
        $this->updatePermission($permission, false);
    }
}
