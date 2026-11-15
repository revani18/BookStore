<?php

namespace Tests\Feature;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminDashboardSummaryTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_receives_counts_and_only_the_five_latest_transactions(): void
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => 'password',
            'role' => 'admin',
        ]);
        $customer = User::create([
            'name' => 'Customer',
            'email' => 'customer@example.com',
            'password' => 'password',
            'role' => 'customer',
        ]);

        for ($index = 1; $index <= 6; $index++) {
            $date = now()->subMinutes(6 - $index);

            $transaction = Transaction::create([
                'user_id' => $customer->id,
                'order_number' => "BS-TEST-{$index}",
                'recipient_name' => 'Customer',
                'phone' => '08123456789',
                'shipping_address' => 'Jalan Contoh',
                'city' => 'Jakarta',
                'province' => 'DKI Jakarta',
                'postal_code' => '12345',
                'subtotal' => 100000,
                'shipping_cost' => 0,
                'total_amount' => 100000,
            ]);

            $transaction->created_at = $date;
            $transaction->save();
        }

        $this->actingAs($admin, 'sanctum')
            ->getJson('/api/dashboard/summary')
            ->assertOk()
            ->assertJsonPath('data.statistics.books', 0)
            ->assertJsonPath('data.statistics.genres', 0)
            ->assertJsonPath('data.statistics.authors', 0)
            ->assertJsonPath('data.statistics.users', 1)
            ->assertJsonCount(5, 'data.transactions')
            ->assertJsonPath(
                'data.transactions.0.order_number',
                'BS-TEST-6',
            );
    }

    public function test_guest_cannot_access_dashboard_summary(): void
    {
        $this->getJson('/api/dashboard/summary')->assertUnauthorized();
    }
}
