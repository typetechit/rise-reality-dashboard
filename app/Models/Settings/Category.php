<?php

namespace App\Models\Settings;

use App\Models\Property\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'type'
    ];

    public function attributes()
    {
        return $this->belongsToMany(Attribute::class);
    }
}
