<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !password_verify($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        $token = $user->createToken('auth')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => 'Bearer ' . $token,
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        // Revoke token yang digunakan untuk request saat ini
        $user->currentAccessToken()->delete();

        // Revoke semua token user
        // $user->tokens()->delete();

        return response()->json([
            'message' => 'Logout berhasil',
        ]);
    }
}
