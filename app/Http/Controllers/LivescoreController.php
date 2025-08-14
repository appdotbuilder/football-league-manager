<?php

namespace App\Http\Controllers;

use App\Models\GameMatch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LivescoreController extends Controller
{
    /**
     * Display live scores.
     */
    public function index()
    {
        $liveMatches = GameMatch::with(['homeClub', 'awayClub', 'group'])
            ->live()
            ->orderBy('match_date')
            ->get();

        $todayMatches = GameMatch::with(['homeClub', 'awayClub', 'group'])
            ->whereDate('match_date', today())
            ->orderBy('match_date')
            ->get();

        return Inertia::render('livescores', [
            'liveMatches' => $liveMatches,
            'todayMatches' => $todayMatches,
        ]);
    }
}