<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    use HasFactory;
    protected $table = 'siswa';
    protected $fillable = [
        'nama',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat',
        'nama_sekolah',
        'jenjang',
        'kelas',
        'nama_orangtua',
        'no_handphone',
        'kekurangan',
        'harapan_siswa',
    ];

    public function jadwal()
    {
        return $this->hasMany(Jadwal::class, 'siswa_id', 'id');
    }
}
