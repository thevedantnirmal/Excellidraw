"use client"
import { BACKEND_URL } from "@/config"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function(){
    const router=useRouter()
    //const [roomId,setRoomId]=useState("")
    const [token,setToken]=useState("")
    const [slug,setSlug]=useState("")
    
    async function getRoomId(slug:string){
        const id=await axios.get(`${BACKEND_URL}/room/${slug}`,{
           headers:{
               token:localStorage.getItem("token")||""
           }
        })
        return id.data.room.id

   }
    // useEffect(()=>{
    //   setRoomId(getRoomId(slug) as unknown as string)
    // },[token]) 
   
    const handleClick=async()=>{
        const roomId=await getRoomId(slug)
        console.log(roomId)
        router.push(`canvas/${roomId}`)
    }
    return <div className="flex justify-center items-center h-screen shadow-2xl ">
        <div className="flex flex-col bg-blue-100">
            <div>
            <label>Enter the slug</label>
            <input onChange={(e)=>setSlug(e.target.value)} className="border" placeholder=" Room Id"/>
            </div>
            <div className="flex justify-center">
            <button onClick={handleClick} className="bg-blue-600">Join Now</button>
            </div>
        </div>

        
        
    </div>
}