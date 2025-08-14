<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGameMatchRequest;
use App\Http\Requests\UpdateGameMatchRequest;
use App\Models\GameMatch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GameMatchController extends Controller
{
    /**
     * Display a listing of the matches.
     */
    public function index()
    {
        $matches = GameMatch::with(['homeClub', 'awayClub', 'group'])
            ->orderBy('match_date', 'desc')
            ->paginate(20);

        return Inertia::render('matches', [
            'matches' => $matches,
        ]);
    }

    /**
     * Show the form for creating a new match.
     */
    public function create()
    {
        return Inertia::render('matches/create');
    }

    /**
     * Store a newly created match in storage.
     */
    public function store(StoreGameMatchRequest $request)
    {
        $match = GameMatch::create($request->validated());

        return redirect()->route('matches.show', $match)
            ->with('success', 'Match scheduled successfully.');
    }

    /**
     * Display the specified match.
     */
    public function show(GameMatch $match)
    {
        $match->load(['homeClub', 'awayClub', 'group']);

        return Inertia::render('matches/show', [
            'match' => $match,
        ]);
    }

    /**
     * Show the form for editing the specified match.
     */
    public function edit(GameMatch $match)
    {
        return Inertia::render('matches/edit', [
            'match' => $match,
        ]);
    }

    /**
     * Update the specified match in storage.
     */
    public function update(UpdateGameMatchRequest $request, GameMatch $match)
    {
        $match->update($request->validated());

        return redirect()->route('matches.show', $match)
            ->with('success', 'Match updated successfully.');
    }

    /**
     * Remove the specified match from storage.
     */
    public function destroy(GameMatch $match)
    {
        $match->delete();

        return redirect()->route('matches.index')
            ->with('success', 'Match deleted successfully.');
    }
}