<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AttributeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $attributes = $this->getAttributesData();

        DB::table('attributes')->insert($attributes);
    }

    public function getAttributesData()
    {
        return [
            ["name" => "Living Room", "icon" => "IconName"],
            ["name" => "Garage", "icon" => "IconName"],
            ["name" => "Dining Area", "icon" => "IconName"],
            ["name" => "Bedroom", "icon" => "IconName"],
            ["name" => "Bathroom", "icon" => "IconName"],
            ["name" => "Gym Area", "icon" => "IconName"],
            ["name" => "Garden", "icon" => "IconName"],
            ["name" => "Parking", "icon" => "IconName"],
        ];
    }
}
