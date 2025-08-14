<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGameMatchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'home_goals' => 'nullable|integer|min:0',
            'away_goals' => 'nullable|integer|min:0',
            'status' => 'required|in:scheduled,live,completed,postponed',
            'minute' => 'nullable|integer|min:1|max:120',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'home_goals.integer' => 'Home goals must be a number.',
            'home_goals.min' => 'Home goals cannot be negative.',
            'away_goals.integer' => 'Away goals must be a number.',
            'away_goals.min' => 'Away goals cannot be negative.',
            'status.required' => 'Match status is required.',
            'status.in' => 'Invalid match status.',
            'minute.integer' => 'Minute must be a number.',
            'minute.min' => 'Minute must be at least 1.',
            'minute.max' => 'Minute cannot exceed 120.',
        ];
    }
}