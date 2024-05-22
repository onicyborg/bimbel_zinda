<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MataPelajaran extends Model
{
    use HasFactory;
    protected $table = 'mata_pelajaran';
    protected $fillable = [
        'nama_mapel',
        'jenjang',
        'kelas',
        'keterangan',
    ];

    public function jadwal()
    {
        return $this->hasMany(Jadwal::class, 'mata_pelajaran_id', 'id');
    }
}
