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
                "short_description" => "Firstly, Miami is known as a prime tourist destination due to its beautiful beaches and sunny weather. This makes it an ideal location for a medical spa as it can attract clients from both the local population and tourists seeking relaxation and self-care services. Therefore, when renting a medical spa space in Miami, it is important to choose a location that is easily accessible and visible to these potential clients. This could mean being in a popular area with high foot traffic or in a tourist hotspot.",
                "body" => "Miami is one of the top destinations for medical spa businesses due to its warm climate, beautiful beaches, and thriving tourism industry. As such, it’s no surpRISE that many companies are looking to rent medical spa spaces in this vibrant city. Also known as med spas, these facilities offer a range of services such as cosmetic treatments, wellness therapies, and medical procedures. However, with so many options available, it can be overwhelming to find the perfect space for your business. In this guide, we will discuss the top factors to consider when renting medical spa spaces in Miami. By keeping these factors in mind, you can make an informed decision and find the ideal space that meets all of your business needs.

Firstly, Miami is known as a prime tourist destination due to its beautiful beaches and sunny weather. This makes it an ideal location for a medical spa as it can attract clients from both the local population and tourists seeking relaxation and self-care services. Therefore, when renting a medical spa space in Miami, it is important to choose a location that is easily accessible and visible to these potential clients. This could mean being in a popular area with high foot traffic or in a tourist hotspot.",

            ]
        ];
    }
}
