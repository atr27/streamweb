<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/','/auth/sign-in');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('auth')->name('auth.')->group(function () {
    Route::get('/sign-in', function () {
        return Inertia::render('Auth/Login');
    })->name('sign-in');
    Route::post('/sign-in', function () {
        return Inertia::render('Auth/Login');
    })->name('sign-in.store');
    Route::get('/sign-up', function () {
        return Inertia::render('Auth/Register');
    })->name('sign-up');
    Route::post('/sign-up', function () {
        return Inertia::render('Auth/Register');
    })->name('sign-up.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
