<?php

namespace FunctionBytes\MercosanAdmin\Http\Controllers;

use FunctionBytes\MercosanAdmin\Models\AuditHistory;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AuditLogController extends BaseController
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', config('mercosan-admin.pagination.per_page', 20));

        $logs = AuditHistory::with(['user', 'actor'])
            ->when($request->get('module'), function ($query, $module) {
                return $query->where('module', $module);
            })
            ->when($request->get('action'), function ($query, $action) {
                return $query->where('action', $action);
            })
            ->when($request->get('user_id'), function ($query, $userId) {
                return $query->where('user_id', $userId);
            })
            ->when($request->get('date_from'), function ($query, $dateFrom) {
                return $query->where('created_at', '>=', Carbon::parse($dateFrom));
            })
            ->when($request->get('date_to'), function ($query, $dateTo) {
                return $query->where('created_at', '<=', Carbon::parse($dateTo)->endOfDay());
            })
            ->when($request->get('search'), function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('module', 'like', "%{$search}%")
                      ->orWhere('action', 'like', "%{$search}%")
                      ->orWhere('reference_name', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        if ($request->expectsJson()) {
            return $this->success('Audit logs retrieved successfully', ['logs' => $logs]);
        }

        $modules = AuditHistory::distinct('module')->pluck('module');
        $actions = AuditHistory::distinct('action')->pluck('action');

        return view('mercosan-admin::audit-log.index', compact('logs', 'modules', 'actions'));
    }

    public function show(AuditHistory $auditLog)
    {
        $auditLog->load(['user', 'actor']);

        if (request()->expectsJson()) {
            return $this->success('Audit log retrieved successfully', ['log' => $auditLog]);
        }

        return view('mercosan-admin::audit-log.show', compact('auditLog'));
    }

    public function destroy(AuditHistory $auditLog)
    {
        $auditLog->delete();

        if (request()->expectsJson()) {
            return $this->success('Audit log deleted successfully');
        }

        return redirect()->route('mercosan-admin.audit-logs.index')
            ->with('success', 'Audit log deleted successfully');
    }

    public function bulkDelete(Request $request)
    {
        $ids = $request->input('ids', []);

        if (empty($ids)) {
            return $this->error('No logs selected');
        }

        AuditHistory::whereIn('id', $ids)->delete();

        return $this->success('Audit logs deleted successfully');
    }

    public function clean(Request $request)
    {
        $days = $request->input('days', config('mercosan-admin.audit_log.retention_days', 30));

        $count = AuditHistory::where('created_at', '<', Carbon::now()->subDays($days))->delete();

        return $this->success("Deleted {$count} old audit logs");
    }

    public function export(Request $request)
    {
        $logs = AuditHistory::with(['user', 'actor'])
            ->when($request->get('module'), function ($query, $module) {
                return $query->where('module', $module);
            })
            ->when($request->get('action'), function ($query, $action) {
                return $query->where('action', $action);
            })
            ->when($request->get('date_from'), function ($query, $dateFrom) {
                return $query->where('created_at', '>=', Carbon::parse($dateFrom));
            })
            ->when($request->get('date_to'), function ($query, $dateTo) {
                return $query->where('created_at', '<=', Carbon::parse($dateTo)->endOfDay());
            })
            ->orderBy('created_at', 'desc')
            ->get();

        $filename = 'audit-logs-' . now()->format('Y-m-d-His') . '.csv';
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ];

        $callback = function () use ($logs) {
            $file = fopen('php://output', 'w');

            fputcsv($file, ['ID', 'Module', 'Action', 'User', 'IP Address', 'User Agent', 'Reference Name', 'Created At']);

            foreach ($logs as $log) {
                fputcsv($file, [
                    $log->id,
                    $log->module,
                    $log->action,
                    $log->user_name,
                    $log->ip_address,
                    $log->user_agent,
                    $log->reference_name,
                    $log->created_at->format('Y-m-d H:i:s'),
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function stats()
    {
        $stats = [
            'total' => AuditHistory::count(),
            'today' => AuditHistory::whereDate('created_at', today())->count(),
            'this_week' => AuditHistory::whereBetween('created_at', [
                Carbon::now()->startOfWeek(),
                Carbon::now()->endOfWeek()
            ])->count(),
            'this_month' => AuditHistory::whereMonth('created_at', now()->month)->count(),
            'by_module' => AuditHistory::selectRaw('module, COUNT(*) as count')
                ->groupBy('module')
                ->pluck('count', 'module'),
            'by_action' => AuditHistory::selectRaw('action, COUNT(*) as count')
                ->groupBy('action')
                ->pluck('count', 'action'),
        ];

        return $this->success('Audit log statistics retrieved successfully', $stats);
    }
}
