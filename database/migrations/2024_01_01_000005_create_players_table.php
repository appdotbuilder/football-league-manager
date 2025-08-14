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
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->foreignId('club_id')->constrained()->onDelete('cascade');
            $table->string('name')->comment('Player full name');
            $table->integer('jersey_number')->comment('Player jersey number');
            $table->string('position')->comment('Player position');
            $table->date('birth_date')->nullable()->comment('Player birth date');
            $table->string('nationality')->nullable()->comment('Player nationality');
            $table->timestamps();
            
            // Add indexes and unique constraint
            $table->unique(['club_id', 'jersey_number']);
            $table->index('club_id');
            $table->index('name');
            $table->index('position');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};