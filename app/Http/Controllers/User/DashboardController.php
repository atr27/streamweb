<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Movie;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Dashboard', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'featuredMovies' => Movie::whereIsFeatured(true)->get(),
            'movies' => Movie::all(),
        ]);
    }
}
