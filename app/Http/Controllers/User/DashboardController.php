<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Movie;
use App\Http\Traits\WithAuthData;

class DashboardController extends Controller
{
    use WithAuthData;

    public function index()
    {
        return Inertia::render('Auth/Dashboard', [
            'auth' => $this->getAuthData(),
            'featuredMovies' => Movie::whereIsFeatured(true)->get(),
            'movies' => Movie::all(),
            'flash' => [
                'message' => session('success')
            ],
        ]);
    }
}
