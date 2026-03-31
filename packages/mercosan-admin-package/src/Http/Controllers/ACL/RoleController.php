<?php

namespace FunctionBytes\MercosanAdmin\Http\Controllers\ACL;

use FunctionBytes\MercosanAdmin\Http\Controllers\BaseController;
use FunctionBytes\MercosanAdmin\Models\Role;
use FunctionBytes\MercosanAdmin\Models\User;
use FunctionBytes\MercosanAdmin\Http\Requests\RoleRequest;
use Illuminate\Http\Request;

class RoleController extends BaseController
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', config('mercosan-admin.pagination.per_page', 20));

        $roles = Role::withCount('users')
            ->when($request->get('search'), function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        if ($request->expectsJson()) {
            return $this->success('Roles retrieved successfully', ['roles' => $roles]);
        }

        return view('mercosan-admin::roles.index', compact('roles'));
    }

    public function create()
    {
        $permissions = $this->getAvailablePermissions();
        return view('mercosan-admin::roles.create', compact('permissions'));
    }

    public function store(RoleRequest $request)
    {
        $data = $request->validated();

        if ($request->has('is_default') && $request->input('is_default')) {
            Role::query()->update(['is_default' => false]);
        }

        $permissions = [];
        if ($request->has('permissions')) {
            foreach ($request->input('permissions', []) as $permission) {
                $permissions[$permission] = true;
            }
        }

        $data['permissions'] = $permissions;
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();

        $role = Role::create($data);

        if ($request->expectsJson()) {
            return $this->success('Role created successfully', ['role' => $role]);
        }

        return redirect()->route('mercosan-admin.roles.edit', $role->id)
            ->with('success', 'Role created successfully');
    }

    public function show(Role $role)
    {
        $role->load('users');

        if (request()->expectsJson()) {
            return $this->success('Role retrieved successfully', ['role' => $role]);
        }

        return view('mercosan-admin::roles.show', compact('role'));
    }

    public function edit(Role $role)
    {
        $permissions = $this->getAvailablePermissions();
        return view('mercosan-admin::roles.edit', compact('role', 'permissions'));
    }

    public function update(RoleRequest $request, Role $role)
    {
        $data = $request->validated();

        if ($request->has('is_default') && $request->input('is_default')) {
            Role::where('id', '!=', $role->id)->update(['is_default' => false]);
        }

        $permissions = [];
        if ($request->has('permissions')) {
            foreach ($request->input('permissions', []) as $permission) {
                $permissions[$permission] = true;
            }
        }

        $data['permissions'] = $permissions;
        $data['updated_by'] = auth()->id();

        $role->update($data);

        if ($request->expectsJson()) {
            return $this->success('Role updated successfully', ['role' => $role]);
        }

        return redirect()->route('mercosan-admin.roles.edit', $role->id)
            ->with('success', 'Role updated successfully');
    }

    public function destroy(Role $role)
    {
        if ($role->users()->count() > 0) {
            return $this->error('Cannot delete role with assigned users');
        }

        $role->delete();

        if (request()->expectsJson()) {
            return $this->success('Role deleted successfully');
        }

        return redirect()->route('mercosan-admin.roles.index')
            ->with('success', 'Role deleted successfully');
    }

    public function duplicate(Role $role)
    {
        $newRole = $role->replicate();
        $newRole->name = $role->name . ' (Copy)';
        $newRole->slug = null;
        $newRole->is_default = false;
        $newRole->created_by = auth()->id();
        $newRole->updated_by = auth()->id();
        $newRole->save();

        return $this->success('Role duplicated successfully', ['role' => $newRole]);
    }

    public function assignUsers(Role $role, Request $request)
    {
        $userIds = $request->input('user_ids', []);

        foreach ($userIds as $userId) {
            $user = User::find($userId);
            if ($user) {
                $user->roles()->syncWithoutDetaching([$role->id]);
            }
        }

        return $this->success('Users assigned to role successfully');
    }

    public function removeUser(Role $role, User $user)
    {
        $user->roles()->detach($role->id);

        return $this->success('User removed from role successfully');
    }

    protected function getAvailablePermissions(): array
    {
        return config('mercosan-admin.permissions', [
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
        ]);
    }
}
