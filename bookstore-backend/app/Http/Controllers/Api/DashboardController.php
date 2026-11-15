<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\Book;
use App\Models\Genre;
use App\Models\Transaction;
use App\Models\User;

class DashboardController extends Controller
{
    public function summary()
    {
        return response()->json([
            'data' => [
                'statistics' => [
                    'books' => Book::count(),
                    'genres' => Genre::count(),
                    'authors' => Author::count(),
                    'users' => User::where('role', 'customer')->count(),
                ],
                'transactions' => Transaction::query()
                    ->latest()
                    ->limit(5)
                    ->get([
                        'id',
                        'order_number',
                        'recipient_name',
                        'created_at',
                        'total_amount',
                        'order_status',
                        'payment_status',
                    ]),
            ],
        ]);
    }
}
