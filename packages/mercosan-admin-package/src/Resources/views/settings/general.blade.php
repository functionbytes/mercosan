@extends('mercosan-admin::layouts.master')

@section('title', 'General Settings')
@section('page-title', 'General Settings')

@section('content')
<div class="row">
    <div class="col-md-8">
        <div class="card">
            <div class="card-body">
                <form action="{{ route('mercosan-admin.settings.general.update') }}" method="POST">
                    @csrf

                    <div class="mb-3">
                        <label for="site_title" class="form-label">Site Title</label>
                        <input type="text" class="form-control" id="site_title" name="site_title" value="{{ old('site_title', $settings['site_title'] ?? '') }}">
                    </div>

                    <div class="mb-3">
                        <label for="site_description" class="form-label">Site Description</label>
                        <textarea class="form-control" id="site_description" name="site_description" rows="3">{{ old('site_description', $settings['site_description'] ?? '') }}</textarea>
                    </div>

                    <div class="mb-3">
                        <label for="admin_email" class="form-label">Admin Email</label>
                        <input type="email" class="form-control" id="admin_email" name="admin_email" value="{{ old('admin_email', $settings['admin_email'] ?? '') }}">
                    </div>

                    <div class="mb-3">
                        <label for="admin_phone" class="form-label">Admin Phone</label>
                        <input type="text" class="form-control" id="admin_phone" name="admin_phone" value="{{ old('admin_phone', $settings['admin_phone'] ?? '') }}">
                    </div>

                    <div class="mb-3">
                        <label for="timezone" class="form-label">Timezone</label>
                        <select class="form-select" id="timezone" name="timezone">
                            <option value="UTC" {{ old('timezone', $settings['timezone'] ?? '') === 'UTC' ? 'selected' : '' }}>UTC</option>
                            <option value="America/New_York" {{ old('timezone', $settings['timezone'] ?? '') === 'America/New_York' ? 'selected' : '' }}>America/New York</option>
                            <option value="America/Los_Angeles" {{ old('timezone', $settings['timezone'] ?? '') === 'America/Los_Angeles' ? 'selected' : '' }}>America/Los Angeles</option>
                            <option value="Europe/London" {{ old('timezone', $settings['timezone'] ?? '') === 'Europe/London' ? 'selected' : '' }}>Europe/London</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="date_format" class="form-label">Date Format</label>
                        <input type="text" class="form-control" id="date_format" name="date_format" value="{{ old('date_format', $settings['date_format'] ?? 'Y-m-d') }}">
                        <small class="text-muted">Example: Y-m-d for 2024-01-01</small>
                    </div>

                    <div class="mb-3">
                        <label for="time_format" class="form-label">Time Format</label>
                        <input type="text" class="form-control" id="time_format" name="time_format" value="{{ old('time_format', $settings['time_format'] ?? 'H:i:s') }}">
                        <small class="text-muted">Example: H:i:s for 14:30:00</small>
                    </div>

                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary">Save Settings</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card">
            <div class="card-header">
                <h5>Help</h5>
            </div>
            <div class="card-body">
                <p class="small">Configure the basic settings for your site.</p>
                <hr>
                <h6 class="small">Tips:</h6>
                <ul class="small">
                    <li>Site title appears in browser tabs</li>
                    <li>Description is used for SEO</li>
                    <li>Admin email receives notifications</li>
                    <li>Timezone affects all dates/times</li>
                </ul>
            </div>
        </div>
    </div>
</div>
@endsection
