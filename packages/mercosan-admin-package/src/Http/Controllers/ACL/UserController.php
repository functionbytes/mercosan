<?php

namespace FunctionBytes\MercosanAdmin\Http\Controllers\ACL;

use FunctionBytes\MercosanAdmin\Http\Controllers\BaseController;
use FunctionBytes\MercosanAdmin\Models\User;
use FunctionBytes\MercosanAdmin\Models\Role;
use FunctionBytes\MercosanAdmin\Http\Requests\UserRequest;
use FunctionBytes\MercosanAdmin\Http\Requests\UpdatePasswordRequest;
use FunctionBytes\MercosanAdmin\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends BaseController
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', config('mercosan-admin.pagination.per_page', 20));

        $users = User::with('roles')
            ->when($request->get('role'), function ($query, $role) {
                return $query->whereHas('roles', function ($q) use ($role) {
                    $q->where('role_id', $role);
                });
            })
            ->when($request->get('search'), function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                      ->orWhere('last_name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('username', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        if ($request->expectsJson()) {
            return $this->success('Users retrieved successfully', ['users' => $users]);
        }

        return view('mercosan-admin::users.index', compact('users'));
    }

    public function create()
    {
        $roles = Role::all();
        return view('mercosan-admin::users.create', compact('roles'));
    }

    public function store(UserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        if ($request->has('roles')) {
            $user->roles()->sync($request->input('roles'));
        }

        if ($request->expectsJson()) {
            return $this->success('User created successfully', ['user' => $user]);
        }

        return redirect()->route('mercosan-admin.users.edit', $user->id)
            ->with('success', 'User created successfully');
    }

    public function show(User $user)
    {
        $user->load('roles', 'activations');

        if (request()->expectsJson()) {
            return $this->success('User retrieved successfully', ['user' => $user]);
        }

        return view('mercosan-admin::users.show', compact('user'));
    }

    public function edit(User $user)
    {
        $roles = Role::all();
        $user->load('roles');

        return view('mercosan-admin::users.edit', compact('user', 'roles'));
    }

    public function update(UserRequest $request, User $user)
    {
        $data = $request->validated();

        if (empty($data['password'])) {
            unset($data['password']);
        } else {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        if ($request->has('roles')) {
            $user->roles()->sync($request->input('roles'));
        }

        if ($request->expectsJson()) {
            return $this->success('User updated successfully', ['user' => $user]);
        }

        return redirect()->route('mercosan-admin.users.edit', $user->id)
            ->with('success', 'User updated successfully');
    }

    public function destroy(User $user)
    {
        if (auth()->id() === $user->id) {
            return $this->error('You cannot delete yourself');
        }

        if ($user->super_user && !auth()->user()->isSuperUser()) {
            return $this->error('You cannot delete a super user');
        }

        $user->delete();

        if (request()->expectsJson()) {
            return $this->success('User deleted successfully');
        }

        return redirect()->route('mercosan-admin.users.index')
            ->with('success', 'User deleted successfully');
    }

    public function profile()
    {
        $user = auth()->user();
        return view('mercosan-admin::users.profile', compact('user'));
    }

    public function updateProfile(UpdateProfileRequest $request)
    {
        $user = auth()->user();
        $user->update($request->validated());

        if ($request->expectsJson()) {
            return $this->success('Profile updated successfully', ['user' => $user]);
        }

        return redirect()->back()->with('success', 'Profile updated successfully');
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = auth()->user();

        if (!Hash::check($request->input('current_password'), $user->password)) {
            return $this->error('Current password is incorrect');
        }

        $user->update([
            'password' => Hash::make($request->input('new_password'))
        ]);

        if ($request->expectsJson()) {
            return $this->success('Password updated successfully');
        }

        return redirect()->back()->with('success', 'Password updated successfully');
    }

    public function makeSuper(User $user)
    {
        if (!auth()->user()->isSuperUser()) {
            return $this->forbidden('Only super users can grant super user access');
        }

        $user->super_user = true;
        $user->manage_supers = true;
        $user->save();

        return $this->success('User granted super user access');
    }

    public function removeSuper(User $user)
    {
        if (!auth()->user()->isSuperUser()) {
            return $this->forbidden('Only super users can revoke super user access');
        }

        if (auth()->id() === $user->id) {
            return $this->error('You cannot revoke your own super user access');
        }

        $user->super_user = false;
        $user->manage_supers = false;
        $user->save();

        return $this->success('Super user access revoked');
    }
}
