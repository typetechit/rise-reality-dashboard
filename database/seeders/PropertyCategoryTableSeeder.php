<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PropertyCategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $propertyCategories = [
            [
                'id' => 1,
                'name' => "Apartment",
                "slug" => Str::slug("Apartment")
            ],
            [
                'id' => 2,
                'name' => "Condos",
                "slug" => Str::slug("Condos")
            ],
            [
                'id' => 3,
                'name' => "Houses",
                "slug" => Str::slug("Houses")
            ],
            [
                'id' => 4,
                'name' => "Industrial",
                "slug" => Str::slug("Industrial")
            ],
            [
                'id' => 5,
                'name' => "Land",
                "slug" => Str::slug("Land")
            ],
            [
                'id' => 6,
                'name' => "Offices",
                "slug" => Str::slug("Offices")
            ],
            [
                'id' => 7,
                'name' => "Retail",
                "slug" => Str::slug("Retail")
            ],
            [
                'id' => 8,
                'name' => "Warehouse",
                "slug" => Str::slug("Warehouse")
            ],
            [
                'id' => 9,
                'name' => "Single Family Home",
                "slug" => Str::slug("Single Family Home")
            ]
        ];

        DB::table('property_categories')->insert($propertyCategories);
    }
}
