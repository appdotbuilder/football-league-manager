<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\GameMatch
 *
 * @property int $id
 * @property int $home_club_id
 * @property int $away_club_id
 * @property int|null $group_id
 * @property int|null $home_goals
 * @property int|null $away_goals
 * @property \Illuminate\Support\Carbon $match_date
 * @property string $match_type
 * @property string|null $playoff_round
 * @property string $status
 * @property int|null $minute
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Club $homeClub
 * @property-read \App\Models\Club $awayClub
 * @property-read \App\Models\Group|null $group
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch query()
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch whereAwayClubId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch whereAwayGoals($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch whereGroupId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch whereHomeClubId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch whereHomeGoals($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch whereMatchDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch whereMatchType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch whereMinute($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch wherePlayoffRound($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch live()
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch completed()
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch groupPhase()
 * @method static \Illuminate\Database\Eloquent\Builder|GameMatch playoffs()
 * @method static \Database\Factories\GameMatchFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class GameMatch extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'matches';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'home_club_id',
        'away_club_id',
        'group_id',
        'home_goals',
        'away_goals',
        'match_date',
        'match_type',
        'playoff_round',
        'status',
        'minute',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'match_date' => 'datetime',
        'home_goals' => 'integer',
        'away_goals' => 'integer',
        'minute' => 'integer',
    ];

    /**
     * Get the home club.
     */
    public function homeClub(): BelongsTo
    {
        return $this->belongsTo(Club::class, 'home_club_id');
    }

    /**
     * Get the away club.
     */
    public function awayClub(): BelongsTo
    {
        return $this->belongsTo(Club::class, 'away_club_id');
    }

    /**
     * Get the group this match belongs to.
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    /**
     * Scope a query to only include live matches.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLive($query)
    {
        return $query->where('status', 'live');
    }

    /**
     * Scope a query to only include completed matches.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Scope a query to only include group phase matches.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeGroupPhase($query)
    {
        return $query->where('match_type', 'group');
    }

    /**
     * Scope a query to only include playoff matches.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePlayoffs($query)
    {
        return $query->where('match_type', 'playoff');
    }

    /**
     * Get the match result string.
     */
    public function getResultAttribute()
    {
        if ($this->status !== 'completed' || $this->home_goals === null || $this->away_goals === null) {
            return null;
        }

        return $this->home_goals . ' - ' . $this->away_goals;
    }

    /**
     * Get the winner of the match.
     */
    public function getWinnerAttribute()
    {
        if ($this->status !== 'completed' || $this->home_goals === null || $this->away_goals === null) {
            return null;
        }

        if ($this->home_goals > $this->away_goals) {
            return $this->homeClub;
        } elseif ($this->away_goals > $this->home_goals) {
            return $this->awayClub;
        }

        return null; // Draw
    }
}