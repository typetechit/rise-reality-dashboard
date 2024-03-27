<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\PropertyCategory;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PropertyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $properties = [
            [
                "id" => 1,
                "user_id" => User::factory()->create(['role' => 'PROPERTY_AGENT'])->id || null,
                "country_id" => Country::query()->inRandomOrder()->first()->id,
                "property_category_id" => PropertyCategory::query()->inRandomOrder()->first()->id,
                "title" => "3560 NW 72nd Ave, Miami, FL 33122 – Office Sublease",
                "short_description" => "Introducing RISE Realty’s Exceptional Office Science Lab for Sublease in the Class A Converge Miami Tech Office Building Welcome to an extraordinary opportunity at Converge Miami, where RISE Realty proudly presents a remarkable 4,006 square feet of office space specifically designed as a cutting-edge Science Lab. Situated within the esteemed Class A Converge Miami Tech Office Building, this space offers a rare permit for a Science Lab, catering to niche tenant-uses within Miami’s thriving technology landscape. Conveniently located just north of the Jackson Healthcare and University of Miami Hospital District, this exceptional facility is perfectly positioned to serve the growing demands of the vibrant Miami market.",
                "full_description" => "Don't miss the chance to secure this exceptional Office Science Lab within the Class A Converge Miami Tech Office Building. Contact RISE Realty today to schedule a viewing and explore the boundless business opportunities that await your innovation and growth. Disclaimer: The information provided above is for marketing purposes only and should not be considered as legal or professional advice. Interested parties are advised to conduct their own due diligence and seek appropriate guidance before entering into any lease agreements. 4,006 sq ft Office Science Lab for SubLease in convenient Class A Converge Miami tech office building. Rare permit for Science Lab to serve niche tenant-use within a top Tech Building for Miami just north of the Jackson Healthcare / University of Miami Hospital District. Raw space to be built out as SubTenant sees fit. Several Years remain on Lease Terms with quality Landlord in Class A building that’s centrally located with plenty of Parking.",
                "price" => 60000,
                'mls_code' => Str::random(4),
                'build_year' => now()->year,
                'property_size' => mt_rand(1000, 5000),
                'listing_type' => collect(['Lease', 'Rental', 'Sale'])->random(),
                'amenities' => json_encode([
                    "Air Conditioning",
                    "Gym",
                    "Microwave",
                    "Swimming Pool",
                    "WiFi"
                ]),
            ]
        ];
        $properties_info = [];

        DB::table('properties')->insert($properties);
        DB::table('property_info')->insert($properties_info);
    }
}
