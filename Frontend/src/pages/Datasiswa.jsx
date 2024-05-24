import { useState, useEffect } from "react";
import axios from "axios";

const Datasiswa = ()=>{
    const url = `127.0.0.1:8000/api/siswa/index`
    const [siswa, setSiswa] = useState([]);
    const [num, setNum] = useState(1);
    
    useEffect(()=>{
        const getSiswa = async ()=>{
            try {
            const res = await axios.get(url)
            setSiswa(res.data);
            console.log(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        
        getSiswa();
    }, [])
    return(
<div className="container">
    <table className="table">
    <thead>
      <tr>
        <th scope="col">Nama</th>
        <th scope="col">Tempat dan Tanggal Lahir</th>
        <th scope="col">Jenis Kelamin</th>
        <th scope="col">Alamat</th>
        <th scope="col">Nama Sekolah</th>
        <th scope="col">Jenjang Pendidikan</th>
        <th scope="col">Kelas</th>
        <th scope="col">Nama Orang Tua</th>
        <th scope="col">Nomor Handphone</th>
        <th scope="col">Kekurangan</th>
        <th scope="col">Catatan</th>
      </tr>
    </thead>
    <tbody>
      
    {siswa && siswa.map((i)=>{
            return(
            <tr key={i.id_siswa}>
                <td>{i.nama}</td>
                <td>{i.ttl}</td>
                <td>{i.jk}</td>
                <td>{i.alamat}</td>
                <td>{i.nama_sekolah}</td>
                <td>{i.jenjang}</td>
                <td>{i.kelas}</td>
                <td>{i.nama_ortu}</td>
                <td>{i.no_hp}</td>
                <td>{i.kekurangan}</td>
                <td>{i.catatan}</td>
            </tr>
            )
        })}
    </tbody>
  </table>
</div>
  )
}
export default Datasiswa