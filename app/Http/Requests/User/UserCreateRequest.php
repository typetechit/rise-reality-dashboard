<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UserCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->role === 'ADMIN';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ["required", "max:100"],
            "email" => ["required", "email", "unique:users,email"],
            "password" => ["required", "min:6"],
            "role" => ["required", "in:ADMIN,PROPERTY_AGENT,EDITOR"],
            "designation" => ["nullable"],
            "description" => ["nullable"],
            "social_links" => ["nullable", "array"],
            "experience" => ["nullable"],
            "location" => ["nullable"],
            "practice_area" => ["nullable"],
            "phone" => ["nullable"],
        ];
    }
}
