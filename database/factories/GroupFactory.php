<?php

namespace Database\Factories;

use App\Models\Group;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Group>
 */
class GroupFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Group ' . $this->faker->unique()->randomElement(['A', 'B', 'C', 'D']),
            'description' => $this->faker->sentence(),
            'status' => $this->faker->randomElement(['active', 'completed']),
        ];
    }
}