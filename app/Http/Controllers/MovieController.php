<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function index()
    {
        $movies = Movie::orderBy('created_at', 'desc')->get();
        return view('movies.index', compact('movies'));
    }

    public function show(Movie $movie)
    {
        return view('movies.show', compact('movie'));
    }

    public function create()
    {
        return view('movies.create');
    }

    public function store(Request $request)
    {
        // Validation logic here

        $movie = new Movie;
        $movie->title = $request->title;
        $movie->description = $request->description;
        $movie->save();

        return redirect()->route('movies.index');
    }

    public function edit(Movie $movie)
    {
        return view('movies.edit', compact('movie'));
    }

    public function update(Request $request, Movie $movie)
    {
        // Validation logic here

        $movie->title = $request->title;
        $movie->description = $request->description;
        $movie->save();

        return redirect()->route('movies.index');
    }

    public function destroy(Movie $movie)
    {
        $movie->delete();
        return redirect()->route('movies.index');
    }
} 