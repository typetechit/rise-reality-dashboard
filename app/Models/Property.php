<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'country_id',
        'category_id',

        'title',
        'description',
        'content',
        'featured_image',
        'gallery_images',
        'video_links',
        'is_published',
        'price',
        'location',
        'map_url',
        'mls_code',
        'build_year',
        'property_size',
        'is_featured',
        'listing_type',
        'amenities',
        'category_attributes',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'gallery_images' => 'array',
            'video_links' => 'array',
            'amenities' => 'array',
            'category_attributes' => 'array'
        ];
    }

    /**
     * Get the post's featured image.
     *
     * @return Attribute
     */
    protected function featuredImage(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => asset('storage/'.$value),
        );
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
