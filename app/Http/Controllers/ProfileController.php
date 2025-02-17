<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Traits\WithAuthData;
use App\Models\UserSubscription;

class ProfileController extends Controller
{
    use WithAuthData;
    
    public function index()
    {
        $user = Auth::user();
        $user->load(['userSubscriptions' => function ($query) {
            $query->with('subscriptionPlan')
                  ->where('status_payment', 'paid')
                  ->where('expires_at', '>', now())
                  ->latest();
        }]);
        
        $authData = $this->getAuthData();
        
        $activeSubscription = $user->lastActiveUserSubscription;
        
        if ($activeSubscription) {
            $authData['activePlan'] = array_merge($authData['activePlan'], [
                'subscription_id' => $activeSubscription->id,
                'expires_at' => $activeSubscription->expires_at,
            ]);
        }
        
        return Inertia::render('Auth/User/Profile', [
            'auth' => $authData,
        ]);
    }
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:users,name,'.Auth::id()],
            'current_password' => ['required_with:new_password', 'current_password'],
            'new_password' => ['nullable', 'confirmed', Password::defaults()],
        ]);

        $user = Auth::user();
        $user->name = $validated['name'];
        
        if ($request->filled('new_password')) {
            $user->password = Hash::make($validated['new_password']);
        }

        $user->save();

        return redirect()->back()->with('message', 'Profile berhasil diperbarui');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
