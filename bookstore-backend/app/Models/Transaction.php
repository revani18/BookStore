<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaction extends Model
{
    protected $fillable = [
        'user_id',
        'order_number',
        'recipient_name',
        'phone',
        'shipping_address',
        'city',
        'province',
        'postal_code',
        'subtotal',
        'shipping_cost',
        'total_amount',
        'order_status',
        'payment_status',
        'payment_method',
        'midtrans_transaction_id',
        'snap_token',
        'payment_url',
        'paid_at',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'paid_at' => 'datetime',
    ];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany{
        return $this->hasMany(TransactionItem::class);
    }
}
