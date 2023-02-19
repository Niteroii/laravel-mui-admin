<?php

namespace Database\Seeders;

use App\Models\User;
use Hash;
use Illuminate\Database\Seeder;
use Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $user = new User();

        $password = Str::random();

        $user->email = 'webmaster@arandutech.com.br';
        $user->password = Hash::make($password);
        $user->name = 'Usuário Master';
        $user->email_verified_at = now();

        $user->save();

        $this->command->info("User password generated: {$password}");
    }
}
