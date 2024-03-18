<?php

namespace App\Models;

use App\Models\Property\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    public function attributes()
    {
        return $this->belongsToMany(Attribute::class);
    }
}
