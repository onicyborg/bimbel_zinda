<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\MataPelajaranContoroller;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\TentorController;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    //CRUD SISWA
    Route::get('/get-all-siswa', [SiswaController::class, 'index']);
    Route::get('/get-siswa-by-id/{id}', [SiswaController::class, 'indexbyid']);
    Route::post('/create-siswa', [SiswaController::class, 'store']);
    Route::put('/update-siswa/{id}', [SiswaController::class, 'update']);
    Route::delete('/delete-siswa/{id}', [SiswaController::class, 'destroy']);

    //CRUD TENTOR
    Route::get('/get-all-tentor', [TentorController::class, 'index']);
    Route::get('/get-tentor-by-id/{id}', [TentorController::class, 'indexbyid']);
    Route::post('/create-tentor', [TentorController::class, 'store']);
    Route::put('/update-tentor/{id}', [TentorController::class, 'update']);
    Route::delete('/delete-tentor/{id}', [TentorController::class, 'destroy']);

    //CRUD MATA PELAJARAN
    Route::get('/get-all-mata-pelajaran', [MataPelajaranContoroller::class, 'index']);
    Route::get('/get-mata-pelajaran-by-id/{id}', [MataPelajaranContoroller::class, 'indexbyid']);
    Route::post('/create-mata-pelajaran', [MataPelajaranContoroller::class, 'store']);
    Route::put('/update-mata-pelajaran/{id}', [MataPelajaranContoroller::class, 'update']);
    Route::delete('/delete-mata-pelajaran/{id}', [MataPelajaranContoroller::class, 'destroy']);

    //CRUD JADWAL
    Route::get('/get-all-jadwal', [JadwalController::class, 'index']);
    Route::get('/get-jadwal-by-id/{id}', [JadwalController::class, 'indexbyid']);
    Route::post('/create-jadwal', [JadwalController::class, 'store']);
    Route::put('/update-jadwal/{id}', [JadwalController::class, 'update']);
    Route::delete('/delete-jadwal/{id}', [JadwalController::class, 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
});
