<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ], [
            'name.required' => 'Nama wajib diisi.',
            'name.string' => 'Nama harus berupa teks.',
            'name.max' => 'Nama maksimal 255 karakter.',
            'email.required' => 'Email wajib diisi.',
            'email.string' => 'Email harus berupa teks.',
            'email.email' => 'Format email tidak valid.',
            'email.max' => 'Email maksimal 255 karakter.',
            'subject.required' => 'Subjek wajib diisi.',
            'subject.string' => 'Subjek harus berupa teks.',
            'subject.max' => 'Subjek maksimal 255 karakter.',
            'message.required' => 'Pesan wajib diisi.',
            'message.string' => 'Pesan harus berupa teks.',
        ]);

        $contactMessage = ContactMessage::create($validated);

        return response()->json([
            'message' => 'Pesan berhasil dikirim.',
            'data' => $contactMessage,
        ], 201);
    }

    public function index()
    {
        return response()->json([
            'message' => 'Daftar pesan berhasil diambil.',
            'data' => ContactMessage::query()
                ->latest()
                ->get(['id', 'name', 'email', 'subject', 'created_at']),
        ]);
    }

    public function show(ContactMessage $contactMessage)
    {
        return response()->json([
            'message' => 'Detail pesan berhasil diambil.',
            'data' => $contactMessage,
        ]);
    }
}
