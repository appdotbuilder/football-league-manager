<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupController extends Controller
{
    /**
     * Display a listing of the groups.
     */
    public function index()
    {
        $groups = Group::with('clubs')->active()->get();
        $groupStandings = $groups->map(function ($group) {
            return [
                'group' => $group,
                'standings' => $group->getStandings(),
                'qualified' => $group->getQualifiedClubs(),
            ];
        });

        return Inertia::render('groups', [
            'groupStandings' => $groupStandings,
        ]);
    }
}