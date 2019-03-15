<?php

use App\TurnType;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTurnTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('turns', function (Blueprint $table) {
            $table->unsignedInteger('turn_type_id');
            $table->date('date');
            $table->dropColumn('start');
            $table->dropColumn('end');
        });

        Schema::create('turn_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });


        $turnTypes = [
            'Morning (2hs)',
            'Noon (2Hs)',
            'Evening (2hs)',
            'Day Care (6hs)',
            'Full Day Care (12hs)',
            'Night Stay (24hs)'
        ];

        foreach ($turnTypes as $turnType) {
            factory(TurnType::class)->create([
                'name' => $turnType
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('turn_types');
    }
}
