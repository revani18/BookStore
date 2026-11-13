<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Book::with(['author', 'genre']);

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('isbn', 'like', "%{$search}%")
                    ->orWhereHas('author', function ($author) use ($search) {
                        $author->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('genre', function ($genre) use ($search) {
                        $genre->where('name', 'like', "%{$search}%");
                    });
            });
        }

        return response()->json($query->latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'author_id' => 'required|exists:authors,id',
            'genre_id' => 'required|exists:genres,id',
            'title' => 'required|string|max:200',
            'isbn' => 'nullable|string|max:30|unique:books,isbn',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'cover_image' => 'nullable|string|max:255',
        ]);

        $book = Book::create($validated);

        return response()->json([
            'message' => 'Buku berhasil ditambahkan.',
            'data' => $book->load(['author', 'genre']),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        return response()->json(
            $book->load(['author', 'genre'])
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'author_id' => 'required|exists:authors,id',
            'genre_id' => 'required|exists:genres,id',
            'title' => 'required|string|max:200',
            'isbn' => 'nullable|string|max:30|unique:books,isbn,' . $book->id,
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'cover_image' => 'nullable|string|max:255',
        ]);

        $book->update($validated);

        return response()->json([
            'message' => 'Buku berhasil diperbarui.',
            'data' => $book->load(['author', 'genre']),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();

        return response()->json([
            'message' => 'Buku berhasil dihapus.',
        ]);
    }
}
