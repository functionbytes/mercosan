<?php

// Script temporal para activar el plugin de CAPTCHA
// Ejecutar con: php activate_captcha_plugin.php

require_once 'bootstrap/app.php';

use Illuminate\Support\Facades\DB;

$app = require_once 'bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

try {
    // Insertar el plugin CAPTCHA en la tabla de plugins activos
    $pluginData = [
        'name' => 'captcha',
        'status' => 1,
        'created_at' => now(),
        'updated_at' => now(),
    ];

    // Verificar si existe la tabla plugins
    if (Schema::hasTable('plugins')) {
        // Si existe, insertar o actualizar
        DB::table('plugins')->updateOrInsert(
            ['name' => 'captcha'],
            $pluginData
        );
        echo "Plugin CAPTCHA activado en tabla 'plugins'\n";
    } else {
        echo "Tabla 'plugins' no existe, verificando activación automática\n";
    }

    // También podemos intentar crear la configuración directamente
    $settingsData = [
        [
            'key' => 'enable_captcha',
            'value' => '1',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'key' => 'captcha_type',
            'value' => 'v3',
            'created_at' => now(),
            'updated_at' => now(),
        ],
    ];

    foreach ($settingsData as $setting) {
        DB::table('settings')->updateOrInsert(
            ['key' => $setting['key']],
            $setting
        );
    }

    echo "Configuración básica de CAPTCHA creada\n";
    echo "Plugin CAPTCHA habilitado exitosamente\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}