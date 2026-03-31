@extends('mercosan-admin::layouts.master')

@section('title', 'System Information')
@section('page-title', 'System Information')

@section('content')
<div class="row">
    <div class="col-md-6">
        <div class="card mb-3">
            <div class="card-header">
                <h5>Server Information</h5>
            </div>
            <div class="card-body">
                <dl class="row mb-0">
                    <dt class="col-sm-4">Operating System</dt>
                    <dd class="col-sm-8">{{ $info['server']['os'] }}</dd>

                    <dt class="col-sm-4">Server Software</dt>
                    <dd class="col-sm-8">{{ $info['server']['server_software'] }}</dd>

                    <dt class="col-sm-4">Server Name</dt>
                    <dd class="col-sm-8">{{ $info['server']['server_name'] }}</dd>

                    <dt class="col-sm-4">Server Address</dt>
                    <dd class="col-sm-8">{{ $info['server']['server_address'] }}</dd>
                </dl>
            </div>
        </div>
    </div>

    <div class="col-md-6">
        <div class="card mb-3">
            <div class="card-header">
                <h5>PHP Information</h5>
            </div>
            <div class="card-body">
                <dl class="row mb-0">
                    <dt class="col-sm-5">PHP Version</dt>
                    <dd class="col-sm-7"><span class="badge bg-info">{{ $info['php']['version'] }}</span></dd>

                    <dt class="col-sm-5">Memory Limit</dt>
                    <dd class="col-sm-7">{{ $info['php']['memory_limit'] }}</dd>

                    <dt class="col-sm-5">Max Execution Time</dt>
                    <dd class="col-sm-7">{{ $info['php']['max_execution_time'] }}s</dd>

                    <dt class="col-sm-5">Upload Max Filesize</dt>
                    <dd class="col-sm-7">{{ $info['php']['upload_max_filesize'] }}</dd>
                </dl>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-6">
        <div class="card mb-3">
            <div class="card-header">
                <h5>Laravel Information</h5>
            </div>
            <div class="card-body">
                <dl class="row mb-0">
                    <dt class="col-sm-4">Version</dt>
                    <dd class="col-sm-8"><span class="badge bg-success">{{ $info['laravel']['version'] }}</span></dd>

                    <dt class="col-sm-4">Environment</dt>
                    <dd class="col-sm-8"><span class="badge bg-{{ $info['laravel']['environment'] === 'production' ? 'success' : 'warning' }}">{{ $info['laravel']['environment'] }}</span></dd>

                    <dt class="col-sm-4">Debug Mode</dt>
                    <dd class="col-sm-8"><span class="badge bg-{{ $info['laravel']['debug_mode'] ? 'danger' : 'success' }}">{{ $info['laravel']['debug_mode'] ? 'Enabled' : 'Disabled' }}</span></dd>

                    <dt class="col-sm-4">Timezone</dt>
                    <dd class="col-sm-8">{{ $info['laravel']['timezone'] }}</dd>

                    <dt class="col-sm-4">Cache Driver</dt>
                    <dd class="col-sm-8">{{ $info['laravel']['cache_driver'] }}</dd>

                    <dt class="col-sm-4">Queue Driver</dt>
                    <dd class="col-sm-8">{{ $info['laravel']['queue_driver'] }}</dd>
                </dl>
            </div>
        </div>
    </div>

    <div class="col-md-6">
        <div class="card mb-3">
            <div class="card-header">
                <h5>Database Information</h5>
            </div>
            <div class="card-body">
                <dl class="row mb-0">
                    <dt class="col-sm-4">Driver</dt>
                    <dd class="col-sm-8">{{ $info['database']['driver'] }}</dd>

                    <dt class="col-sm-4">Database</dt>
                    <dd class="col-sm-8">{{ $info['database']['database'] ?? 'N/A' }}</dd>

                    <dt class="col-sm-4">Connection</dt>
                    <dd class="col-sm-8"><span class="badge bg-success">{{ $info['database']['connection'] }}</span></dd>

                    @if(isset($info['database']['version']))
                        <dt class="col-sm-4">Version</dt>
                        <dd class="col-sm-8">{{ $info['database']['version'] }}</dd>
                    @endif

                    @if(isset($info['database']['tables_count']))
                        <dt class="col-sm-4">Tables Count</dt>
                        <dd class="col-sm-8"><span class="badge bg-secondary">{{ $info['database']['tables_count'] }}</span></dd>
                    @endif
                </dl>
            </div>
        </div>
    </div>
</div>
@endsection
