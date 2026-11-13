<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MidtransNotificationController extends Controller
{
    public function handle(Request $request)
    {
        $notification = $request->all();

        $orderId = $notification['order_id'] ?? null;
        $statusCode = $notification['status_code'] ?? null;
        $grossAmount = $notification['gross_amount'] ?? null;
        $signatureKey = $notification['signature_key'] ?? null;

        if (!$orderId || !$statusCode || !$grossAmount || !$signatureKey) {
            return response()->json([
                'message' => 'Data notifikasi tidak lengkap.'
            ], 400);
        }

        $serverKey = config('midtrans.server_key');

        $expectedSignature = hash(
            'sha512',
            $orderId . $statusCode . $grossAmount . $serverKey
        );

        if (!hash_equals($expectedSignature, $signatureKey)) {
            return response()->json([
                'message' => 'Signature tidak valid.'
            ], 403);
        }

        $transaction = Transaction::where('order_number', $orderId)->first();

        if (!$transaction) {
            return response()->json([
                'message' => 'Transaksi tidak ditemukan.'
            ], 404);
        }

        $transactionStatus = $notification['transaction_status'] ?? null;
        $fraudStatus = $notification['fraud_status'] ?? null;

        if ($transactionStatus === 'settlement' ||
            ($transactionStatus === 'capture' && $fraudStatus === 'accept')) {

            $transaction->payment_status = 'paid';
            $transaction->paid_at = now();

        } elseif ($transactionStatus === 'pending') {

            $transaction->payment_status = 'pending';

        } elseif (in_array($transactionStatus, ['deny', 'cancel', 'expire', 'failure'])) {

            $transaction->payment_status = 'failed';
        }

        $transaction->midtrans_transaction_id =
            $notification['transaction_id'] ?? null;

        $transaction->save();

        Log::info('Midtrans notification processed', [
            'order_id' => $orderId,
            'transaction_status' => $transactionStatus,
        ]);

        return response()->json([
            'message' => 'Notifikasi pembayaran berhasil diproses.'
        ]);
    }
}
