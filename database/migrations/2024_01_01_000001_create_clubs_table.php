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
        Schema::create('clubs', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Club name');
            $table->string('short_name', 5)->comment('Short name/abbreviation for club');
            $table->string('logo')->nullable()->comment('Path to club logo image');
            $table->text('description')->nullable()->comment('Club description');
            $table->string('city')->nullable()->comment('Club city/location');
            $table->timestamps();
            
            // Add indexes
            $table->index('name');
            $table->index('short_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clubs');
    }
};