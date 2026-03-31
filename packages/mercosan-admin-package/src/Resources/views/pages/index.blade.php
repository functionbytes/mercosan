@extends('mercosan-admin::layouts.master')

@section('title', 'Pages')
@section('page-title', 'Pages')

@section('content')
<div class="d-flex justify-content-between mb-3">
    <div>
        <a href="{{ route('mercosan-admin.pages.create') }}" class="btn btn-primary">
            <i class="bi bi-plus-circle"></i> Create Page
        </a>
    </div>
    <div>
        <form action="{{ route('mercosan-admin.pages.index') }}" method="GET" class="d-flex">
            <input type="text" name="search" class="form-control me-2" placeholder="Search pages..." value="{{ request('search') }}">
            <select name="status" class="form-select me-2">
                <option value="">All Status</option>
                <option value="published" {{ request('status') === 'published' ? 'selected' : '' }}>Published</option>
                <option value="draft" {{ request('status') === 'draft' ? 'selected' : '' }}>Draft</option>
                <option value="pending" {{ request('status') === 'pending' ? 'selected' : '' }}>Pending</option>
            </select>
            <button type="submit" class="btn btn-outline-secondary">
                <i class="bi bi-search"></i> Search
            </button>
        </form>
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
                        <th>Template</th>
                        <th>Status</th>
                        <th>Author</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($pages as $page)
                        <tr>
                            <td>{{ $page->id }}</td>
                            <td>{{ $page->name }}</td>
                            <td>{{ $page->template ?? 'default' }}</td>
                            <td>
                                <span class="badge bg-{{ $page->status === 'published' ? 'success' : ($page->status === 'draft' ? 'warning' : 'info') }}">
                                    {{ ucfirst($page->status) }}
                                </span>
                            </td>
                            <td>{{ $page->user->name ?? 'N/A' }}</td>
                            <td>{{ $page->created_at->format('Y-m-d H:i') }}</td>
                            <td>
                                <div class="btn-group btn-group-sm">
                                    <a href="{{ route('mercosan-admin.pages.show', $page) }}" class="btn btn-info" title="View">
                                        <i class="bi bi-eye"></i>
                                    </a>
                                    <a href="{{ route('mercosan-admin.pages.edit', $page) }}" class="btn btn-warning" title="Edit">
                                        <i class="bi bi-pencil"></i>
                                    </a>
                                    <form action="{{ route('mercosan-admin.pages.destroy', $page) }}" method="POST" class="d-inline" onsubmit="return confirm('Are you sure?')">
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
                            <td colspan="7" class="text-center">No pages found</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($pages->hasPages())
            <div class="mt-3">
                {{ $pages->links() }}
            </div>
        @endif
    </div>
</div>
@endsection
