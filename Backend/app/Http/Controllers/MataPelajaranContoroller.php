<?php

namespace App\Http\Controllers;

use App\Models\MataPelajaran;
use Illuminate\Http\Request;

class MataPelajaranContoroller extends Controller
{
    public function index()
    {
        $data = MataPelajaran::all();

        if ($data->isEmpty()) {
            return response()->json([
                'message' => 'Data Mata Pelajaran Masih Kosong'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Berhasil Get All Data Mata Pelajaran',
                'data' => $data
            ], 200);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_mapel' => 'required',
            'jenjang' => 'required|in:TK,SD,SMP,SMA,SMK,Kelas Tambahan',
            'kelas' => 'required|in:TK,1,2,3,4,5,6,7,8,9,10,11,12',
            'keterangan' => 'nullable'
        ]);

        $mapel = new MataPelajaran();

        $mapel->nama_mapel = $request->nama_mapel;
        $mapel->jenjang = $request->jenjang;
        $mapel->kelas = $request->kelas;
        $mapel->keterangan = $request->keterangan;

        if ($mapel->save()) {
            return response()->json([
                'message' => 'Mata Pelajaran Berhasil Ditambahkan',
                'data' => $mapel
            ], 201);
        } else {
            return response()->json([
                'message' => 'Mata Pelajaran Gagal Ditambahkan',
            ], 500); // 500 Internal Server Error
        }
    }

    public function indexbyid($id)
    {
        $mapel = MataPelajaran::find($id);

        if ($mapel == null) {
            return response()->json([
                'message' => 'ID Siswa Tidak Ditemukan',
            ], 404);
        } else {
            return response()->json([
                'message' => 'Berhasil Get Data Siswa Dengan ID ' . $id,
                'data' => $mapel
            ], 200);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_mapel' => 'required',
            'jenjang' => 'required|in:TK,SD,SMP,SMA,SMK,Kelas Tambahan',
            'kelas' => 'required|in:TK,1,2,3,4,5,6,7,8,9,10,11,12',
            'keterangan' => 'nullable'
        ]);

        $mapel = MataPelajaran::find($id);

        if ($mapel == null) {
            return response()->json([
                'message' => 'ID Mata Pelajaran Tidak Ditemukan'
            ], 404);
        } else {
            $mapel->nama_mapel = $request->nama_mapel;
            $mapel->jenjang = $request->jenjang;
            $mapel->kelas = $request->kelas;
            $mapel->keterangan = $request->keterangan;

            if($mapel->save()){
                return response()->json([
                    'message' => 'Mata Pelajaran Berhasil Diperbarui',
                    'data' => $mapel
                ], 200);
            }else{
                return response()->json([
                    'message' => 'Mata Pelajaran Gagal Diperbarui'
                ], 500);
            }
        }
    }

    public function destroy($id)
    {
        $mapel = MataPelajaran::find($id);

        if($mapel == null){
            return response()->json([
                'message' => 'ID Mata Pelajaran Tidak Ditemukan'
            ], 404);
        }else{
            if($mapel->delete()){
                return response()->json([
                    'message' => 'Mata Pelajaran Berhasil Dihapus'
                ], 200);
            }else{
                return response()->json([
                    'message' => 'Mata Pelajaran Gagal Dihapus'
                ], 500);
            }
        }
    }
}
