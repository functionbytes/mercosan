<?php

namespace FunctionBytes\MercosanAdmin\Http\Controllers\Theme;

use FunctionBytes\MercosanAdmin\Http\Controllers\BaseController;
use FunctionBytes\MercosanAdmin\Models\Setting;
use Illuminate\Http\Request;

class ThemeController extends BaseController
{
    public function index()
    {
        $currentTheme = Setting::get('active_theme', 'default');
        $themeMode = Setting::get('theme_mode', 'light');

        $availableThemes = $this->getAvailableThemes();

        if (request()->expectsJson()) {
            return $this->success('Theme settings retrieved successfully', [
                'current_theme' => $currentTheme,
                'theme_mode' => $themeMode,
                'available_themes' => $availableThemes,
            ]);
        }

        return view('mercosan-admin::theme.index', compact('currentTheme', 'themeMode', 'availableThemes'));
    }

    public function activate(Request $request)
    {
        $validated = $request->validate([
            'theme' => 'required|string',
        ]);

        $theme = $validated['theme'];

        if (!$this->themeExists($theme)) {
            return $this->error('Theme does not exist');
        }

        Setting::set('active_theme', $theme);

        if ($request->expectsJson()) {
            return $this->success('Theme activated successfully');
        }

        return redirect()->back()->with('success', 'Theme activated successfully');
    }

    public function toggleMode(Request $request)
    {
        $validated = $request->validate([
            'mode' => 'required|in:light,dark',
        ]);

        Setting::set('theme_mode', $validated['mode']);

        if ($request->expectsJson()) {
            return $this->success('Theme mode updated successfully');
        }

        return redirect()->back()->with('success', 'Theme mode updated successfully');
    }

    public function customize(Request $request)
    {
        $settings = [
            'primary_color' => Setting::get('theme_primary_color', '#3490dc'),
            'secondary_color' => Setting::get('theme_secondary_color', '#ffed4e'),
            'sidebar_bg' => Setting::get('theme_sidebar_bg', '#ffffff'),
            'header_bg' => Setting::get('theme_header_bg', '#ffffff'),
            'font_family' => Setting::get('theme_font_family', 'Inter, sans-serif'),
            'font_size' => Setting::get('theme_font_size', '14px'),
        ];

        return view('mercosan-admin::theme.customize', compact('settings'));
    }

    public function updateCustomization(Request $request)
    {
        $validated = $request->validate([
            'primary_color' => 'nullable|string',
            'secondary_color' => 'nullable|string',
            'sidebar_bg' => 'nullable|string',
            'header_bg' => 'nullable|string',
            'font_family' => 'nullable|string',
            'font_size' => 'nullable|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set("theme_{$key}", $value);
        }

        if ($request->expectsJson()) {
            return $this->success('Theme customization updated successfully');
        }

        return redirect()->back()->with('success', 'Theme customization updated successfully');
    }

    public function resetCustomization(Request $request)
    {
        $keys = [
            'theme_primary_color',
            'theme_secondary_color',
            'theme_sidebar_bg',
            'theme_header_bg',
            'theme_font_family',
            'theme_font_size',
        ];

        foreach ($keys as $key) {
            Setting::forget($key);
        }

        if ($request->expectsJson()) {
            return $this->success('Theme customization reset successfully');
        }

        return redirect()->back()->with('success', 'Theme customization reset successfully');
    }

    protected function getAvailableThemes(): array
    {
        return [
            [
                'name' => 'default',
                'title' => 'Default Theme',
                'description' => 'Clean and modern default theme',
                'preview' => asset('vendor/mercosan-admin/images/themes/default.png'),
            ],
            [
                'name' => 'dark',
                'title' => 'Dark Theme',
                'description' => 'Dark mode optimized theme',
                'preview' => asset('vendor/mercosan-admin/images/themes/dark.png'),
            ],
            [
                'name' => 'minimal',
                'title' => 'Minimal Theme',
                'description' => 'Minimalist clean theme',
                'preview' => asset('vendor/mercosan-admin/images/themes/minimal.png'),
            ],
        ];
    }

    protected function themeExists(string $theme): bool
    {
        $themes = $this->getAvailableThemes();

        foreach ($themes as $t) {
            if ($t['name'] === $theme) {
                return true;
            }
        }

        return false;
    }

    public function export()
    {
        $settings = Setting::where('key', 'like', 'theme_%')->get();

        $themeConfig = [];
        foreach ($settings as $setting) {
            $themeConfig[$setting->key] = $setting->value;
        }

        $filename = 'theme-config-' . now()->format('Y-m-d-His') . '.json';

        return response()->json($themeConfig)
            ->header('Content-Type', 'application/json')
            ->header('Content-Disposition', "attachment; filename=\"{$filename}\"");
    }

    public function import(Request $request)
    {
        $validated = $request->validate([
            'config' => 'required|json',
        ]);

        $config = json_decode($validated['config'], true);

        foreach ($config as $key => $value) {
            if (str_starts_with($key, 'theme_')) {
                Setting::set($key, $value);
            }
        }

        return $this->success('Theme configuration imported successfully');
    }
}
