import RoomCanvas from "@/components/RoomCanvas";
import { initDraw } from "@/draw";
import { useEffect, useRef } from "react"

export default async function({params}:{params:{roomId:string}}){
    const roomId=(await params).roomId
    return <RoomCanvas roomId={roomId}/>
}