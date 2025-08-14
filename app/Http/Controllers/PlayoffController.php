<?php

namespace App\Http\Controllers;

use App\Models\GameMatch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlayoffController extends Controller
{
    /**
     * Display the playoff bracket.
     */
    public function index()
    {
        $playoffMatches = GameMatch::with(['homeClub', 'awayClub'])
            ->playoffs()
            ->orderBy('playoff_round')
            ->orderBy('match_date')
            ->get()
            ->groupBy('playoff_round');

        return Inertia::render('playoffs', [
            'playoffMatches' => $playoffMatches,
        ]);
    }
}