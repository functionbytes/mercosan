@extends('mercosan-admin::layouts.master')

@section('title', 'Roles')
@section('page-title', 'Roles & Permissions')

@section('content')
<div class="d-flex justify-content-between mb-3">
    <div>
        <a href="{{ route('mercosan-admin.roles.create') }}" class="btn btn-primary">
            <i class="bi bi-plus-circle"></i> Create Role
        </a>
    </div>
</div>

<div class="card">
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Users Count</th>
                        <th>Default</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($roles as $role)
                        <tr>
                            <td>{{ $role->id }}</td>
                            <td>{{ $role->name }}</td>
                            <td><code>{{ $role->slug }}</code></td>
                            <td><span class="badge bg-secondary">{{ $role->users_count }}</span></td>
                            <td>
                                @if($role->is_default)
                                    <span class="badge bg-success">Default</span>
                                @endif
                            </td>
                            <td>{{ $role->created_at->format('Y-m-d H:i') }}</td>
                            <td>
                                <div class="btn-group btn-group-sm">
                                    <a href="{{ route('mercosan-admin.roles.edit', $role) }}" class="btn btn-warning" title="Edit">
                                        <i class="bi bi-pencil"></i>
                                    </a>
                                    <form action="{{ route('mercosan-admin.roles.destroy', $role) }}" method="POST" class="d-inline" onsubmit="return confirm('Are you sure?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-danger" title="Delete">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="text-center">No roles found</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($roles->hasPages())
            <div class="mt-3">
                {{ $roles->links() }}
            </div>
        @endif
    </div>
</div>
@endsection
