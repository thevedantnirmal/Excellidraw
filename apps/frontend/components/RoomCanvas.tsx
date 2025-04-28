"use client"
import { WS_URL } from "@/config";
import axios from "axios";
import Canvas from "./Canvas";
import { useState } from "react";
import { useEffect } from "react";


export default  function RoomCanvas({roomId}:{roomId:string}){
    const [socket,setSocket]=useState<WebSocket|null>(null);
    const [token,setToken]=useState(" ")
    
    useEffect(()=>{
        
        setToken(localStorage.getItem("token") as unknown as string)

    },[])

   useEffect(()=>{
    if (!token) return;

    const ws=new WebSocket(`${WS_URL}?token=${token}`)
    ws.onopen=(event)=>{
        setSocket(ws)
        ws.send(JSON.stringify({
            type:"join_room",
            roomId
        }))
       
    }
    
   },[token])
   
    if (!socket) {
        return <div>
            Connecting to server....
        </div>
    }
    return <Canvas socket={socket} roomId={roomId}/>


}