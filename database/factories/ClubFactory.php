<?php

namespace Database\Factories;

use App\Models\Club;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Club>
 */
class ClubFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $clubNames = [
            'Manchester United', 'Barcelona', 'Real Madrid', 'Bayern Munich',
            'Liverpool', 'Chelsea', 'Arsenal', 'Juventus', 'AC Milan', 'Inter Milan',
            'Paris Saint-Germain', 'Borussia Dortmund', 'Atletico Madrid', 'Tottenham',
            'Manchester City', 'Ajax'
        ];

        $cities = [
            'Manchester', 'Barcelona', 'Madrid', 'Munich', 'Liverpool', 'London', 
            'Turin', 'Milan', 'Paris', 'Dortmund', 'Amsterdam'
        ];

        $name = $this->faker->unique()->randomElement($clubNames);
        
        return [
            'name' => $name,
            'short_name' => strtoupper(substr($name, 0, 3)),
            'description' => $this->faker->paragraph(),
            'city' => $this->faker->randomElement($cities),
            'logo' => null,
        ];
    }
}