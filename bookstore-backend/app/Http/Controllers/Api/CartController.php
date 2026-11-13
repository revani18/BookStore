<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\CartItem;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cartItems = CartItem::with('book.author', 'book.genre')
            ->where('user_id', $request->user()->id)
            ->get();

        return response()->json($cartItems);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $book = Book::findOrFail($validated['book_id']);

        if ($book->stock < $validated['quantity']) {
            return response()->json([
                'message' => 'Stok buku tidak mencukupi.',
            ], 422);
        }

        $cartItem = CartItem::where('user_id', $request->user()->id)
            ->where('book_id', $book->id)
            ->first();

        if ($cartItem) {
            $newQuantity = $cartItem->quantity + $validated['quantity'];

            if ($book->stock < $newQuantity) {
                return response()->json([
                    'message' => 'Stok buku tidak mencukupi.',
                ], 422);
            }

            $cartItem->update(['quantity' => $newQuantity]);
        } else {
            $cartItem = CartItem::create([
                'user_id' => $request->user()->id,
                'book_id' => $book->id,
                'quantity' => $validated['quantity'],
            ]);
        }

        return response()->json([
            'message' => 'Buku berhasil ditambahkan ke keranjang.',
            'data' => $cartItem->load('book'),
        ], 201);
    }

    public function update(Request $request, CartItem $cartItem)
    {
        if ($cartItem->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Akses tidak diizinkan.',
            ], 403);
        }

        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        if ($cartItem->book->stock < $validated['quantity']) {
            return response()->json([
                'message' => 'Stok buku tidak mencukupi.',
            ], 422);
        }

        $cartItem->update($validated);

        return response()->json([
            'message' => 'Keranjang berhasil diperbarui.',
            'data' => $cartItem->load('book'),
        ]);
    }

    public function destroy(Request $request, CartItem $cartItem)
    {
        if ($cartItem->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Akses tidak diizinkan.',
            ], 403);
        }

        $cartItem->delete();

        return response()->json([
            'message' => 'Buku berhasil dihapus dari keranjang.',
        ]);
    }
}
