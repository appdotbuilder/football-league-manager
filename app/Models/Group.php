<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Group
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Club> $clubs
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GameMatch> $matches
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Group newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Group newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Group query()
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Group active()
 * @method static \Database\Factories\GroupFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Group extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'status',
    ];

    /**
     * Get the clubs in this group.
     */
    public function clubs(): BelongsToMany
    {
        return $this->belongsToMany(Club::class, 'group_clubs');
    }

    /**
     * Get matches for this group.
     */
    public function matches(): HasMany
    {
        return $this->hasMany(GameMatch::class);
    }

    /**
     * Scope a query to only include active groups.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Get standings for this group.
     */
    public function getStandings()
    {
        $clubs = $this->clubs;
        $standings = [];

        foreach ($clubs as $club) {
            $groupMatches = $this->matches()
                ->where(function ($query) use ($club) {
                    $query->where('home_club_id', $club->id)
                          ->orWhere('away_club_id', $club->id);
                })
                ->where('status', 'completed')
                ->get();

            $stats = [
                'club' => $club,
                'played' => 0,
                'won' => 0,
                'drawn' => 0,
                'lost' => 0,
                'goals_for' => 0,
                'goals_against' => 0,
                'goal_difference' => 0,
                'points' => 0,
            ];

            foreach ($groupMatches as $match) {
                // Ensure we have a GameMatch instance
                if (!($match instanceof \App\Models\GameMatch)) {
                    continue;
                }
                
                $stats['played']++;
                $homeGoals = (int)($match->home_goals ?? 0);
                $awayGoals = (int)($match->away_goals ?? 0);
                
                if ((int)$match->home_club_id === (int)$club->id) {
                    $stats['goals_for'] += $homeGoals;
                    $stats['goals_against'] += $awayGoals;
                    
                    if ($homeGoals > $awayGoals) {
                        $stats['won']++;
                        $stats['points'] += 3;
                    } elseif ($homeGoals === $awayGoals) {
                        $stats['drawn']++;
                        $stats['points'] += 1;
                    } else {
                        $stats['lost']++;
                    }
                } else {
                    $stats['goals_for'] += $awayGoals;
                    $stats['goals_against'] += $homeGoals;
                    
                    if ($awayGoals > $homeGoals) {
                        $stats['won']++;
                        $stats['points'] += 3;
                    } elseif ($awayGoals === $homeGoals) {
                        $stats['drawn']++;
                        $stats['points'] += 1;
                    } else {
                        $stats['lost']++;
                    }
                }
            }

            $stats['goal_difference'] = $stats['goals_for'] - $stats['goals_against'];
            $standings[] = $stats;
        }

        // Sort by points (descending), then by goal difference (descending), then by goals for (descending)
        usort($standings, function ($a, $b) {
            if ($a['points'] !== $b['points']) {
                return $b['points'] - $a['points'];
            }
            if ($a['goal_difference'] !== $b['goal_difference']) {
                return $b['goal_difference'] - $a['goal_difference'];
            }
            return $b['goals_for'] - $a['goals_for'];
        });

        return $standings;
    }

    /**
     * Get qualified clubs (top 2 from group).
     */
    public function getQualifiedClubs()
    {
        $standings = $this->getStandings();
        return array_slice($standings, 0, 2);
    }
}