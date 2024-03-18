<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AmenityTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $amenities = $this->getAmenitiesData();
        DB::table('amenities')->insert($amenities);
    }

    private function getAmenitiesData()
    {
        return [
            [
                "name" => "Air Conditioning",
            ],
            [
                "name" => "Gym",
            ],
            [
                "name" => "Microwave",
            ],
            [
                "name" => "Swimming Pool",
            ],
            [
                "name" => "Wifi",
            ],
            [
                "name" => "Barbeque",
            ],
            [
                "name" => "Recreation",
            ],
            [
                "name" => "Basketball Court",
            ],
            [
                "name" => "Fireplace",
            ],
            [
                "name" => "Refrigerator",
            ],
            [
                "name" => "Window Covering",
            ],
            [
                "name" => "Washer",
            ],
            [
                "name" => "24x7 Support",
            ],
            [
                "name" => "Indoor Game"
            ],
        ];
    }
}
