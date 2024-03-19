<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\InteractsWithMedia;

class Post extends Model
{
    use HasFactory;
    use InteractsWithMedia;

    protected $fillable = [
        'title',
        'description',
        'featured_image',
        'is_published'
    ];

    protected $imageDir = "posts_images";

    public function getFeaturedImageAttribute($value)
    {
        return $value ? asset('storage/' . $value) : asset('/img/defualt-avatar.png');

    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
