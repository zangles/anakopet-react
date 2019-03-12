<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\User::create([
            'name' => 'azure',
            'email' => 'azuresky07@gmail.com',
            'password' => Hash::make('septiembre08')
        ]);
    }
}
