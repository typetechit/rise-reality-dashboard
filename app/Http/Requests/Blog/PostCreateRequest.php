<?php

namespace App\Http\Requests\Blog;

use Illuminate\Foundation\Http\FormRequest;

class PostCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return !! auth()->id();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required',
            'description' => 'required',
            'featured_image' => 'required|file|mimes:jpg,jpeg,png',
            'gallery_images.*' => 'required|file|mimes:jpg,jpeg,png',
            'video_links' => 'required|array',
            'video_links.*' => 'required|url',
            'is_published' => 'required|boolean'
        ];
    }
}
