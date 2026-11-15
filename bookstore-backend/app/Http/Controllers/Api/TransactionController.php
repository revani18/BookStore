<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Models\Book;
use App\Models\CartItem;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $query = Transaction::query()
            ->select([
                'id',
                'user_id',
                'order_number',
                'recipient_name',
                'total_amount',
                'order_status',
                'payment_status',
                'created_at',
            ])
            ->withCount('items');

        if ($user->role === 'customer') {
            $query->where('user_id', $user->id);
        } else {
            $query->with('user:id,email');
        }

        return response()->json($query->latest()->get());
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'recipient_name' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'shipping_address' => 'required|string',
            'city' => 'required|string|max:100',
            'province' => 'required|string|max:100',
            'postal_code' => 'required|string|max:10',
        ]);

        $user = $request->user();

        $cartItems = CartItem::with('book')
            ->where('user_id', $user->id)
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json([
                'message' => 'Keranjang belanja masih kosong.',
            ], 422);
        }

        foreach ($cartItems as $item) {
            if ($item->quantity > $item->book->stock) {
                return response()->json([
                    'message' => 'Stok buku ' . $item->book->title . ' tidak mencukupi.',
                ], 422);
            }
        }

        try {
            $transaction = DB::transaction(function () use ($cartItems, $validated, $user) {
                $subtotal = 0;

                foreach ($cartItems as $item) {
                    $subtotal += $item->book->price * $item->quantity;
                }

                $shippingCost = 0;

                $transaction = Transaction::create([
                    'user_id' => $user->id,
                    'order_number' => 'BS-' . strtoupper(Str::random(10)),
                    'recipient_name' => $validated['recipient_name'],
                    'phone' => $validated['phone'],
                    'shipping_address' => $validated['shipping_address'],
                    'city' => $validated['city'],
                    'province' => $validated['province'],
                    'postal_code' => $validated['postal_code'],
                    'subtotal' => $subtotal,
                    'shipping_cost' => $shippingCost,
                    'total_amount' => $subtotal + $shippingCost,
                ]);

                $itemDetails = [];

                foreach ($cartItems as $item) {
                    $price = (int) round($item->book->price);
                    $itemSubtotal = $price * $item->quantity;

                    $transaction->items()->create([
                        'book_id' => $item->book_id,
                        'quantity' => $item->quantity,
                        'price' => $price,
                        'subtotal' => $itemSubtotal,
                    ]);

                    $itemDetails[] = [
                        'id' => (string) $item->book_id,
                        'price' => $price,
                        'quantity' => $item->quantity,
                        'name' => substr($item->book->title, 0, 50),
                    ];

                    Book::whereKey($item->book_id)
                        ->decrement('stock', $item->quantity);
                }

                $resultUrl = rtrim(config('midtrans.frontend_url'), '/')
                    . '/payment/result?transaction_id=' . $transaction->id;

                $params = [
                    'callbacks' => [
                        'finish' => $resultUrl,
                        'pending' => $resultUrl,
                        'error' => $resultUrl,
                    ],

                    'enabled_payments' => [
                        'other_qris',
                        'bank_transfer',
                    ],

                    'callbacks' => [
                        'finish' => rtrim(config('midtrans.frontend_url'), '/')
                            . '/payment/result?transaction_id=' . $transaction->id,
                    ],

                    'transaction_details' => [
                        'order_id' => $transaction->order_number,
                        'gross_amount' => (int) round($transaction->total_amount),
                    ],

                    'item_details' => $itemDetails,
                    'customer_details' => [
                        'first_name' => $validated['recipient_name'],
                        'email' => $user->email,
                        'phone' => $validated['phone'],
                        'shipping_address' => [
                            'first_name' => $validated['recipient_name'],
                            'phone' => $validated['phone'],
                            'address' => $validated['shipping_address'],
                            'city' => $validated['city'],
                            'postal_code' => $validated['postal_code'],
                            'country_code' => 'IDN',
                        ],
                    ],
                ];

                $snap = \Midtrans\Snap::createTransaction($params);

                $transaction->update([
                    'snap_token' => $snap->token,
                    'payment_url' => $snap->redirect_url,
                ]);

                CartItem::where('user_id', $user->id)->delete();

                return $transaction->load('items.book');
            });

            return response()->json([
                'message' => 'Pesanan berhasil dibuat. Silakan lanjutkan pembayaran.',
                'data' => $transaction,
            ], 201);
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error(
                'Midtrans checkout error: ' . $e->getMessage()
            );

            return response()->json([
                'message' => 'Pesanan gagal diproses. Silakan coba kembali.',
            ], 500);
        }
    }



    public function show(Request $request, Transaction $transaction)
    {
        // Memastikan customer hanya bisa melihat transaksi miliknya.
        if (
            $request->user()->role === 'customer' &&
            (int) $transaction->user_id !== (int) $request->user()->id
        ) {
            return response()->json([
                'message' => 'Akses tidak diizinkan.',
            ], 403);
        }

        // Periksa status terbaru langsung ke Midtrans.
        if (
            $transaction->payment_status === 'pending' &&
            $transaction->snap_token
        ) {
            try {
                $status = \Midtrans\Transaction::status(
                    $transaction->order_number
                );

                $transactionStatus = $status->transaction_status ?? null;
                $fraudStatus = $status->fraud_status ?? null;

                if (
                    $transactionStatus === 'settlement' ||
                    (
                        $transactionStatus === 'capture' &&
                        $fraudStatus === 'accept'
                    )
                ) {
                    $transaction->payment_status = 'paid';
                    $transaction->paid_at = now();
                } elseif ($transactionStatus === 'pending') {
                    $transaction->payment_status = 'pending';
                } elseif ($transactionStatus === 'expire') {
                    $transaction->payment_status = 'expired';
                } elseif (
                    in_array($transactionStatus, [
                        'deny',
                        'cancel',
                        'failure',
                    ])
                ) {
                    $transaction->payment_status = 'failed';
                }

                $transaction->midtrans_transaction_id =
                    $status->transaction_id ??
                    $transaction->midtrans_transaction_id;

                $transaction->save();
            } catch (\Throwable $e) {
                Log::warning('Gagal memeriksa status Midtrans', [
                    'order_number' => $transaction->order_number,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        return response()->json(
            $transaction->load('items.book', 'user')
        );
    }


    public function updateStatus(Request $request, Transaction $transaction)
    {
        $validated = $request->validate([
            'order_status' => 'required|in:pending,processing,shipped,completed,cancelled',
        ]);

        $transaction->update($validated);

        return response()->json([
            'message' => 'Status pesanan berhasil diperbarui.',
            'data' => $transaction,
        ]);
    }

    public function confirmPayment(Transaction $transaction)
    {
        $transaction = DB::transaction(function () use ($transaction) {
            $transaction = Transaction::whereKey($transaction->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($transaction->payment_status !== 'pending') {
                return null;
            }

            $transaction->payment_status = 'paid';
            $transaction->paid_at = now();
            $transaction->save();

            return $transaction;
        });

        if (!$transaction) {
            return response()->json([
                'message' => 'Pembayaran hanya dapat dikonfirmasi saat berstatus menunggu pembayaran.',
            ], 409);
        }

        return response()->json([
            'message' => 'Pembayaran berhasil dikonfirmasi.',
            'data' => $transaction,
        ]);
    }
}
