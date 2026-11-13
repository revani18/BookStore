<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Genre;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(
            Genre::with('books')->latest()->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:genres,name',
            'description' => 'nullable|string',
        ]);

        $genre = Genre::create($validated);

        return response()->json([
            'message' => 'Kategori berhasil ditambahkan.',
            'data' => $genre,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Genre $genre)
    {
        return response()->json(
            $genre->load('books')
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Genre $genre)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:genres,name,' . $genre->id,
            'description' => 'nullable|string',
        ]);

        $genre->update($validated);

        return response()->json([
            'message' => 'Kategori berhasil diperbarui.',
            'data' => $genre,
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Genre $genre)
    {
        $genre->delete();

        return response()->json([
            'message' => 'Kategori berhasil dihapus.',
        ]);
    }
}
