<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Club;
use App\Models\Group;
use App\Models\GameMatch;
use App\Models\Player;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create clubs
        $clubs = Club::factory(16)->create();

        // Create 4 groups
        $groups = collect(['A', 'B', 'C', 'D'])->map(function ($letter) {
            return Group::factory()->create([
                'name' => "Group {$letter}",
                'status' => 'active'
            ]);
        });

        // Assign 4 clubs to each group
        $clubChunks = $clubs->chunk(4);
        $groups->each(function ($group, $index) use ($clubChunks) {
            $group->clubs()->attach($clubChunks[$index]->pluck('id'));
        });

        // Create group phase matches
        $groups->each(function ($group) {
            $groupClubs = $group->clubs;
            
            // Create round-robin matches for each group
            for ($i = 0; $i < $groupClubs->count(); $i++) {
                for ($j = $i + 1; $j < $groupClubs->count(); $j++) {
                    $homeClub = $groupClubs[$i];
                    $awayClub = $groupClubs[$j];
                    
                    // Create match
                    $status = fake()->randomElement(['completed', 'completed', 'completed', 'live', 'scheduled']);
                    
                    $match = GameMatch::factory()->create([
                        'home_club_id' => $homeClub->id,
                        'away_club_id' => $awayClub->id,
                        'group_id' => $group->id,
                        'match_type' => 'group',
                        'status' => $status,
                        'match_date' => fake()->dateTimeBetween('-2 weeks', '+2 weeks'),
                    ]);

                    // Set scores for completed matches
                    if ($status === 'completed') {
                        $match->update([
                            'home_goals' => fake()->numberBetween(0, 4),
                            'away_goals' => fake()->numberBetween(0, 4),
                            'minute' => null,
                        ]);
                    } elseif ($status === 'live') {
                        $match->update([
                            'home_goals' => fake()->numberBetween(0, 3),
                            'away_goals' => fake()->numberBetween(0, 3),
                            'minute' => fake()->numberBetween(15, 90),
                        ]);
                    }
                }
            }
        });

        // Create some playoff matches
        $qualifiedClubs = $clubs->random(8); // Simulate 8 qualified clubs
        $playoffMatches = [
            ['quarter', 2],
            ['semi', 2], 
            ['final', 1]
        ];

        foreach ($playoffMatches as [$round, $count]) {
            for ($i = 0; $i < $count; $i++) {
                $twoClubs = $qualifiedClubs->random(2);
                $status = fake()->randomElement(['scheduled', 'completed']);
                
                GameMatch::factory()->create([
                    'home_club_id' => $twoClubs->first()->id,
                    'away_club_id' => $twoClubs->last()->id,
                    'group_id' => null,
                    'match_type' => 'playoff',
                    'playoff_round' => $round,
                    'status' => $status,
                    'match_date' => fake()->dateTimeBetween('+1 week', '+4 weeks'),
                    'home_goals' => $status === 'completed' ? fake()->numberBetween(0, 3) : null,
                    'away_goals' => $status === 'completed' ? fake()->numberBetween(0, 3) : null,
                ]);
            }
        }

        // Create players for each club
        $clubs->each(function ($club) {
            $usedNumbers = [];
            
            // Create 20-25 players per club
            for ($i = 0; $i < random_int(20, 25); $i++) {
                do {
                    $jerseyNumber = random_int(1, 99);
                } while (in_array($jerseyNumber, $usedNumbers));
                
                $usedNumbers[] = $jerseyNumber;
                
                Player::factory()->create([
                    'club_id' => $club->id,
                    'jersey_number' => $jerseyNumber,
                ]);
            }
        });
    }
}
