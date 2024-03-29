<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = $this->getPostsData();

        DB::table('posts')->insert($posts);
    }

    private function getPostsData()
    {
        return [
            [
                "id" => 1,
                "user_id" => User::query()->inRandomOrder()->first()->id,
                "title" => "Unlocking Success: Navigating Medical Spa Space Rentals in Miami",
                "description" => "Firstly, Miami is known as a prime tourist destination due to its beautiful beaches and sunny weather. This makes it an ideal location for a medical spa as it can attract clients from both the local population and tourists seeking relaxation and self-care services. Therefore, when renting a medical spa space in Miami, it is important to choose a location that is easily accessible and visible to these potential clients. This could mean being in a popular area with high foot traffic or in a tourist hotspot.",
                "is_published" => true
            ]
        ];
    }
}
