<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\GenreController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MidtransNotificationController;
use App\Http\Controllers\Api\ContactMessageController;

// API untuk pengunjung
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/contact-messages', [ContactMessageController::class, 'store']);

// Notifikasi pembayaran Midtrans
Route::post('/midtrans/notification', [MidtransNotificationController::class, 'handle']);

Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{book}', [BookController::class, 'show']);

Route::get('/genres', [GenreController::class, 'index']);
Route::get('/genres/{genre}', [GenreController::class, 'show']);

Route::get('/authors', [AuthorController::class, 'index']);
Route::get('/authors/{author}', [AuthorController::class, 'show']);

// API untuk pengguna yang sudah login
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);

    // Fitur customer
    Route::middleware('role:customer')->group(function () {
        Route::get('/cart', [CartController::class, 'index']);
        Route::post('/cart', [CartController::class, 'store']);
        Route::put('/cart/{cartItem}', [CartController::class, 'update']);
        Route::delete('/cart/{cartItem}', [CartController::class, 'destroy']);

        Route::post('/transactions', [TransactionController::class, 'store']);
        Route::get('/my-transactions', [TransactionController::class, 'index']);
        Route::get('/my-transactions/{transaction}', [TransactionController::class, 'show']);
    });

    // Fitur admin
    Route::middleware('role:admin')->group(function () {

        // Kelola penulis
        Route::post('/authors', [AuthorController::class, 'store']);
        Route::put('/authors/{author}', [AuthorController::class, 'update']);
        Route::delete('/authors/{author}', [AuthorController::class, 'destroy']);

        // Kelola kategori
        Route::post('/genres', [GenreController::class, 'store']);
        Route::put('/genres/{genre}', [GenreController::class, 'update']);
        Route::delete('/genres/{genre}', [GenreController::class, 'destroy']);

        // Kelola buku
        Route::post('/books', [BookController::class, 'store']);
        Route::put('/books/{book}', [BookController::class, 'update']);
        Route::delete('/books/{book}', [BookController::class, 'destroy']);

        // Kelola pelanggan
        Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/{user}', [UserController::class, 'show']);

        // Kelola pesanan
        Route::get('/transactions', [TransactionController::class, 'index']);
        Route::get('/transactions/{transaction}', [TransactionController::class, 'show']);
        Route::patch('/transactions/{transaction}/status', [TransactionController::class, 'updateStatus']);
        Route::patch('/transactions/{transaction}/payment-status', [TransactionController::class, 'confirmPayment']);

        // Kelola pesan kontak
        Route::get('/contact-messages', [ContactMessageController::class, 'index']);
        Route::get('/contact-messages/{contactMessage}', [ContactMessageController::class, 'show']);
    });
});
