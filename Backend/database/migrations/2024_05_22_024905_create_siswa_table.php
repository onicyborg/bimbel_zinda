<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('siswa', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->enum('jenis_kelamin', ['Pria', 'Wanita']);
            $table->text('alamat');
            $table->string('nama_sekolah');
            $table->enum('jenjang', ['TK', 'SD', 'SMP', 'SMA', 'SMK']);
            $table->enum('kelas', ['TK', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
            $table->string('nama_orangtua');
            $table->string('no_handphone');
            $table->text('kekurangan')->nullable();
            $table->text('harapan_siswa')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswa');
    }
};
