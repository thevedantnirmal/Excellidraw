"use client"
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export default function ChatRoomClient({messages,id}:{messages:{message:string}[];id:string}){
 
    const [chat,setChats]=useState(messages)
    const [currentMessage,setCurrentMessage]=useState("");
    const {socket,loading}=useSocket();
    useEffect(()=>{
        if(socket&&!loading){
            socket.send(JSON.stringify({
                type:"join_room",
                roomId:id
            }))
            socket.onmessage=(event)=>{
                 console.log('Message received:', event.data)
                const parsedData=JSON.parse(event.data)
                console.log(parsedData)
                if(parsedData.type==="chat"){
                    setChats(c=>[...c,{message:parsedData.message}])
                    console.log(chat)
                }
                
            }
            socket.onerror = (error) => console.error('WebSocket error:', error);
socket.onclose = () => console.log('WebSocket closed');

        }
    },[socket,loading,id])

    return <div>
        {
            chat.map((m,index)=><div key={index}>{m.message} </div>)

        }
        <input type="text" value={currentMessage} onChange={e=>{
            setCurrentMessage(e.target.value)}}></input>
        <button onClick={()=>{
            socket?.send(JSON.stringify({
                type:"chat",
                roomId:id,
                message:currentMessage
            }))
            setCurrentMessage("")}}>Send Message</button>
        
    </div>
}