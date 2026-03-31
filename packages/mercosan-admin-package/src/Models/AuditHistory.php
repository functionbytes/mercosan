<?php

namespace FunctionBytes\MercosanAdmin\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\MassPrunable;
use Carbon\Carbon;

class AuditHistory extends Model
{
    use MassPrunable;

    protected $table = 'audit_histories';

    protected $fillable = [
        'user_agent',
        'ip_address',
        'module',
        'action',
        'user_id',
        'user_type',
        'actor_id',
        'actor_type',
        'reference_id',
        'reference_name',
        'type',
        'request',
    ];

    protected $casts = [
        'request' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user(): MorphTo
    {
        return $this->morphTo();
    }

    public function actor(): MorphTo
    {
        return $this->morphTo('actor');
    }

    public function getUserNameAttribute(): string
    {
        if (!$this->user_type || !class_exists($this->user_type)) {
            return 'System';
        }

        if (!$this->user) {
            return 'System';
        }

        return $this->user->name ?? 'Unknown';
    }

    public function getActorNameAttribute(): string
    {
        if (!$this->actor_type || !class_exists($this->actor_type)) {
            return 'System';
        }

        if (!$this->actor) {
            return 'System';
        }

        return $this->actor->name ?? 'Unknown';
    }

    public function getUserTypeLabelAttribute(): string
    {
        if (!$this->user_type || !class_exists($this->user_type)) {
            return 'System';
        }

        return match ($this->user_type) {
            User::class => 'Admin',
            default => 'System',
        };
    }

    public function prunable()
    {
        $days = config('mercosan-admin.audit_log.retention_days', 30);

        if ($days === 0) {
            return $this->query()->where('id', '<', 0);
        }

        return $this->query()->where('created_at', '<', Carbon::now()->subDays($days));
    }

    public function scopeByModule($query, string $module)
    {
        return $query->where('module', $module);
    }

    public function scopeByAction($query, string $action)
    {
        return $query->where('action', $action);
    }

    public function scopeByUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }
}
