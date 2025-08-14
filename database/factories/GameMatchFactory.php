<?php

namespace Database\Factories;

use App\Models\Club;
use App\Models\Group;
use App\Models\GameMatch;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GameMatch>
 */
class GameMatchFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<GameMatch>
     */
    protected $model = GameMatch::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $clubs = Club::pluck('id')->toArray();
        $homeClubId = $this->faker->randomElement($clubs);
        $awayClubId = $this->faker->randomElement(array_diff($clubs, [$homeClubId]));

        $status = $this->faker->randomElement(['scheduled', 'live', 'completed']);
        $matchType = $this->faker->randomElement(['group', 'playoff']);

        $homeGoals = null;
        $awayGoals = null;
        $minute = null;

        if ($status === 'completed') {
            $homeGoals = $this->faker->numberBetween(0, 5);
            $awayGoals = $this->faker->numberBetween(0, 5);
        } elseif ($status === 'live') {
            $homeGoals = $this->faker->numberBetween(0, 3);
            $awayGoals = $this->faker->numberBetween(0, 3);
            $minute = $this->faker->numberBetween(1, 90);
        }

        return [
            'home_club_id' => $homeClubId,
            'away_club_id' => $awayClubId,
            'group_id' => $matchType === 'group' ? Group::inRandomOrder()->first()?->id : null,
            'home_goals' => $homeGoals,
            'away_goals' => $awayGoals,
            'match_date' => $this->faker->dateTimeBetween('-1 month', '+1 month'),
            'match_type' => $matchType,
            'playoff_round' => $matchType === 'playoff' ? $this->faker->randomElement(['quarter', 'semi', 'final']) : null,
            'status' => $status,
            'minute' => $minute,
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}