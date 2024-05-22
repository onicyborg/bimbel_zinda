<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;

class SiswaController extends Controller
{
    public function index()
    {
        $data = Siswa::all();

        if ($data->isEmpty()) {
            return response()->json([
                'message' => 'Data Siswa Masih Kosong',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Berhasil Get All Data Siswa',
                'data' => $data
            ], 200); // 200 OK
        }
    }

    public function indexbyid($id)
    {
        $data = Siswa::find($id);

        if ($data != null) {
            return response()->json([
                'message' => 'Berhasil Get Data Siswa Dengan ID ' . $id,
                'data' => $data
            ], 200); // 200 OK
        } else {
            return response()->json([
                'message' => 'ID Siswa Tidak Ditemukan',
            ], 404); // 404 Not Found
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|string|in:Pria,Wanita',
            'alamat' => 'required|string|max:500',
            'nama_sekolah' => 'required|string|max:255',
            'jenjang' => 'required|string|in:TK,SD,SMP,SMA,SMK',
            'kelas' => 'required|string|max:5|in:TK,1,2,3,4,5,6,7,8,9,10,11,12',
            'nama_orangtua' => 'required|string|max:255',
            'no_handphone' => 'required|string|regex:/^([0-9\s\-\+\(\)]*)$/|min:10|max:15',
            'kekurangan' => 'nullable|string|max:500',
            'harapan_siswa' => 'nullable|string|max:500',
        ]);

        $siswa = new Siswa();
        $siswa->nama = $request->nama;
        $siswa->tempat_lahir = $request->tempat_lahir;
        $siswa->tanggal_lahir = $request->tanggal_lahir;
        $siswa->jenis_kelamin = $request->jenis_kelamin;
        $siswa->alamat = $request->alamat;
        $siswa->nama_sekolah = $request->nama_sekolah;
        $siswa->jenjang = $request->jenjang;
        $siswa->kelas = $request->kelas;
        $siswa->nama_orangtua = $request->nama_orangtua;
        $siswa->no_handphone = $request->no_handphone;
        $siswa->kekurangan = $request->kekurangan;
        $siswa->harapan_siswa = $request->harapan_siswa;

        if ($siswa->save()) {
            return response()->json([
                'message' => 'Siswa Berhasil Ditambahkan',
                'data' => $siswa,
            ], 201); // 201 Created
        } else {
            return response()->json([
                'message' => 'Siswa Gagal Ditambahkan',
            ], 500); // 500 Internal Server Error
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|string|in:Pria,Wanita',
            'alamat' => 'required|string|max:500',
            'nama_sekolah' => 'required|string|max:255',
            'jenjang' => 'required|string|in:TK,SD,SMP,SMA,SMK',
            'kelas' => 'required|string|max:5|in:TK,1,2,3,4,5,6,7,8,9,10,11,12',
            'nama_orangtua' => 'required|string|max:255',
            'no_handphone' => 'required|string|regex:/^([0-9\s\-\+\(\)]*)$/|min:10|max:15',
            'kekurangan' => 'nullable|string|max:500',
            'harapan_siswa' => 'nullable|string|max:500',
        ]);

        $siswa = Siswa::find($id);
        if ($siswa != null) {
            $siswa->nama = $request->nama;
            $siswa->tempat_lahir = $request->tempat_lahir;
            $siswa->tanggal_lahir = $request->tanggal_lahir;
            $siswa->jenis_kelamin = $request->jenis_kelamin;
            $siswa->alamat = $request->alamat;
            $siswa->nama_sekolah = $request->nama_sekolah;
            $siswa->jenjang = $request->jenjang;
            $siswa->kelas = $request->kelas;
            $siswa->nama_orangtua = $request->nama_orangtua;
            $siswa->no_handphone = $request->no_handphone;
            $siswa->kekurangan = $request->kekurangan;
            $siswa->harapan_siswa = $request->harapan_siswa;

            if ($siswa->save()) {
                return response()->json([
                    'message' => 'Siswa Berhasil Diperbarui',
                    'data' => $siswa,
                ], 200); // 200 OK
            } else {
                return response()->json([
                    'message' => 'Siswa Gagal Diperbarui',
                ], 500); // 500 Internal Server Error
            }
        } else {
            return response()->json([
                'message' => 'ID Siswa Tidak Ditemukan',
            ], 404); // 404 Not Found
        }
    }

    public function destroy($id)
    {
        $siswa = Siswa::find($id);
        if ($siswa != null) {
            if ($siswa->delete()) {
                return response()->json([
                    'message' => 'Siswa Berhasil Dihapus',
                ], 200); // 200 OK
            } else {
                return response()->json([
                    'message' => 'Siswa Gagal Dihapus',
                ], 500); // 500 Internal Server Error
            }
        } else {
            return response()->json([
                'message' => 'ID Siswa Tidak Ditemukan',
            ], 404); // 404 Not Found
        }
    }
}
