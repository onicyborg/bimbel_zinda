import { useState, useEffect } from "react";
import axios from "axios";

const Datatentor = ()=>{
    const url = "http://127.0.0.1:8000/api/tentor/index"
    const [tentor, setTentor] = useState([]);
    
    useEffect(()=>{
        const getTentor = async ()=>{
            try {
            const res = await axios.get(url)
            setTentor(res.data);
            } catch (error) {
                console.error(error)
            }
        }
        
        getTentor();
    }, [])
    return(
<div className="container">
    <table className="table">
    <thead>
      <tr>
        <th scope="col">Nama</th>
        <th scope="col">Asal Sekolah</th>
        <th scope="col">Alamat</th>
        <th scope="col">Pendidikan</th>
        <th scope="col">Pengalaman</th>
        <th scope="col">Keterangan</th>
      </tr>
    </thead>
    <tbody>
      
    {tentor && tentor.map((i)=>{
            return(
            <tr key={i.id_tentor}>
                <td>{i.nama}</td>
                <td>{i.asal_sekolah}</td>
                <td>{i.alamat}</td>
                <td>{i.pendidikan}</td>
                <td>{i.pengalaman}</td>
                <td>{i.keterangan}</td>
            </tr>
            )
        })}
    </tbody>
  </table>
</div>
  )
}
export default Datatentor