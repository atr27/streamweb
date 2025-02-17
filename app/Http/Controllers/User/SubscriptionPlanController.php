<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SubscriptionPlan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\UserSubscription;
use Carbon\Carbon;
use App\Http\Traits\WithAuthData;

class SubscriptionPlanController extends Controller
{
    use WithAuthData;

    public function index()
    {
        return Inertia::render('Auth/Subscription/Index', [
            'auth' => $this->getAuthData(),
            'subscriptionPlans' => SubscriptionPlan::all(),
        ]);
    }

    public function userSubscribe(Request $request, SubscriptionPlan $subscriptionPlan)
    {
       $data = [
         'user_id' => Auth::id(),
         'subscription_plan_id' => $subscriptionPlan->id,
         'price' => $subscriptionPlan->price,
         'expires_at' => Carbon::now()->addMonths($subscriptionPlan->duration_in_months),
         'status_payment' => 'paid',
       ];

       $userSubscription = UserSubscription::create($data);

       return redirect()->route('user.dashboard')->with('success', 'Berlangganan berhasil!');
    }

    public function cancel(UserSubscription $userSubscription)
    {
        $userSubscription->status_payment = 'unpaid';
        $userSubscription->save();
        return redirect()->route('user.dashboard')->with('success', 'Langganan berhasil dibatalkan!');
    }
}
