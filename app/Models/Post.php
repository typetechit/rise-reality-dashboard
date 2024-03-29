<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'featured_image',
        'is_published',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
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
}
