import { useState } from "react"

export const Playground = ()=>{
    const [date, setDate] = useState()
    const dateObj = new Date(date)
    
    return(
    <>
    <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
    {console.log(dateObj.toLocaleString('id-ID', {day:'numeric', month:'long', year:'numeric'}))}
    </>)
}