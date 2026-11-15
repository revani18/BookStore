<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactMessagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_submit_a_contact_message(): void
    {
        $response = $this->postJson('/api/contact-messages', [
            'name' => 'Rina',
            'email' => 'rina@example.com',
            'subject' => 'Pertanyaan buku',
            'message' => 'Apakah buku tersedia?',
        ]);

        $response->assertCreated()
            ->assertJsonPath('message', 'Pesan berhasil dikirim.')
            ->assertJsonPath('data.email', 'rina@example.com');

        $this->assertDatabaseHas('contact_messages', [
            'name' => 'Rina',
            'email' => 'rina@example.com',
            'subject' => 'Pertanyaan buku',
            'message' => 'Apakah buku tersedia?',
        ]);
    }

    public function test_invalid_contact_message_is_rejected(): void
    {
        $this->postJson('/api/contact-messages', [
            'name' => '',
            'email' => 'bukan-email',
            'subject' => '',
            'message' => '',
        ])->assertUnprocessable()
            ->assertJsonValidationErrors([
                'name',
                'email',
                'subject',
                'message',
            ]);
    }

    public function test_only_admin_can_read_contact_messages(): void
    {
        $contactMessage = ContactMessage::create([
            'name' => 'Rina',
            'email' => 'rina@example.com',
            'subject' => 'Pertanyaan buku',
            'message' => 'Apakah buku tersedia?',
        ]);

        $this->getJson('/api/contact-messages')->assertUnauthorized();
        $this->getJson("/api/contact-messages/{$contactMessage->id}")
            ->assertUnauthorized();

        $customer = User::create([
            'name' => 'Customer',
            'email' => 'customer@example.com',
            'password' => 'password',
            'role' => 'customer',
        ]);

        $this->actingAs($customer, 'sanctum')
            ->getJson('/api/contact-messages')
            ->assertForbidden();

        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => 'password',
            'role' => 'admin',
        ]);

        $this->actingAs($admin, 'sanctum')
            ->getJson('/api/contact-messages')
            ->assertOk()
            ->assertJsonPath('data.0.email', 'rina@example.com');

        $this->getJson("/api/contact-messages/{$contactMessage->id}")
            ->assertOk()
            ->assertJsonPath('data.message', 'Apakah buku tersedia?');
    }
}
