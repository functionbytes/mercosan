<?php

return [
    'mode'             => env('WOMPI_MODE', 'sandbox'),
    'public_key'       => env('WOMPI_PUBLIC_KEY'),
    'integrity_secret' => env('WOMPI_INTEGRITY_SECRET'),
    'api_base_url'     => env('WOMPI_MODE', 'sandbox') === 'sandbox'
        ? 'https://sandbox.wompi.co/v1'
        : 'https://production.wompi.co/v1',
];
