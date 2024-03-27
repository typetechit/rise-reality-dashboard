<?php

namespace App\Http\Requests\Property;

use Illuminate\Foundation\Http\FormRequest;

class PropertyUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $availableListingTypes = collect(config('property.listingsTypes'))->implode(',');

        return [
            'title' => 'required',
            'description' => 'required',
            'content' => 'nullable',
            'price' => 'required|numeric|gte:1',
            'is_published' => 'required|boolean',
            'location' => 'required',
            'map_url' => 'required',
            'mls_code' => 'required',
            'build_year' => 'required|numeric|gte:1',
            'property_size' => 'required|numeric|gte:1',
            'is_featured' => 'required|boolean',
            'listing_type' => ["required", "in:$availableListingTypes"],
            'amenities' => ["nullable", 'array'],
            'category' => ["nullable"],
            'category_attributes' => ["nullable", "array"],
        ];
    }
}
