<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('order_number', 50)->unique();
            $table->string('recipient_name', 100);
            $table->string('phone', 20);
            $table->text('shipping_address');
            $table->string('city', 100);
            $table->string('province', 100);
            $table->string('postal_code', 10);
            $table->decimal('subtotal', 12, 2);
            $table->decimal('shipping_cost', 12, 2)->default(0);
            $table->decimal('total_amount', 12, 2);
            $table->enum('order_status', [
                'pending',
                'processing',
                'shipped',
                'completed',
                'cancelled'
            ])->default('pending');
            $table->enum('payment_status', [
                'pending',
                'paid',
                'failed',
                'expired'
            ])->default('pending');
            $table->string('payment_method', 30)->default('midtrans');
            $table->string('midtrans_transaction_id', 100)->nullable();
            $table->string('snap_token')->nullable();
            $table->text('payment_url')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
