<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClubRequest extends FormRequest
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
            'name' => 'required|string|max:255|unique:clubs,name',
            'short_name' => 'required|string|max:5|unique:clubs,short_name',
            'description' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
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
            'name.required' => 'Club name is required.',
            'name.unique' => 'This club name is already taken.',
            'short_name.required' => 'Short name is required.',
            'short_name.max' => 'Short name cannot be longer than 5 characters.',
            'short_name.unique' => 'This short name is already taken.',
            'logo.image' => 'The logo must be an image file.',
            'logo.max' => 'The logo file size cannot exceed 2MB.',
        ];
    }
}