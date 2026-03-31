<?php

namespace FunctionBytes\MercosanAdmin\Http\Controllers\System;

use FunctionBytes\MercosanAdmin\Http\Controllers\BaseController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

class CacheController extends BaseController
{
    public function index()
    {
        $cacheInfo = [
            'driver' => config('cache.default'),
            'prefix' => config('cache.prefix'),
        ];

        return view('mercosan-admin::system.cache', compact('cacheInfo'));
    }

    public function clear(Request $request)
    {
        $type = $request->input('type', 'all');

        $messages = [];

        switch ($type) {
            case 'application':
                Artisan::call('cache:clear');
                $messages[] = 'Application cache cleared successfully';
                break;

            case 'config':
                Artisan::call('config:clear');
                $messages[] = 'Configuration cache cleared successfully';
                break;

            case 'route':
                Artisan::call('route:clear');
                $messages[] = 'Route cache cleared successfully';
                break;

            case 'view':
                Artisan::call('view:clear');
                $messages[] = 'View cache cleared successfully';
                break;

            case 'all':
                Artisan::call('cache:clear');
                Artisan::call('config:clear');
                Artisan::call('route:clear');
                Artisan::call('view:clear');
                $messages[] = 'All caches cleared successfully';
                break;

            default:
                return $this->error('Invalid cache type');
        }

        if ($request->expectsJson()) {
            return $this->success(implode('. ', $messages));
        }

        return redirect()->back()->with('success', implode('. ', $messages));
    }

    public function optimize(Request $request)
    {
        Artisan::call('config:cache');
        Artisan::call('route:cache');
        Artisan::call('view:cache');

        $message = 'Application optimized successfully';

        if ($request->expectsJson()) {
            return $this->success($message);
        }

        return redirect()->back()->with('success', $message);
    }

    public function clearOptimize(Request $request)
    {
        Artisan::call('optimize:clear');

        $message = 'Optimization cache cleared successfully';

        if ($request->expectsJson()) {
            return $this->success($message);
        }

        return redirect()->back()->with('success', $message);
    }

    public function stats()
    {
        $stats = [
            'driver' => config('cache.default'),
            'prefix' => config('cache.prefix'),
            'memory_limit' => ini_get('memory_limit'),
            'max_execution_time' => ini_get('max_execution_time'),
        ];

        return $this->success('Cache statistics retrieved successfully', $stats);
    }

    public function test(Request $request)
    {
        $key = 'test_cache_key';
        $value = 'test_cache_value';

        try {
            Cache::put($key, $value, 60);
            $retrieved = Cache::get($key);

            if ($retrieved === $value) {
                Cache::forget($key);
                return $this->success('Cache is working correctly');
            } else {
                return $this->error('Cache test failed: value mismatch');
            }
        } catch (\Exception $e) {
            return $this->error('Cache test failed: ' . $e->getMessage());
        }
    }
}
