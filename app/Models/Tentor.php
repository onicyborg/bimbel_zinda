<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tentor extends Model
{
    use HasFactory;
    protected $table = 'tentor';
    protected $fillable = [
        'nama',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat',
        'asal_perguruan_tinggi',
        'jurusan',
        'pengalaman',
        'no_handphone',
        'email',
        'keterangan',
    ];

    public function jadwal()
    {
        return $this->hasMany(Jadwal::class, 'tentor_id', 'id');
    }
}
