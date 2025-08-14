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
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Group name (e.g., Group A, Group B)');
            $table->text('description')->nullable()->comment('Group description');
            $table->enum('status', ['active', 'completed'])->default('active')->comment('Group status');
            $table->timestamps();
            
            // Add indexes
            $table->index('name');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups');
    }
};