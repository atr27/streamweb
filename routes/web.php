<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\MovieController;
use App\Http\Controllers\User\SubscriptionPlanController;
use App\Http\Controllers\FavoriteController;


Route::redirect('/', '/login');

Route::middleware(['auth', 'role:user'])->prefix('dashboard')->name('user.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/movie/{movie:slug}', [MovieController::class, 'show'])->name('movie.show')->middleware('checkUserSubscription:true');
    Route::get('/browse', [MovieController::class, 'browse'])->name('browse');
    Route::get('/subscription-plan', [SubscriptionPlanController::class, 'index'])->name('subscription.index')->middleware('checkUserSubscription:false');
    Route::post('/subscription-plan/{subscriptionPlan}/user-subscribe', [SubscriptionPlanController::class, 'userSubscribe'])->name('subscription.userSubscribe')->middleware('checkUserSubscription:false');
    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/favorites', [FavoriteController::class, 'store'])->name('favorites.store');
    Route::get('/favorites/check', [FavoriteController::class, 'check'])->name('favorites.check');
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/subscription/cancel/{userSubscription}', [ProfileController::class, 'cancelSubscription'])->name('subscription.cancel');
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

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

require __DIR__ . '/auth.php';
