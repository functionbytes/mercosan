@extends('mercosan-admin::layouts.master')

@section('title', 'Settings')
@section('page-title', 'Settings')

@section('content')
<div class="row">
    <div class="col-md-3">
        <div class="list-group">
            <a href="{{ route('mercosan-admin.settings.general') }}" class="list-group-item list-group-item-action {{ request()->routeIs('mercosan-admin.settings.general') ? 'active' : '' }}">
                <i class="bi bi-gear"></i> General Settings
            </a>
            <a href="{{ route('mercosan-admin.settings.email') }}" class="list-group-item list-group-item-action {{ request()->routeIs('mercosan-admin.settings.email') ? 'active' : '' }}">
                <i class="bi bi-envelope"></i> Email Settings
            </a>
            <a href="{{ route('mercosan-admin.settings.media') }}" class="list-group-item list-group-item-action {{ request()->routeIs('mercosan-admin.settings.media') ? 'active' : '' }}">
                <i class="bi bi-image"></i> Media Settings
            </a>
        </div>
    </div>

    <div class="col-md-9">
        <div class="card">
            <div class="card-header">
                <h5>All Settings</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($settings as $setting)
                                <tr>
                                    <td><code>{{ $setting->key }}</code></td>
                                    <td>{{ Str::limit($setting->value, 50) }}</td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="2" class="text-center">No settings found</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
