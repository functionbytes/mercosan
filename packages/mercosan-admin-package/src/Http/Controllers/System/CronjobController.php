<?php

namespace FunctionBytes\MercosanAdmin\Http\Controllers\System;

use FunctionBytes\MercosanAdmin\Http\Controllers\BaseController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Http\Request;
use Illuminate\Console\Scheduling\Schedule;

class CronjobController extends BaseController
{
    public function index()
    {
        $jobs = $this->getScheduledJobs();

        if (request()->expectsJson()) {
            return $this->success('Cronjobs retrieved successfully', ['jobs' => $jobs]);
        }

        return view('mercosan-admin::system.cronjob', compact('jobs'));
    }

    public function run(Request $request)
    {
        $command = $request->input('command');

        if (empty($command)) {
            return $this->error('Command is required');
        }

        try {
            Artisan::call($command);
            $output = Artisan::output();

            return $this->success('Command executed successfully', ['output' => $output]);
        } catch (\Exception $e) {
            return $this->error('Command execution failed: ' . $e->getMessage());
        }
    }

    public function runScheduler(Request $request)
    {
        try {
            Artisan::call('schedule:run');
            $output = Artisan::output();

            return $this->success('Scheduler executed successfully', ['output' => $output]);
        } catch (\Exception $e) {
            return $this->error('Scheduler execution failed: ' . $e->getMessage());
        }
    }

    public function listCommands()
    {
        $commands = [];

        try {
            Artisan::call('list', ['--format' => 'json']);
            $output = Artisan::output();
            $data = json_decode($output, true);

            if (isset($data['commands'])) {
                foreach ($data['commands'] as $command) {
                    $commands[] = [
                        'name' => $command['name'],
                        'description' => $command['description'] ?? '',
                    ];
                }
            }
        } catch (\Exception $e) {
            // Fallback method
            $commands = [
                ['name' => 'cache:clear', 'description' => 'Flush the application cache'],
                ['name' => 'config:cache', 'description' => 'Create a cache file for faster configuration loading'],
                ['name' => 'route:cache', 'description' => 'Create a route cache file for faster route registration'],
                ['name' => 'view:cache', 'description' => 'Compile all of the application\'s Blade templates'],
                ['name' => 'queue:work', 'description' => 'Start processing jobs on the queue'],
            ];
        }

        return $this->success('Commands retrieved successfully', ['commands' => $commands]);
    }

    protected function getScheduledJobs(): array
    {
        $schedule = app(Schedule::class);
        $jobs = [];

        foreach ($schedule->events() as $event) {
            $jobs[] = [
                'command' => $event->command ?? $event->description,
                'expression' => $event->expression,
                'description' => $event->description ?? 'No description',
                'next_run' => $event->nextRunDate()->format('Y-m-d H:i:s'),
            ];
        }

        return $jobs;
    }

    public function testScheduler()
    {
        try {
            $schedule = app(Schedule::class);
            $events = $schedule->events();

            $info = [
                'total_jobs' => count($events),
                'jobs' => []
            ];

            foreach ($events as $event) {
                $info['jobs'][] = [
                    'command' => $event->command ?? $event->description,
                    'expression' => $event->expression,
                    'next_run' => $event->nextRunDate()->format('Y-m-d H:i:s'),
                ];
            }

            return $this->success('Scheduler is configured correctly', $info);
        } catch (\Exception $e) {
            return $this->error('Scheduler test failed: ' . $e->getMessage());
        }
    }
}
