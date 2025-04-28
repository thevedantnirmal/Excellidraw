"use client"
import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import Button from "./ui/button";
import { Circle, PencilIcon, RectangleHorizontal } from "lucide-react";
import { Game } from "@/draw/Game";
enum shapes{
    circle= "circle",rectangle= "rectangle",pencil="pencil"
 }
export default function Canvas({socket,roomId}:{socket:WebSocket,roomId:string}){
    
    const [selectedShape,setSelectedShape]=useState<shapes>(shapes.rectangle)
    const [game,setGame]=useState<Game>()
    const canvasRef=useRef<HTMLCanvasElement>(null)
    useEffect(()=>{
     game?.setSelectedShape(selectedShape)
    },[selectedShape,game])
    useEffect(()=>{
        if(canvasRef.current){
            const canvas=canvasRef.current;
            const g=new Game(canvas,roomId,socket)
            setGame(g)
            return ()=>{
                g?.destroy()
               }
        }
        

    },[canvasRef])
    return <div className="fixed left-0 top-0">
        {/* <div className="bg-slate-900 text-white">
            <Button onClick={()=>{}} size="sm" type="primary">Circle</Button>
        </div> */}
        <Topbar selectedShape={selectedShape} setSelectedShape={setSelectedShape}/>
        <div>
        <canvas ref={canvasRef} height={1200} width={2000}></canvas>
        </div>
    </div>
}
function Topbar({selectedShape,setSelectedShape}:{
    selectedShape:shapes, setSelectedShape:(s:shapes)=>void
}){
     return <div className="flex justify-items-start">
        <Button onClick={()=>setSelectedShape(shapes.rectangle) } size="sm" type="primary" 
            activated={selectedShape===shapes.rectangle}><RectangleHorizontal/></Button>
        <Button activated={selectedShape===shapes.circle} onClick={()=>setSelectedShape(shapes.circle)} size="sm" children={<Circle/>}type="primary" />
        <Button activated={selectedShape==shapes.pencil} onClick={()=>setSelectedShape(shapes.pencil)} size="sm" type="primary"><PencilIcon/></Button>
     </div>
}