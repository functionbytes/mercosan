<?php

namespace FunctionBytes\MercosanAdmin\Http\Controllers\Settings;

use FunctionBytes\MercosanAdmin\Http\Controllers\BaseController;
use FunctionBytes\MercosanAdmin\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends BaseController
{
    public function index()
    {
        $settings = Setting::orderBy('key')->get();

        if (request()->expectsJson()) {
            return $this->success('Settings retrieved successfully', ['settings' => $settings]);
        }

        return view('mercosan-admin::settings.index', compact('settings'));
    }

    public function general()
    {
        $settings = [
            'site_title' => Setting::get('site_title', ''),
            'site_description' => Setting::get('site_description', ''),
            'site_keywords' => Setting::get('site_keywords', ''),
            'admin_email' => Setting::get('admin_email', ''),
            'admin_phone' => Setting::get('admin_phone', ''),
            'site_logo' => Setting::get('site_logo', ''),
            'site_favicon' => Setting::get('site_favicon', ''),
            'timezone' => Setting::get('timezone', 'UTC'),
            'date_format' => Setting::get('date_format', 'Y-m-d'),
            'time_format' => Setting::get('time_format', 'H:i:s'),
        ];

        return view('mercosan-admin::settings.general', compact('settings'));
    }

    public function updateGeneral(Request $request)
    {
        $validated = $request->validate([
            'site_title' => 'nullable|string|max:255',
            'site_description' => 'nullable|string',
            'site_keywords' => 'nullable|string',
            'admin_email' => 'nullable|email',
            'admin_phone' => 'nullable|string|max:20',
            'site_logo' => 'nullable|string',
            'site_favicon' => 'nullable|string',
            'timezone' => 'nullable|string',
            'date_format' => 'nullable|string',
            'time_format' => 'nullable|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value);
        }

        if ($request->expectsJson()) {
            return $this->success('General settings updated successfully');
        }

        return redirect()->back()->with('success', 'General settings updated successfully');
    }

    public function email()
    {
        $settings = [
            'email_driver' => Setting::get('email_driver', 'smtp'),
            'email_host' => Setting::get('email_host', ''),
            'email_port' => Setting::get('email_port', '587'),
            'email_username' => Setting::get('email_username', ''),
            'email_password' => Setting::get('email_password', ''),
            'email_encryption' => Setting::get('email_encryption', 'tls'),
            'email_from_address' => Setting::get('email_from_address', ''),
            'email_from_name' => Setting::get('email_from_name', ''),
        ];

        return view('mercosan-admin::settings.email', compact('settings'));
    }

    public function updateEmail(Request $request)
    {
        $validated = $request->validate([
            'email_driver' => 'required|string',
            'email_host' => 'nullable|string',
            'email_port' => 'nullable|integer',
            'email_username' => 'nullable|string',
            'email_password' => 'nullable|string',
            'email_encryption' => 'nullable|string',
            'email_from_address' => 'required|email',
            'email_from_name' => 'required|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value);
        }

        if ($request->expectsJson()) {
            return $this->success('Email settings updated successfully');
        }

        return redirect()->back()->with('success', 'Email settings updated successfully');
    }

    public function media()
    {
        $settings = [
            'media_driver' => Setting::get('media_driver', 'public'),
            'media_disk' => Setting::get('media_disk', 'public'),
            'max_upload_size' => Setting::get('max_upload_size', '10240'),
            'allowed_image_extensions' => Setting::get('allowed_image_extensions', 'jpg,jpeg,png,gif'),
            'allowed_file_extensions' => Setting::get('allowed_file_extensions', 'pdf,doc,docx,xls,xlsx'),
            'image_quality' => Setting::get('image_quality', '90'),
            'thumbnail_width' => Setting::get('thumbnail_width', '150'),
            'thumbnail_height' => Setting::get('thumbnail_height', '150'),
        ];

        return view('mercosan-admin::settings.media', compact('settings'));
    }

    public function updateMedia(Request $request)
    {
        $validated = $request->validate([
            'media_driver' => 'required|string',
            'media_disk' => 'required|string',
            'max_upload_size' => 'required|integer',
            'allowed_image_extensions' => 'required|string',
            'allowed_file_extensions' => 'required|string',
            'image_quality' => 'required|integer|min:1|max:100',
            'thumbnail_width' => 'required|integer',
            'thumbnail_height' => 'required|integer',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value);
        }

        if ($request->expectsJson()) {
            return $this->success('Media settings updated successfully');
        }

        return redirect()->back()->with('success', 'Media settings updated successfully');
    }

    public function update(Request $request)
    {
        $settings = $request->input('settings', []);

        foreach ($settings as $key => $value) {
            Setting::set($key, $value);
        }

        if ($request->expectsJson()) {
            return $this->success('Settings updated successfully');
        }

        return redirect()->back()->with('success', 'Settings updated successfully');
    }

    public function get(Request $request, string $key)
    {
        $value = Setting::get($key);

        return $this->success('Setting retrieved successfully', [
            'key' => $key,
            'value' => $value
        ]);
    }

    public function set(Request $request)
    {
        $validated = $request->validate([
            'key' => 'required|string',
            'value' => 'required',
        ]);

        Setting::set($validated['key'], $validated['value']);

        return $this->success('Setting saved successfully');
    }
}
