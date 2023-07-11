<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //creo tres funciones
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        /**@var /App/Models/User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bccrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response (compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)){
            return response([
                'message' => 'La dirección de correo electrónico o la contraseña proporcionadas son incorrectas'
            ]);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response (compact('user', 'token'));
    }
    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccesToken()->delete();
        return response('', 204);
    }
}
