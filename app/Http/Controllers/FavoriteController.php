<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Traits\WithAuthData;
class FavoriteController extends Controller
{
    use WithAuthData;
    
    public function index()
    {
        $favorites = Favorite::with(['movie' => function($query) {
            $query->select('id', 'title', 'thumbnail', 'genre', 'rating', 'slug');
        }])
        ->where('user_id', Auth::user()->id)
        ->get();
        
        return Inertia::render('Auth/User/FavoriteMovies', [
            'auth' => $this->getAuthData(),
            'favorites' => $favorites,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $existing = Favorite::where('user_id', $request->user()->id)
                ->where('movie_id', $request->movie_id)
                ->first();

            if ($existing) {
                $existing->delete();
                return response()->json([
                    'message' => 'Film dihapus dari favorit',
                    'is_favorited' => false
                ], 200);
            }

            Favorite::create([
                'user_id' => $request->user()->id,
                'movie_id' => $request->movie_id
            ]);
            
            return response()->json([
                'message' => 'Film berhasil ditambahkan ke favorit',
                'is_favorited' => true
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan',
            ], 500);
        }
    }

    public function check(Request $request)
    {
        $isFavorited = Favorite::where('user_id', $request->user()->id)
            ->where('movie_id', $request->movie_id)
            ->exists();

        return response()->json([
            'is_favorited' => $isFavorited
        ]);
    }
}
