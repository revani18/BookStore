<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Author;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(
            Author::with('books')->latest()->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'bio' => 'nullable|string',
            'photo' => 'nullable|string|max:255',
        ]);

        $author = Author::create($validated);

        return response()->json([
            'message' => 'Penulis berhasil ditambahkan.',
            'data' => $author,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Author $author)
    {
        return response()->json(
            $author->load('books')
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Author $author)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'bio' => 'nullable|string',
            'photo' => 'nullable|string|max:255',
        ]);

        $author->update($validated);

        return response()->json([
            'message' => 'Penulis berhasil diperbarui.',
            'data' => $author,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Author $author)
    {
        $author->delete();

        return response()->json([
            'message' => 'Penulis berhasil dihapus.',
        ]);
    }
}
