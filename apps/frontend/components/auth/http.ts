import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect } from "react";

export async function signup(email:string,password:string,name:string){

   try{ const data= await axios.post(`${BACKEND_URL}/signup`,{
        email,password,name
    })
 
return  {status:true}
}
catch(e){

    // @ts-ignore
    console.log(e)    // @ts-ignore

    return  {status:false,message:e.response.data.message}
}


}
export async function  signin(email:string,password:string) {
    if(!email){
        return {status:false , message:"Email is missing"}
    }
    if(!password){
        return {status:false , message:"Password is missing"}
    }
    try{const data=await axios.post(`${BACKEND_URL}/signin`,{
        email,password
    })
    localStorage.setItem("token",`${data.data.token}`)
    return {status:true}

}
    catch(e){
        //@ts-ignore
        return {status:false,message:e.response.data.message}
    }
}