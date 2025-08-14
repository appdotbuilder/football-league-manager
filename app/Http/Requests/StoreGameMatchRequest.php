<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGameMatchRequest extends FormRequest
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
            'home_club_id' => 'required|exists:clubs,id|different:away_club_id',
            'away_club_id' => 'required|exists:clubs,id',
            'group_id' => 'nullable|exists:groups,id',
            'match_date' => 'required|date|after:now',
            'match_type' => 'required|in:group,playoff',
            'playoff_round' => 'required_if:match_type,playoff|nullable|in:quarter,semi,final',
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
            'home_club_id.required' => 'Home club is required.',
            'home_club_id.exists' => 'Selected home club does not exist.',
            'home_club_id.different' => 'Home club must be different from away club.',
            'away_club_id.required' => 'Away club is required.',
            'away_club_id.exists' => 'Selected away club does not exist.',
            'match_date.required' => 'Match date is required.',
            'match_date.after' => 'Match date must be in the future.',
            'match_type.required' => 'Match type is required.',
            'match_type.in' => 'Match type must be either group or playoff.',
            'playoff_round.required_if' => 'Playoff round is required for playoff matches.',
            'playoff_round.in' => 'Playoff round must be quarter, semi, or final.',
        ];
    }
}