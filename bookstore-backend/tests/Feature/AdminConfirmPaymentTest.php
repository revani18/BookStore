<?php

namespace Tests\Feature;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminConfirmPaymentTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_confirm_pending_payment_without_changing_order_status_or_midtrans_id(): void
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => 'password',
            'role' => 'admin',
        ]);
        $transaction = $this->createPendingTransaction();

        $response = $this->actingAs($admin, 'sanctum')
            ->patchJson("/api/transactions/{$transaction->id}/payment-status");

        $response->assertOk()
            ->assertJsonPath('data.payment_status', 'paid')
            ->assertJsonPath('data.order_status', 'pending')
            ->assertJsonPath('data.midtrans_transaction_id', null);

        $this->assertNotNull($response->json('data.paid_at'));
        $this->assertDatabaseHas('transactions', [
            'id' => $transaction->id,
            'payment_status' => 'paid',
            'order_status' => 'pending',
            'midtrans_transaction_id' => null,
        ]);
    }

    public function test_already_paid_payment_cannot_be_confirmed_again(): void
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => 'password',
            'role' => 'admin',
        ]);
        $transaction = $this->createPendingTransaction();
        $transaction->update([
            'payment_status' => 'paid',
            'paid_at' => now()->subMinute(),
        ]);

        $this->actingAs($admin, 'sanctum')
            ->patchJson("/api/transactions/{$transaction->id}/payment-status")
            ->assertStatus(409)
            ->assertJsonPath(
                'message',
                'Pembayaran hanya dapat dikonfirmasi saat berstatus menunggu pembayaran.',
            );
    }

    public function test_customer_cannot_confirm_payment(): void
    {
        $customer = User::create([
            'name' => 'Customer',
            'email' => 'customer@example.com',
            'password' => 'password',
            'role' => 'customer',
        ]);
        $transaction = $this->createPendingTransaction();

        $this->actingAs($customer, 'sanctum')
            ->patchJson("/api/transactions/{$transaction->id}/payment-status")
            ->assertForbidden();

        $this->assertDatabaseHas('transactions', [
            'id' => $transaction->id,
            'payment_status' => 'pending',
        ]);
    }

    private function createPendingTransaction(): Transaction
    {
        $customer = User::create([
            'name' => 'Pemilik Transaksi',
            'email' => 'pemilik@example.com',
            'password' => 'password',
            'role' => 'customer',
        ]);

        return Transaction::create([
            'user_id' => $customer->id,
            'order_number' => 'BS-TEST-001',
            'recipient_name' => 'Pemilik Transaksi',
            'phone' => '08123456789',
            'shipping_address' => 'Jalan Contoh',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'postal_code' => '12345',
            'subtotal' => 100000,
            'shipping_cost' => 0,
            'total_amount' => 100000,
        ]);
    }
}
