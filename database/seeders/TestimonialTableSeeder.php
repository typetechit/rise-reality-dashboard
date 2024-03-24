<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestimonialTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonials = $this->getTestimonialsData();

        DB::table('testimonials')->insert($testimonials);
    }

    private function getTestimonialsData(): array
    {
        return [
            [
                "id" => "1",
                "name" => "Ty Barbo, CEO",
                "position" => "Sierra Capital Club",
                "company" => "Sierra Capital Club",
                "image" => "1.jpg",
                "comment" => "I had the pleasure of working with Michael Corkery in my search for the perfect office space for my company, and I cannot recommend his services highly enough. Michael demonstrated an unparalleled dedication to understanding our needs and preferences, showcasing several units that met our criteria."
            ],
            [
                "id" => "2",
                "name" => "Kelian Anderson",
                "position" => "selling Agents",
                "company" => "selling Agents",
                "image" => "2.jpg",
                "comment" => "Precious ipsum dolor sit amet consectetur adipisicing elit, sed dos mod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad min veniam, quis nostrud Precious ips um dolor sit amet, consecte"
            ],
            [
                "id" => "3",
                "name" => "Adam Joseph",
                "position" => "selling Agents",
                "company" => "selling Agents",
                "image" => "3.jpg",
                "comment" => "Precious ipsum dolor sit amet consectetur adipisicing elit, sed dos mod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad min veniam, quis nostrud Precious ips um dolor sit amet, consecte"
            ],
            [
                "id" => "4",
                "name" => "James Carter",
                "position" => "Jacob Williamselling Agents",
                "company" => "Jacob Williamselling Agents",
                "image" => "4.jpg",
                "comment" => "Precious ipsum dolor sit amet consectetur adipisicing elit, sed dos mod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad min veniam, quis nostrud Precious ips um dolor sit amet, consecte"
            ]
        ];
    }
}
