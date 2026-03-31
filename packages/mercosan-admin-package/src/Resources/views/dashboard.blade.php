@extends('mercosan-admin::layouts.master')

@section('title', 'Dashboard')
@section('page-title', 'Dashboard')

@section('content')
<div class="row">
    <div class="col-md-3">
        <div class="card text-white bg-primary mb-3">
            <div class="card-body">
                <h5 class="card-title"><i class="bi bi-file-text"></i> Pages</h5>
                <p class="card-text display-6">{{ \FunctionBytes\MercosanAdmin\Models\Page::count() }}</p>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card text-white bg-success mb-3">
            <div class="card-body">
                <h5 class="card-title"><i class="bi bi-people"></i> Users</h5>
                <p class="card-text display-6">{{ \FunctionBytes\MercosanAdmin\Models\User::count() }}</p>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card text-white bg-warning mb-3">
            <div class="card-body">
                <h5 class="card-title"><i class="bi bi-shield-check"></i> Roles</h5>
                <p class="card-text display-6">{{ \FunctionBytes\MercosanAdmin\Models\Role::count() }}</p>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card text-white bg-info mb-3">
            <div class="card-body">
                <h5 class="card-title"><i class="bi bi-clock-history"></i> Audit Logs</h5>
                <p class="card-text display-6">{{ \FunctionBytes\MercosanAdmin\Models\AuditHistory::count() }}</p>
            </div>
        </div>
    </div>
</div>

<div class="row mt-4">
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <h5>Recent Pages</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse(\FunctionBytes\MercosanAdmin\Models\Page::latest()->limit(5)->get() as $page)
                                <tr>
                                    <td>{{ $page->name }}</td>
                                    <td><span class="badge bg-{{ $page->status === 'published' ? 'success' : 'warning' }}">{{ $page->status }}</span></td>
                                    <td>{{ $page->created_at->format('Y-m-d H:i') }}</td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="3" class="text-center">No pages found</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <h5>Recent Activity</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Action</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse(\FunctionBytes\MercosanAdmin\Models\AuditHistory::with('user')->latest()->limit(5)->get() as $log)
                                <tr>
                                    <td>{{ $log->user_name }}</td>
                                    <td>{{ $log->action }}</td>
                                    <td>{{ $log->created_at->diffForHumans() }}</td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="3" class="text-center">No activity found</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row mt-4">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h5>System Information</h5>
            </div>
            <div class="card-body">
                <dl class="row">
                    <dt class="col-sm-3">Laravel Version</dt>
                    <dd class="col-sm-9">{{ app()->version() }}</dd>

                    <dt class="col-sm-3">PHP Version</dt>
                    <dd class="col-sm-9">{{ PHP_VERSION }}</dd>

                    <dt class="col-sm-3">Environment</dt>
                    <dd class="col-sm-9"><span class="badge bg-{{ app()->environment() === 'production' ? 'success' : 'warning' }}">{{ app()->environment() }}</span></dd>

                    <dt class="col-sm-3">Database</dt>
                    <dd class="col-sm-9">{{ config('database.default') }}</dd>
                </dl>
            </div>
        </div>
    </div>
</div>
@endsection
