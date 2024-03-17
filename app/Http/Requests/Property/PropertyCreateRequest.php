<?php

namespace App\Http\Requests\Property;

use Illuminate\Foundation\Http\FormRequest;

class PropertyCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return !! auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $availableListingTypes = collect(['Exclusive Listing', 'Lease', 'Rental', 'Sale'])->implode(',');

        return [
            'title' => 'required',
            'description' => 'required',
            'content' => 'nullable',
            'price' => 'nullable|integer',
            'is_published' => 'required|boolean',
            'location' => 'required',
            'mls_code' => 'required',
            'build_year' => 'required|numeric',
            'property_size' => 'required|numeric',
            'is_featured' => 'required|boolean',
            'listing_type' => ["required", "in:$availableListingTypes"],
            'amenities' => ["nullable", 'array']
        ];
    }
}
