<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\MovieController;
use App\Http\Controllers\User\SubscriptionPlanController;

Route::redirect('/', '/login');

Route::middleware(['auth', 'role:user'])->prefix('dashboard')->name('user.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/movie/{movie:slug}', [MovieController::class, 'show'])->name('movie.show')->middleware('checkUserSubscription:true');
    Route::get('/subscription-plan', [SubscriptionPlanController::class, 'index'])->name('subscription.index')->middleware('checkUserSubscription:false');
    Route::post('/subscription-plan/{subscriptionPlan}/user-subscribe', [SubscriptionPlanController::class, 'userSubscribe'])->name('subscription.userSubscribe')->middleware('checkUserSubscription:false');
});

Route::prefix('auth')->name('auth.')->group(function () {
    route::get('/sign-in', function () {
        return Inertia::render('Auth/Login');
    })->name('sign-in');
    route::get('/sign-up', function () {
        return Inertia::render('Auth/Register');
    })->name('sign-up');
    route::get('/dashboard', function () {
        return Inertia::render('Auth/Dashboard');
    })->name('dashboard');
    route::get('/subscription', function () {
        return Inertia::render('Auth/Subscription');
    })->name('subscription');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

require __DIR__ . '/auth.php';
