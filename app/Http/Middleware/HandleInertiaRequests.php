<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Http\Traits\WithAuthData;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use App\Models\UserSubscription;

class HandleInertiaRequests extends Middleware
{
    use WithAuthData;

    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    private function activePlan()
    {
        $user = Auth::user();
        
        // Debug log untuk melihat user
        Log::info('User Data:', ['user' => $user]);

        if (!$user) {
            return [
                'name' => 'Free Plan',
                'activeDay' => 0,
                'remainingActiveDay' => 0,
                'isPremium' => false
            ];
        }

        // Get user's subscription with subscription plan
        $activePlan = UserSubscription::with('subscriptionPlan')
            ->where('user_id', $user->id)
            ->where('status_payment', 'paid')
            ->where('expires_at', '>', now())
            ->latest()
            ->first();

        // Debug log untuk melihat data subscription
        Log::info('Active Plan Data:', [
            'user_id' => $user->id,
            'subscription' => $activePlan,
            'subscription_plan' => $activePlan?->subscriptionPlan
        ]);

        if (!$activePlan || !$activePlan->subscriptionPlan) {
            Log::info('No active plan or subscription plan found');
            return [
                'name' => 'Free Plan',
                'activeDay' => 0,
                'remainingActiveDay' => 0,
                'isPremium' => false
            ];
        }

        // Hitung total hari aktif berdasarkan durasi plan
        $activeDay = (int) ($activePlan->subscriptionPlan->duration_in_months * 30);
        
        // Hitung sisa hari dari tanggal expires_at
        $lastDay = Carbon::parse($activePlan->expires_at);
        $remainingActiveDay = now()->diffInDays($lastDay);

        $planData = [
            'name' => $activePlan->subscriptionPlan->name,
            'activeDay' => $activeDay,
            'remainingActiveDay' => max(0, $remainingActiveDay),
            'isPremium' => true
        ];

        Log::info('Final Plan Data:', $planData);

        return $planData;
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        // Get active plan data
        $activePlan = $this->activePlan();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'activePlan' => $activePlan
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ];
    }
}
