<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Book;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // Menampilkan semua buku dan fitur pencarian
    public function index(Request $request)
    {
        if ($request->boolean('summary')) {
            $query = Book::query()
                ->select([
                    'id',
                    'author_id',
                    'genre_id',
                    'title',
                    'isbn',
                    'price',
                    'stock',
                    'cover_image',
                    'created_at',
                ])
                ->with([
                    'author:id,name',
                    'genre:id,name',
                ]);
        } else {
            $query = Book::with(['author', 'genre']);
        }

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
    // Menambahkan buku
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
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')
                ->store('books', 'public');
        }

        $book = Book::create($validated);

        return response()->json([
            'message' => 'Buku berhasil ditambahkan.',
            'data' => $book->load(['author', 'genre']),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    // Menampilkan detail buku
    public function show(Book $book)
    {
        return response()->json(
            $book->load(['author', 'genre'])
        );
    }

    /**
     * Update the specified resource in storage.
     */
    // Memperbarui buku
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
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('cover_image')) {
            if ($book->cover_image) {
                Storage::disk('public')->delete($book->cover_image);
            }

            $validated['cover_image'] = $request->file('cover_image')
                ->store('books', 'public');
        }

        $book->update($validated);

        return response()->json([
            'message' => 'Buku berhasil diperbarui.',
            'data' => $book->load(['author', 'genre']),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    // Menghapus buku
    public function destroy(Book $book)
    {
        if ($book->cover_image) {
            Storage::disk('public')->delete($book->cover_image);
        }

        $book->delete();

        return response()->json([
            'message' => 'Buku berhasil dihapus.',
        ]);
    }

}
