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

        // Dapatkan langganan pengguna dengan rencana langganan
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

        // Hitung total hari aktif dari pembuatan hingga kedaluwarsa
        $startDate = Carbon::parse($activePlan->created_at);
        $endDate = Carbon::parse($activePlan->expires_at);
        $activeDay = (int) $startDate->diffInDays($endDate);

        // Hitung sisa hari dari sekarang hingga kedaluwarsa
        $now = Carbon::now();
        $remainingActiveDay = (int) $now->diffInDays($endDate);

        // Pastikan tidak melebihi total hari
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
