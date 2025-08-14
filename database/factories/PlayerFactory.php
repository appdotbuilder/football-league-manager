<?php

namespace Database\Factories;

use App\Models\Club;
use App\Models\Player;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Player>
 */
class PlayerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $positions = ['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'RW', 'ST'];
        $countries = ['England', 'Spain', 'Germany', 'France', 'Italy', 'Brazil', 'Argentina', 'Netherlands', 'Portugal'];

        return [
            'club_id' => Club::factory(),
            'name' => $this->faker->name(),
            'jersey_number' => $this->faker->numberBetween(1, 99),
            'position' => $this->faker->randomElement($positions),
            'birth_date' => $this->faker->dateTimeBetween('-35 years', '-18 years'),
            'nationality' => $this->faker->randomElement($countries),
        ];
    }
}