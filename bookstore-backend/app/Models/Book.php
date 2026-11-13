<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    protected $fillable = [
        'author_id',
        'genre_id',
        'title',
        'isbn',
        'description',
        'price',
        'stock',
        'cover_image',
    ];

    public function author(): BelongsTo{
        return $this->belongsTo(Author::class);
    }

    public function genre(): BelongsTo{
        return $this->belongsTo(Genre::class);
    }

    public function cartItems(): HasMany{
        return $this->hasMany(CartItem::class);
    }

    public function transactionItems(): HasMany{
        return $this->hasMany(transactionItem::class);
    }
}
