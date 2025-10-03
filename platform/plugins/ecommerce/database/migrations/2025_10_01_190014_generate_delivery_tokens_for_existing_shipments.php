<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Generar tokens para todos los envíos existentes que no tengan uno
        DB::table('ec_shipments')
            ->whereNull('delivery_token')
            ->orWhere('delivery_token', '')
            ->chunkById(100, function ($shipments) {
                foreach ($shipments as $shipment) {
                    DB::table('ec_shipments')
                        ->where('id', $shipment->id)
                        ->update([
                            'delivery_token' => Str::random(64),
                        ]);
                }
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No es necesario revertir
    }
};
