<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PropertyAgentUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $agents = [
            [
                "id" => 2,
                "name" => "Agent 1",
                "email" => "agent-1@email.com",
                "password" => "password",
                "role" => "PROPERTY_AGENT"
            ]
        ];

        DB::table('users')->insert($agents);
    }
}
