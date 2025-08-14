<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Club
 *
 * @property int $id
 * @property string $name
 * @property string $short_name
 * @property string|null $logo
 * @property string|null $description
 * @property string|null $city
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Group> $groups
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GameMatch> $homeMatches
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GameMatch> $awayMatches
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Player> $players
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Club newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Club newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Club query()
 * @method static \Illuminate\Database\Eloquent\Builder|Club whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Club whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Club whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Club whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Club whereLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Club whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Club whereShortName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Club whereUpdatedAt($value)
 * @method static \Database\Factories\ClubFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Club extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'short_name',
        'logo',
        'description',
        'city',
    ];

    /**
     * Get the groups this club belongs to.
     */
    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(Group::class, 'group_clubs');
    }

    /**
     * Get home matches for this club.
     */
    public function homeMatches(): HasMany
    {
        return $this->hasMany(GameMatch::class, 'home_club_id');
    }

    /**
     * Get away matches for this club.
     */
    public function awayMatches(): HasMany
    {
        return $this->hasMany(GameMatch::class, 'away_club_id');
    }

    /**
     * Get all matches for this club.
     */
    public function matches()
    {
        return GameMatch::where('home_club_id', $this->id)
            ->orWhere('away_club_id', $this->id);
    }

    /**
     * Get players for this club.
     */
    public function players(): HasMany
    {
        return $this->hasMany(Player::class);
    }
}