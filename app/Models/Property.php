<?php

namespace App\Models;

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
        'is_published',
        'price',
        'location',
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
            'amenities' => 'array',
            'category_attributes' => 'array'
        ];
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
