<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClubRequest;
use App\Http\Requests\UpdateClubRequest;
use App\Models\Club;
use App\Models\GameMatch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClubController extends Controller
{
    /**
     * Display a listing of the clubs.
     */
    public function index()
    {
        $clubs = Club::with(['groups', 'players'])
            ->orderBy('name')
            ->get();

        return Inertia::render('clubs', [
            'clubs' => $clubs,
        ]);
    }

    /**
     * Show the form for creating a new club.
     */
    public function create()
    {
        return Inertia::render('clubs/create');
    }

    /**
     * Store a newly created club in storage.
     */
    public function store(StoreClubRequest $request)
    {
        $club = Club::create($request->validated());

        return redirect()->route('clubs.show', $club)
            ->with('success', 'Club created successfully.');
    }

    /**
     * Display the specified club.
     */
    public function show(Club $club)
    {
        $club->load(['groups', 'players', 'homeMatches.awayClub', 'awayMatches.homeClub']);

        // Get all matches for this club
        $matches = GameMatch::where('home_club_id', $club->id)
            ->orWhere('away_club_id', $club->id)
            ->with(['homeClub', 'awayClub', 'group'])
            ->orderBy('match_date', 'desc')
            ->get();

        return Inertia::render('club-details', [
            'club' => $club,
            'matches' => $matches,
        ]);
    }

    /**
     * Show the form for editing the specified club.
     */
    public function edit(Club $club)
    {
        return Inertia::render('clubs/edit', [
            'club' => $club,
        ]);
    }

    /**
     * Update the specified club in storage.
     */
    public function update(UpdateClubRequest $request, Club $club)
    {
        $club->update($request->validated());

        return redirect()->route('clubs.show', $club)
            ->with('success', 'Club updated successfully.');
    }

    /**
     * Remove the specified club from storage.
     */
    public function destroy(Club $club)
    {
        $club->delete();

        return redirect()->route('clubs.index')
            ->with('success', 'Club deleted successfully.');
    }
}