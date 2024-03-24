<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            CountryTableSeeder::class,
            StateTableSeeder::class,
            CitiesTableSeeder::class,
            AdminUserSeeder::class,
            PropertyAgentUserSeeder::class,
            PostTableSeeder::class,
            AmenityTableSeeder::class,
            CategoryTableSeeder::class,
            AttributeTableSeeder::class,
            CategoryAttributeSeeder::class,
            FaqTableSeeder::class,
            TestimonialTableSeeder::class
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
