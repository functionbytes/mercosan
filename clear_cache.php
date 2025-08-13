<?php

// Simple cache clearing script
echo "Clearing application cache...\n";

// Clear config cache if it exists
$configCache = __DIR__ . '/bootstrap/cache/config.php';
if (file_exists($configCache)) {
    unlink($configCache);
    echo "Config cache cleared.\n";
}

// Clear various cache directories
$cacheDirs = [
    'bootstrap/cache',
    'storage/framework/cache',
    'storage/framework/views',
    'storage/framework/sessions'
];

foreach ($cacheDirs as $dir) {
    $fullPath = __DIR__ . '/' . $dir;
    if (is_dir($fullPath)) {
        $files = glob($fullPath . '/*');
        foreach ($files as $file) {
            if (is_file($file) && basename($file) !== '.gitignore') {
                unlink($file);
            }
        }
    }
}

echo "Cache clearing completed.\n";
echo "Please reload your admin panel to see the new email template.\n";