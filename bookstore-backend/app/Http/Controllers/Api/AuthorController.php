<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Author;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // Menampilkan semua penulis
    public function index()
    {
        return response()->json(
            Author::latest()->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    // Menambahkan penulis
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'bio' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')
                ->store('authors', 'public');
        }

        $author = Author::create($validated);

        return response()->json([
            'message' => 'Penulis berhasil ditambahkan.',
            'data' => $author,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    // Menampilkan detail penulis
    public function show(Author $author)
    {
        return response()->json(
            $author->load('books')
        );
    }

    /**
     * Update the specified resource in storage.
     */
    // Memperbarui penulis
    public function update(Request $request, Author $author)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'bio' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            if ($author->photo) {
                Storage::disk('public')->delete($author->photo);
            }

            $validated['photo'] = $request->file('photo')
                ->store('authors', 'public');
        }

        $author->update($validated);

        return response()->json([
            'message' => 'Penulis berhasil diperbarui.',
            'data' => $author,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    // Menghapus penulis
    public function destroy(Author $author)
    {
        if ($author->photo) {
            Storage::disk('public')->delete($author->photo);
        }

        $author->delete();

        return response()->json([
            'message' => 'Penulis berhasil dihapus.',
        ]);
    }
}
