<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use Illuminate\Http\Request;

class JadwalController extends Controller
{
    public function index()
    {
        $jadwal = Jadwal::with('siswa', 'tentor', 'mata_pelajaran')->get();

        if ($jadwal->isEmpty()) {
            return response()->json([
                'message' => 'Data Jadwal Masih Kosong'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Berhasil Get All Data Jadwal',
                'data' => $jadwal
            ], 200);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'jam_mulai' => 'required|date_format:H:i', // Format waktu HH:MM
            'jam_selesai' => 'required|date_format:H:i|after:jam_mulai', // Format waktu HH:MM dan setelah jam_mulai
            'keterangan' => 'nullable|string', // Opsional, jika ada harus berupa string
            'siswa_id' => 'required|exists:siswa,id', // Harus ada di tabel siswas
            'tentor_id' => 'required|exists:tentor,id', // Harus ada di tabel tentors
            'mata_pelajaran_id' => 'required|exists:mata_pelajaran,id', // Harus ada di tabel mata_pelajarans
        ]);

        $jadwal = new Jadwal();

        $jadwal->hari = $request->hari;
        $jadwal->jam_mulai = $request->jam_mulai;
        $jadwal->jam_selesai = $request->jam_selesai;
        $jadwal->keterangan = $request->keterangan;
        $jadwal->siswa_id = $request->siswa_id;
        $jadwal->tentor_id = $request->tentor_id;
        $jadwal->mata_pelajaran_id = $request->mata_pelajaran_id;

        if ($jadwal->save()) {
            return response()->json([
                'message' => 'Jadwal Berhasil Ditambahkan',
                'data' => $jadwal
            ], 201);
        } else {
            return response()->json([
                'message' => 'Jadwal Gagal Ditambahkan'
            ], 500);
        }
    }

    public function indexbyid($id)
    {
        $jadwal = Jadwal::with('siswa', 'tentor', 'mata_pelajaran')->find($id);

        if ($jadwal != null) {
            return response()->json([
                'message' => 'Berhasil Get Data Jadwal Dengan ID ' . $id,
                'data' => $jadwal
            ], 200);
        } else {
            return response()->json([
                'message' => 'ID Jadwal Tidak Ditemukan'
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'jam_mulai' => 'required|date_format:H:i', // Format waktu HH:MM
            'jam_selesai' => 'required|date_format:H:i|after:jam_mulai', // Format waktu HH:MM dan setelah jam_mulai
            'keterangan' => 'nullable|string', // Opsional, jika ada harus berupa string
            'siswa_id' => 'required|exists:siswa,id', // Harus ada di tabel siswas
            'tentor_id' => 'required|exists:tentor,id', // Harus ada di tabel tentors
            'mata_pelajaran_id' => 'required|exists:mata_pelajaran,id', // Harus ada di tabel mata_pelajarans
        ]);

        $jadwal = Jadwal::find($id);

        if ($jadwal != null) {
            $jadwal->hari = $request->hari;
            $jadwal->jam_mulai = $request->jam_mulai;
            $jadwal->jam_selesai = $request->jam_selesai;
            $jadwal->keterangan = $request->keterangan;
            $jadwal->siswa_id = $request->siswa_id;
            $jadwal->tentor_id = $request->tentor_id;
            $jadwal->mata_pelajaran_id = $request->mata_pelajaran_id;

            if ($jadwal->save()) {
                return response()->json([
                    'message' => 'Jadwal Berhasil Diperbarui',
                    'data' => $jadwal
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Jadwal Gagal Diperbarui'
                ], 500);
            }
        }else{
            return response()->json([
                'message' => 'ID Jadwal Tidak Ditemukan'
            ], 404);
        }
    }

    public function destroy($id)
    {
        $jadwal = Jadwal::find($id);

        if($jadwal != null){
            if($jadwal->delete()){
                return response()->json([
                    'message' => 'Jadwal Berhasil Dihapus'
                ], 200);
            }else{
                return response()->json([
                    'message' => 'Jadwal Gagal Dihapus'
                ], 500);
            }
        }else{
            return response()->json([
                'message' => 'ID Jadwal Tidak Ditemukan'
            ], 404);
        }
    }
}
