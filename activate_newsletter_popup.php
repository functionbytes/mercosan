<?php

// Activar popup del newsletter
use Illuminate\Support\Facades\DB;

// Script para activar el popup del newsletter
$settings = [
    'newsletter_popup_enable' => '1',
    'newsletter_popup_title' => '¡Suscríbete a nuestro Boletín!',
    'newsletter_popup_subtitle' => 'Obtén las últimas noticias y ofertas especiales',
    'newsletter_popup_description' => 'Mantente informado con nuestras últimas actualizaciones, promociones exclusivas y contenido valioso directamente en tu bandeja de entrada.',
    'newsletter_popup_delay' => '3',
    'newsletter_popup_display_pages' => '["public.index","all"]',
];

echo "Activando popup del newsletter...\n";

foreach ($settings as $key => $value) {
    DB::table('settings')->updateOrInsert(
        ['key' => $key],
        [
            'key' => $key,
            'value' => $value,
            'created_at' => now(),
            'updated_at' => now(),
        ]
    );
    echo "✓ Configurado: $key = $value\n";
}

echo "¡Popup del newsletter activado exitosamente!\n";