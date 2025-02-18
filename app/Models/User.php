<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Check if user has an active subscription
     */
    public function getIsActiveAttribute(): bool
    {
        $subscription = $this->lastActiveUserSubscription;
        if (!$subscription) {
            return false;
        }

        return Carbon::now()->lessThanOrEqualTo(Carbon::parse($subscription->expires_at));
    }

    /**
     * Get the user's last active subscription
     */
    public function lastActiveUserSubscription(): HasOne
    {
        return $this->hasOne(UserSubscription::class)
            ->where('status_payment', 'paid')
            ->where('expires_at', '>', now())
            ->latest()
            ->with('subscriptionPlan'); // Always eager load the subscription plan
    }

    /**
     * Get all user subscriptions
     */
    public function userSubscriptions()
    {
        return $this->hasMany(UserSubscription::class);
    }

    public function getLastActiveUserSubscriptionAttribute()
    {
        return $this->userSubscriptions()
            ->with('subscriptionPlan')
            ->where('status_payment', 'paid')
            ->where('expires_at', '>', now())
            ->latest()
            ->first();
    }
}
