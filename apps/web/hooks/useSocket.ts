"use client"
import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){
    const [loading,setLoading]=useState(true);
    const [socket,setSocket]=useState<WebSocket>();
    useEffect(()=>{
        //token
        const ws= new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYjFlZmM1YS05MGE1LTQ2YmEtOTUwOS0wYTM3ZGIwZjIzMjYiLCJpYXQiOjE3NDM2MjIxMzh9.srt6ydkQf4KOOi9u1YdZMjb35G-7319VgbC1hyZTJkc`)
        console.log(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYjFlZmM1YS05MGE1LTQ2YmEtOTUwOS0wYTM3ZGIwZjIzMjYiLCJpYXQiOjE3NDM2MjIxMzh9.srt6ydkQf4KOOi9u1YdZMjb35G-7319VgbC1hyZTJkc`)
        ws.onopen=()=>{
            console.log('WebSocket connection opened');
            setLoading(false);
            setSocket(ws)
        }
       

    },[])

    return {
        socket,loading
    }
}