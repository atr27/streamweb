<?php

namespace App\Http\Traits;

use Illuminate\Support\Facades\Auth;
use App\Models\UserSubscription;
use Carbon\Carbon;

trait WithAuthData
{
    protected function getAuthData()
    {
        $user = Auth::user();
        
        if (!$user) {
            return [
                'user' => null,
                'activePlan' => [
                    'name' => 'Free Plan',
                    'activeDay' => 0,
                    'remainingActiveDay' => 0,
                    'isPremium' => false
                ]
            ];
        }

        // Get user's subscription with subscription plan
        $activePlan = UserSubscription::with('subscriptionPlan')
            ->where('user_id', $user->id)
            ->where('status_payment', 'paid')
            ->where('expires_at', '>', now())
            ->latest()
            ->first();

        if (!$activePlan || !$activePlan->subscriptionPlan) {
            return [
                'user' => $user,
                'activePlan' => [
                    'name' => 'Free Plan',
                    'activeDay' => 0,
                    'remainingActiveDay' => 0,
                    'isPremium' => false
                ]
            ];
        }

        // Calculate total active days from creation to expiration
        $startDate = Carbon::parse($activePlan->created_at);
        $endDate = Carbon::parse($activePlan->expires_at);
        $activeDay = (int) $startDate->diffInDays($endDate);

        // Calculate remaining days from now to expiration
        $now = Carbon::now();
        $remainingActiveDay = (int) $now->diffInDays($endDate);

        // Ensure we don't exceed the total days
        $remainingActiveDay = min($remainingActiveDay, $activeDay);

        return [
            'user' => $user,
            'activePlan' => [
                'name' => $activePlan->subscriptionPlan->name,
                'activeDay' => $activeDay,
                'remainingActiveDay' => (int) max(0, $remainingActiveDay),
                'isPremium' => true
            ]
        ];
    }
}
