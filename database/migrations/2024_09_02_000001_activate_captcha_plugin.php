<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

return new class extends Migration
{
    public function up(): void
    {
        // Activar el plugin CAPTCHA si existe la tabla plugins
        if (Schema::hasTable('plugins')) {
            DB::table('plugins')->updateOrInsert(
                ['name' => 'captcha'],
                [
                    'name' => 'captcha',
                    'status' => 1,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]
            );
        }

        // Configurar settings básicos para CAPTCHA
        $settings = [
            'enable_captcha' => '1',
            'captcha_type' => 'v3',
            'captcha_site_key' => '',
            'captcha_secret' => '',
            'captcha_hide_badge' => '0',
            'enable_recaptcha_botble_newsletter_forms_fronts_newsletter_form' => '1',
        ];

        foreach ($settings as $key => $value) {
            DB::table('settings')->updateOrInsert(
                ['key' => $key],
                [
                    'key' => $key,
                    'value' => $value,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]
            );
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('plugins')) {
            DB::table('plugins')->where('name', 'captcha')->delete();
        }

        $settingsToRemove = [
            'enable_captcha',
            'captcha_type',
            'captcha_site_key',
            'captcha_secret',
            'captcha_hide_badge',
            'enable_recaptcha_botble_newsletter_forms_fronts_newsletter_form',
        ];

        DB::table('settings')->whereIn('key', $settingsToRemove)->delete();
    }
};