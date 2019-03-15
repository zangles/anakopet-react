<?php

use App\Contact;
use App\Pet;
use App\Turn;
use App\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FeedSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        for ($i = 0; $i < 50; $i++) {
            $contact = Contact::create([
                'name' => $faker->name(),
                'email' => $faker->email(),
                'address' => $faker->address(),
                'phone' => $faker->phoneNumber(),
                'description' => $faker->paragraph(5)
            ]);

            for ($j = 0; $j < 2; $j++) {
                $pets = factory(Pet::class)->create([
                    'contact_id' => $contact->id,
                    'name' => $faker->name(),
                    'sex' => $faker->randomElement(['M','F']),
                    'desexed' => $faker->randomElement(['Y','N']),
                    'breed' => $faker->word(),
                    'age' => $faker->randomNumber(1),
                    'notes' => $faker->paragraph(3)
                ]);
            }

        }

        for ($i = 0; $i < 150; $i++) {

            $date = $faker->dateTimeBetween('-2 mouth', '+ 60 days')->format('Y-m-d H:i:s');

            $turns[] = Turn::create([
                'contact_id' =>  Contact::orderBy(DB::raw('RAND()'))->get()->first()->id,
                'date' => $date,
                'turn_type_id' => $faker->randomElement([1,2,3,4])
            ]);
        }

    }
}
