<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\SubscriptionPlan;

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

    public function subscriptionPlan()
    {
        return $this->belongsTo(SubscriptionPlan::class);
    }
}
