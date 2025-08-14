<?php

use App\Http\Controllers\LeagueController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\PlayoffController;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\GameMatchController;
use App\Http\Controllers\LivescoreController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Main football league routes
Route::get('/', [LeagueController::class, 'index'])->name('home');
Route::get('/groups', [GroupController::class, 'index'])->name('groups');
Route::get('/playoffs', [PlayoffController::class, 'index'])->name('playoffs');
Route::get('/livescores', [LivescoreController::class, 'index'])->name('livescores');

// Resource routes
Route::resource('clubs', ClubController::class);
Route::resource('matches', GameMatchController::class);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
