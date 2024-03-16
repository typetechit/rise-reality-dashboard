<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategoryDemoDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = $this->getCategoriesData();

        foreach ($categories as $category){
            Category::factory()->create($category);
        }
    }

    private function getCategoriesData()
    {
        $blogCategories = [
            [
                'name' => 'Blog Category 1',
                'slug' => Str::slug('Blog Category 1'),
                'type' => 'blog'
            ],
            [
                'name' => 'Blog Category 2',
                'slug' => Str::slug('Blog Category 2'),
                'type' => 'blog'
            ],
            [
                'name' => 'Blog Category 3',
                'slug' => Str::slug('Blog Category 3'),
                'type' => 'blog'
            ]
        ];
        $propertyCategories = [
            [
                'name' => 'Property Category 1',
                'slug' => Str::slug('Property Category 1'),
                'type' => 'property'
            ],
            [
                'name' => 'Property Category 2',
                'slug' => Str::slug('Property Category 2'),
                'type' => 'property'
            ],
            [
                'name' => 'Property Category 3',
                'slug' => Str::slug('Property Category 3'),
                'type' => 'property'
            ],
        ];

        return array_merge($blogCategories, $propertyCategories);
    }
}
