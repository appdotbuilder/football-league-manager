<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Player
 *
 * @property int $id
 * @property int $club_id
 * @property string $name
 * @property int $jersey_number
 * @property string $position
 * @property \Illuminate\Support\Carbon|null $birth_date
 * @property string|null $nationality
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Club $club
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Player newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Player newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Player query()
 * @method static \Illuminate\Database\Eloquent\Builder|Player whereBirthDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Player whereClubId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Player whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Player whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Player whereJerseyNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Player whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Player whereNationality($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Player wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Player whereUpdatedAt($value)
 * @method static \Database\Factories\PlayerFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Player extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'club_id',
        'name',
        'jersey_number',
        'position',
        'birth_date',
        'nationality',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'birth_date' => 'date',
        'jersey_number' => 'integer',
    ];

    /**
     * Get the club this player belongs to.
     */
    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class);
    }
}