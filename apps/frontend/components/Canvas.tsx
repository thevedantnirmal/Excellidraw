"use client"
import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";

export default function Canvas({socket,roomId}:{socket:WebSocket,roomId:string}){
    const canvasRef=useRef<HTMLCanvasElement>(null)
    useEffect(()=>{
        if(canvasRef.current){
            const canvas=canvasRef.current;
            initDraw(canvas,roomId,socket)
        }

    },[canvasRef])
    return <div>

        <canvas ref={canvasRef} height={1200} width={2000}></canvas>
    </div>
}