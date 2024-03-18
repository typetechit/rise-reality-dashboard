<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = $this->getCategoriesData();

        DB::table('categories')->insert($categories);
    }

    private function getCategoriesData(): array
    {
        return [
            [
                'id' => 1,
                'name' => "Apartment",
                "slug" => Str::slug("Apartment"),
                "type" => 'property'
            ],
            [
                'id' => 2,
                'name' => "Condos",
                "slug" => Str::slug("Condos"),
                "type" => 'property'
            ],
            [
                'id' => 3,
                'name' => "Houses",
                "slug" => Str::slug("Houses"),
                "type" => 'property'
            ],
            [
                'id' => 4,
                'name' => "Industrial",
                "slug" => Str::slug("Industrial"),
                "type" => 'property'
            ],
            [
                'id' => 5,
                'name' => "Land",
                "slug" => Str::slug("Land"),
                "type" => 'property'
            ],
            [
                'id' => 6,
                'name' => "Offices",
                "slug" => Str::slug("Offices"),
                "type" => 'property'
            ],
            [
                'id' => 7,
                'name' => "Retail",
                "slug" => Str::slug("Retail"),
                "type" => 'property'
            ],
            [
                'id' => 8,
                'name' => "Warehouse",
                "slug" => Str::slug("Warehouse"),
                "type" => 'property'
            ],
            [
                'id' => 9,
                'name' => "Single Family Home",
                "slug" => Str::slug("Single Family Home"),
                "type" => 'property'
            ]
        ];
    }
}
