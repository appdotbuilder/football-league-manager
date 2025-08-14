<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('home_club_id')->constrained('clubs')->onDelete('cascade');
            $table->foreignId('away_club_id')->constrained('clubs')->onDelete('cascade');
            $table->foreignId('group_id')->nullable()->constrained()->onDelete('cascade');
            $table->integer('home_goals')->nullable()->comment('Goals scored by home team');
            $table->integer('away_goals')->nullable()->comment('Goals scored by away team');
            $table->datetime('match_date')->comment('Scheduled match date and time');
            $table->enum('match_type', ['group', 'playoff'])->default('group')->comment('Type of match');
            $table->enum('playoff_round', ['quarter', 'semi', 'final'])->nullable()->comment('Playoff round if applicable');
            $table->enum('status', ['scheduled', 'live', 'completed', 'postponed'])->default('scheduled')->comment('Match status');
            $table->integer('minute')->nullable()->comment('Current minute for live matches');
            $table->text('notes')->nullable()->comment('Additional match notes');
            $table->timestamps();
            
            // Add indexes
            $table->index(['home_club_id', 'away_club_id']);
            $table->index('group_id');
            $table->index('match_date');
            $table->index('status');
            $table->index('match_type');
            $table->index('playoff_round');
            $table->index(['status', 'match_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};