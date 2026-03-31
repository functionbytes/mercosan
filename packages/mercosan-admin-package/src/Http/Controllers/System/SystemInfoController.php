<?php

namespace FunctionBytes\MercosanAdmin\Http\Controllers\System;

use FunctionBytes\MercosanAdmin\Http\Controllers\BaseController;
use Illuminate\Support\Facades\DB;

class SystemInfoController extends BaseController
{
    public function index()
    {
        $info = $this->getSystemInfo();

        if (request()->expectsJson()) {
            return $this->success('System information retrieved successfully', $info);
        }

        return view('mercosan-admin::system.info', compact('info'));
    }

    protected function getSystemInfo(): array
    {
        return [
            'server' => $this->getServerInfo(),
            'php' => $this->getPhpInfo(),
            'laravel' => $this->getLaravelInfo(),
            'database' => $this->getDatabaseInfo(),
            'cache' => $this->getCacheInfo(),
            'queue' => $this->getQueueInfo(),
        ];
    }

    protected function getServerInfo(): array
    {
        return [
            'os' => PHP_OS,
            'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
            'server_protocol' => $_SERVER['SERVER_PROTOCOL'] ?? 'Unknown',
            'server_name' => $_SERVER['SERVER_NAME'] ?? 'Unknown',
            'server_address' => $_SERVER['SERVER_ADDR'] ?? 'Unknown',
            'server_port' => $_SERVER['SERVER_PORT'] ?? 'Unknown',
            'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'Unknown',
        ];
    }

    protected function getPhpInfo(): array
    {
        return [
            'version' => PHP_VERSION,
            'memory_limit' => ini_get('memory_limit'),
            'max_execution_time' => ini_get('max_execution_time'),
            'upload_max_filesize' => ini_get('upload_max_filesize'),
            'post_max_size' => ini_get('post_max_size'),
            'max_input_vars' => ini_get('max_input_vars'),
            'extensions' => get_loaded_extensions(),
        ];
    }

    protected function getLaravelInfo(): array
    {
        return [
            'version' => app()->version(),
            'environment' => app()->environment(),
            'debug_mode' => config('app.debug'),
            'url' => config('app.url'),
            'timezone' => config('app.timezone'),
            'locale' => config('app.locale'),
            'cache_driver' => config('cache.default'),
            'session_driver' => config('session.driver'),
            'queue_driver' => config('queue.default'),
        ];
    }

    protected function getDatabaseInfo(): array
    {
        try {
            $connection = DB::connection();
            $driverName = $connection->getDriverName();
            $databaseName = $connection->getDatabaseName();

            $info = [
                'driver' => $driverName,
                'database' => $databaseName,
                'connection' => 'Connected',
            ];

            if ($driverName === 'mysql') {
                $version = DB::select('SELECT VERSION() as version')[0]->version ?? 'Unknown';
                $info['version'] = $version;

                $tables = DB::select('SHOW TABLES');
                $info['tables_count'] = count($tables);
            } elseif ($driverName === 'pgsql') {
                $version = DB::select('SELECT version()')[0]->version ?? 'Unknown';
                $info['version'] = $version;

                $tables = DB::select("SELECT tablename FROM pg_tables WHERE schemaname = 'public'");
                $info['tables_count'] = count($tables);
            } else {
                $info['version'] = 'Unknown';
                $info['tables_count'] = 'Unknown';
            }

            return $info;
        } catch (\Exception $e) {
            return [
                'driver' => config('database.default'),
                'connection' => 'Failed: ' . $e->getMessage(),
            ];
        }
    }

    protected function getCacheInfo(): array
    {
        return [
            'driver' => config('cache.default'),
            'prefix' => config('cache.prefix'),
            'stores' => array_keys(config('cache.stores', [])),
        ];
    }

    protected function getQueueInfo(): array
    {
        return [
            'driver' => config('queue.default'),
            'connections' => array_keys(config('queue.connections', [])),
        ];
    }

    public function phpinfo()
    {
        if (!auth()->user()->isSuperUser()) {
            return $this->forbidden('Only super users can view PHP info');
        }

        ob_start();
        phpinfo();
        $phpinfo = ob_get_clean();

        return response($phpinfo)->header('Content-Type', 'text/html');
    }

    public function checkRequirements()
    {
        $requirements = [
            'php_version' => [
                'required' => '8.1.0',
                'current' => PHP_VERSION,
                'status' => version_compare(PHP_VERSION, '8.1.0', '>='),
            ],
            'extensions' => [],
        ];

        $requiredExtensions = [
            'openssl',
            'pdo',
            'mbstring',
            'tokenizer',
            'xml',
            'ctype',
            'json',
            'bcmath',
            'fileinfo',
        ];

        foreach ($requiredExtensions as $extension) {
            $requirements['extensions'][$extension] = [
                'required' => true,
                'installed' => extension_loaded($extension),
            ];
        }

        return $this->success('Requirements checked successfully', $requirements);
    }
}
