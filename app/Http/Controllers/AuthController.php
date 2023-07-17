<?php
use App\Models\AsesoriaUser;
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function asesoriaSignup(SignupRequest $request)
{
    $data = $request->validated();

    /** @var \App\Models\AsesoriaUser $user */
    $user = AsesoriaUser::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => bcrypt($data['password']),
    ]);

    $token = $user->createToken('main')->plainTextToken;
    return response()->json(compact('user', 'token'));
}

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)){
            return response([
                'message' => 'La dirección de correo electrónico o la contraseña proporcionadas son incorrectas'
            ], 422);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response (compact('user', 'token'));
    }
    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
