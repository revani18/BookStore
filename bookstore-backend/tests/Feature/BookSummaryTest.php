<?php

namespace Tests\Feature;

use App\Models\Author;
use App\Models\Book;
use App\Models\Genre;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookSummaryTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_summary_returns_list_fields_without_book_description(): void
    {
        $author = Author::create([
            'name' => 'Penulis',
        ]);
        $genre = Genre::create([
            'name' => 'Fiksi',
        ]);
        Book::create([
            'author_id' => $author->id,
            'genre_id' => $genre->id,
            'title' => 'Buku Contoh',
            'isbn' => '9781234567890',
            'description' => 'Deskripsi lengkap buku contoh.',
            'price' => 100000,
            'stock' => 5,
        ]);

        $this->getJson('/api/books?summary=1')
            ->assertOk()
            ->assertJsonPath('0.title', 'Buku Contoh')
            ->assertJsonPath('0.author.name', 'Penulis')
            ->assertJsonPath('0.genre.name', 'Fiksi')
            ->assertJsonMissingPath('0.description');

        $this->getJson('/api/books')
            ->assertOk()
            ->assertJsonPath('0.description', 'Deskripsi lengkap buku contoh.');
    }
}
