<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * Registro das rotas de autenticação
 * do Laravel UI.
 *
 * Para desabilitar alguma rota, basta
 * remover o comentário da linha.
 */
Auth::routes([
    'confirm' => false, // desabilita a rota de confirmação de senha
    // 'register' => false, // desabilita a rota de registro
    // 'reset' => false, // desabilita a rota de reset de senha
    // 'verify' => true, // habilita a rota de verificação de e-mail
]);

Route::group([
    'middleware' => ['auth:sanctum', 'verified'],
], function () {
    Route::get('/', [App\Http\Controllers\RendererController::class, 'authenticated'])
        ->name('home');
});

Route::group([
    'middleware' => ['auth:sanctum', 'verified'],
    'prefix' => 'admin',
], function () {
    Route::get('{any}/test/{id}', [App\Http\Controllers\RendererController::class, 'authenticated'])
        ->name('test');
});
