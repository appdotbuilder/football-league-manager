<?php

namespace App\Http\Controllers;

use App\Models\Club;
use App\Models\Group;
use App\Models\GameMatch;
use App\Models\Player;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeagueController extends Controller
{
    /**
     * Display the main league dashboard.
     */
    public function index()
    {
        // Get live matches
        $liveMatches = GameMatch::with(['homeClub', 'awayClub', 'group'])
            ->live()
            ->orderBy('match_date')
            ->get();

        // Get recent completed matches
        $recentMatches = GameMatch::with(['homeClub', 'awayClub', 'group'])
            ->completed()
            ->orderBy('match_date', 'desc')
            ->limit(6)
            ->get();

        // Get upcoming matches
        $upcomingMatches = GameMatch::with(['homeClub', 'awayClub', 'group'])
            ->where('status', 'scheduled')
            ->orderBy('match_date')
            ->limit(6)
            ->get();

        // Get groups with standings
        $groups = Group::with('clubs')->active()->get();
        $groupStandings = $groups->map(function ($group) {
            return [
                'group' => $group,
                'standings' => $group->getStandings()
            ];
        });

        // Get playoff matches
        $playoffMatches = GameMatch::with(['homeClub', 'awayClub'])
            ->playoffs()
            ->orderBy('playoff_round')
            ->orderBy('match_date')
            ->get()
            ->groupBy('playoff_round');

        // Get qualified clubs from all groups
        $qualifiedClubs = [];
        foreach ($groups as $group) {
            $qualified = $group->getQualifiedClubs();
            $qualifiedClubs[$group->name] = $qualified;
        }

        return Inertia::render('welcome', [
            'liveMatches' => $liveMatches,
            'recentMatches' => $recentMatches,
            'upcomingMatches' => $upcomingMatches,
            'groupStandings' => $groupStandings,
            'playoffMatches' => $playoffMatches,
            'qualifiedClubs' => $qualifiedClubs,
        ]);
    }


}