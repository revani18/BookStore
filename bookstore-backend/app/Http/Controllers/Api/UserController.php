<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::where('role', 'customer')
            ->select(
                'id',
                'profile_photo',
                'name',
                'email',
                'phone',
                'address',
                'city',
                'province',
                'postal_code',
                'created_at'
            )
            ->latest()
            ->get();

        return response()->json($users);
    }

    public function show(User $user)
    {
        if ($user->role !== 'customer') {
            return response()->json([
                'message' => 'Data pelanggan tidak ditemukan.',
            ], 404);
        }

        return response()->json(
            $user->only([
                'id',
                'profile_photo',
                'name',
                'email',
                'phone',
                'address',
                'city',
                'province',
                'postal_code',
                'created_at',
            ])
        );
    }
}
