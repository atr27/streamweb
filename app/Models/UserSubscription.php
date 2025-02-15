<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;
use App\Models\SubscriptionPlan;
use App\Models\User;

class UserSubscription extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'user_subscriptions';
    
    protected $fillable = [
        'user_id', 
        'subscription_plan_id', 
        'price', 
        'expires_at', 
        'status_payment', 
        'token'
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'price' => 'float',
    ];

    /**
     * Get the subscription plan associated with this subscription
     */
    public function subscriptionPlan(): BelongsTo
    {
        return $this->belongsTo(SubscriptionPlan::class);
    }

    /**
     * Get the user that owns this subscription
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if the subscription is active
     */
    public function isActive(): bool
    {
        return $this->status_payment === 'paid' 
            && Carbon::now()->lessThanOrEqualTo($this->expires_at);
    }

    /**
     * Get remaining days until expiration
     */
    public function getRemainingDays(): int
    {
        if (!$this->expires_at) {
            return 0;
        }

        return max(0, Carbon::now()->diffInDays($this->expires_at, false));
    }
}
