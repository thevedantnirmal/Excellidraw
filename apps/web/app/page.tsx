'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const [value,setValue]=useState("")
  const rout=useRouter()
  return (
    <div style={{
      display:"flex",
      justifyContent:"space-around",
      alignItems: "center",
      height: "100vh",
      width: "100vw"
    }}>
      <div>
      <input type="text" value={value} onChange={(e)=>setValue(e.target.value)}/>

      <button onClick={()=>{rout.push(`/room/${value}`)}}>Get user</button> 
      
      </div>
      </div>
  );
}
