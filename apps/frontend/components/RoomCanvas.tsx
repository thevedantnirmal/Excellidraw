"use client"
import { WS_URL } from "@/config";
import axios from "axios";
import Canvas from "./Canvas";
import { useState } from "react";
import { useEffect } from "react";


export default  function RoomCanvas({roomId}:{roomId:string}){
    const [socket,setSocket]=useState<WebSocket|null>(null);

   useEffect(()=>{
    const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYjFlZmM1YS05MGE1LTQ2YmEtOTUwOS0wYTM3ZGIwZjIzMjYiLCJpYXQiOjE3NDI2NTE5NTl9.mogqyKwZ6wXQvGJqwZmrupH7CUjMkPSnH56OieUF-Jg`)
    ws.onopen=(event)=>{
        setSocket(ws)
        ws.send(JSON.stringify({
            type:"join_room",
            roomId
        }))
       
    }
    
   },[])
   
    if (!socket) {
        return <div>
            Connecting to server....
        </div>
    }
    return <Canvas socket={socket} roomId={roomId}/>


}