<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersSeeders extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'email' => 'kaliorikalibagorbanyumas@gmail.com',
                'password' => Hash::make('6januari2000'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
