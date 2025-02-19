<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Movie;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class MovieController extends Controller
{
    public function show(Movie $movie)
    {
        return Inertia::render('Auth/Movie/Show', [
            'movie' => $movie,
        ]);
    }

    public function browse(Request $request)
    {
        $query = $request->query('query');
        
        // Buat query builder terlebih dahulu
        $moviesQuery = Movie::when($query, function($q) use ($query) {
            $searchTerm = '%' . trim(strtolower($query)) . '%';
            return $q->where(function($subQuery) use ($searchTerm) {
                $subQuery->whereRaw('LOWER(title) LIKE ?', [$searchTerm])
                         ->orWhereRaw('LOWER(genre) LIKE ?', [$searchTerm]);
            });
        })
        ->orderBy('created_at', 'DESC');

        // Debug query sebelum dieksekusi
        Log::info('Search Term: ' . $query);
        Log::info('SQL Query: ' . $moviesQuery->toSql());
        Log::info('SQL Bindings: ', $moviesQuery->getBindings());

        // Eksekusi query
        $movies = $moviesQuery->get();
        Log::info('Results Count: ' . $movies->count());

        return Inertia::render('Auth/User/Browse', [
            'movies' => $movies,
            'query' => $request->query('query')
        ]);
    }
}
