<?php

namespace FunctionBytes\MercosanAdmin\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Activation extends Model
{
    protected $table = 'activations';

    protected $fillable = [
        'user_id',
        'code',
        'completed',
        'completed_at',
    ];

    protected $casts = [
        'completed' => 'boolean',
        'completed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $activation): void {
            if (empty($activation->code)) {
                $activation->code = Str::random(40);
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(config('mercosan-admin.models.user', User::class));
    }

    public function complete(): bool
    {
        $this->completed = true;
        $this->completed_at = now();

        return $this->save();
    }

    public function scopeCompleted($query)
    {
        return $query->where('completed', true);
    }

    public function scopePending($query)
    {
        return $query->where('completed', false);
    }
}
