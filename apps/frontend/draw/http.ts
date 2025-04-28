import { BACKEND_URL } from "@/config"
import axios from "axios"
import { headers } from "next/headers"

export async function  getExistingShape(roomId:string){
    try{
    const getChats=await axios.get(`${BACKEND_URL}/chat/${roomId}`,{
        headers:{token:localStorage.getItem("token")}
        
    })
    const shapes=getChats?.data.map((x: {message: string})=>JSON.parse(x.message).shape)
    return shapes

}
    catch(e){
        console.log(e)
        return
    }
    
    
    

}