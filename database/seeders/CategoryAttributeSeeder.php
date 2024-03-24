<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoryAttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoryAttributes = [
            [
                'category_id' => 1,
                'attribute_id' => 1,
            ],
            [
                'category_id' => 1,
                'attribute_id' => 2,
            ],
            [
                'category_id' => 1,
                'attribute_id' => 3,
            ],
            [
                'category_id' => 2,
                'attribute_id' => 1,
            ],
            [
                'category_id' => 2,
                'attribute_id' => 4,
            ],
        ];

        DB::table('attribute_category')->insert($categoryAttributes);
    }
}
