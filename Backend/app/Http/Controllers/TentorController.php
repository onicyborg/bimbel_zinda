<?php

namespace App\Http\Controllers;

use App\Models\Tentor;
use Illuminate\Http\Request;

class TentorController extends Controller
{
    public function index()
    {
        $data = Tentor::all();

        if ($data->isEmpty()) {
            return response()->json([
                'message' => 'Data Tentor Masih Kosong',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Berhasil Get All Data Tentor',
                'data' => $data
            ], 200); // 200 OK
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
            'asal_perguruan_tinggi' => 'required|string|max:255',
            'jurusan' => 'required|string|max:255',
            'pengalaman' => 'required|string|max:1000',
            'no_handphone' => 'required|string|regex:/^([0-9\s\-\+\(\)]*)$/|min:10|max:15',
            'email' => 'required|email|max:255',
            'keterangan' => 'nullable|string|max:1000',
        ]);

        $tentor = new Tentor();
        $tentor->nama = $request->nama;
        $tentor->tempat_lahir = $request->tempat_lahir;
        $tentor->tanggal_lahir = $request->tanggal_lahir;
        $tentor->jenis_kelamin = $request->jenis_kelamin;
        $tentor->alamat = $request->alamat;
        $tentor->asal_perguruan_tinggi = $request->asal_perguruan_tinggi;
        $tentor->jurusan = $request->jurusan;
        $tentor->pengalaman = $request->pengalaman;
        $tentor->no_handphone = $request->no_handphone;
        $tentor->email = $request->email;
        $tentor->keterangan = $request->keterangan;

        if ($tentor->save()) {
            return response()->json([
                'message' => 'Data Tentor Berhasil Disimpan',
                'data' => $tentor
            ], 201); // 201 Created
        } else {
            return response()->json([
                'message' => 'Data Tentor Gagal Disimpan',
            ], 500); // 500 Internal Server Error
        }
    }

    public function indexbyid($id)
    {
        $data = Tentor::find($id);

        if ($data != null) {
            return response()->json([
                'message' => 'Berhasil Get Data Tentor Dengan ID ' . $id,
                'data' => $data
            ], 200); // 200 OK
        } else {
            return response()->json([
                'message' => 'ID Tentor Tidak Ditemukan',
            ], 404); // 404 Not Found
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
            'asal_perguruan_tinggi' => 'required|string|max:255',
            'jurusan' => 'required|string|max:255',
            'pengalaman' => 'required|string|max:1000',
            'no_handphone' => 'required|string|regex:/^([0-9\s\-\+\(\)]*)$/|min:10|max:15',
            'email' => 'required|email|max:255',
            'keterangan' => 'nullable|string|max:1000',
        ]);

        $tentor = Tentor::find($id);

        if ($tentor != null) {
            $tentor->nama = $request->nama;
            $tentor->tempat_lahir = $request->tempat_lahir;
            $tentor->tanggal_lahir = $request->tanggal_lahir;
            $tentor->jenis_kelamin = $request->jenis_kelamin;
            $tentor->alamat = $request->alamat;
            $tentor->asal_perguruan_tinggi = $request->asal_perguruan_tinggi;
            $tentor->jurusan = $request->jurusan;
            $tentor->pengalaman = $request->pengalaman;
            $tentor->no_handphone = $request->no_handphone;
            $tentor->email = $request->email;
            $tentor->keterangan = $request->keterangan;

            if ($tentor->save()) {
                return response()->json([
                    'message' => 'Data Tentor Berhasil Diperbarui',
                    'data' => $tentor
                ], 200); // 200 OK
            } else {
                return response()->json([
                    'message' => 'Data Tentor Gagal Diperbarui',
                ], 500); // 500 Internal Server Error
            }
        } else {
            return response()->json([
                'message' => 'Data Tentor Tidak Ditemukan',
            ], 404); // 404 Not Found
        }
    }

    public function destroy($id)
    {
        $siswa = Tentor::find($id);
        if ($siswa != null) {
            if ($siswa->delete()) {
                return response()->json([
                    'message' => 'Tentor Berhasil Dihapus',
                ], 200); // 200 OK
            } else {
                return response()->json([
                    'message' => 'Tentor Gagal Dihapus',
                ], 500); // 500 Internal Server Error
            }
        } else {
            return response()->json([
                'message' => 'ID Tentor Tidak Ditemukan',
            ], 404); // 404 Not Found
        }
    }
}
