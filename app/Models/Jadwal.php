<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    use HasFactory;
    protected $table = 'jadwal';
    protected $fillable = [
        'hari',
        'jam_mulai',
        'jam_selesai',
        'keterangan',
        'siswa_id',
        'tentor_id',
        'mata_pelajaran_id',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'siswa_id', 'id');
    }

    public function tentor()
    {
        return $this->belongsTo(Tentor::class, 'tentor_id', 'id');
    }

    public function mata_pelajaran()
    {
        return $this->belongsTo(MataPelajaran::class, 'mata_pelajaran_id', 'id');
    }
}
