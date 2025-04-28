"use client"

import { useState } from "react"
import { signin, signup } from "./auth/http";
import { useRouter } from "next/navigation";
export default function AuthPage({isSignIn}
    :{isSignIn:boolean}
){

    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [name,setName]=useState("")
    const [errorMessage,setErrorMessage]=useState("")
    const router=useRouter()
    async function handleClick(){
        if(!isSignIn){ 
            const res= await signup(email,password,name)
            if(!res.status){
                setErrorMessage(res.message)
                // setPassword("")
                // setEmail("")
                // setName("")
                return
            }
            // setPassword("")
            // setEmail("")
            // setName("")
            router.push("/signin")

            
        }
        else{
            console.log("Sending:", email, password); // you'll see old values here

            const res=await signin(email,password)
            console.log(res)
            if(!res.status){
                setErrorMessage(res.message)
            //     setPassword("")
            // setEmail("")
            // setName("")
                return
            }
            // setPassword("")
            // setEmail("")
            // setName("")
            router.push("/canvas")
            
        }
        
        
    }
    

    return <div className="flex justify-center  items-center h-screen">

        <div className="flex flex-col transform -translate-y-10 shadow-xl bg-blue-50 rounded-md pt-4"  >
            <div className="flex justify-center pb-4">
                <h1 className="font-bold text-2xl">Collab Canvas</h1>
            </div>
        <div className="p-2">
            <label className="px-2 font-semibold text-lg" >Email</label>
            <input className=" border" placeholder=" Enter your email" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        {!isSignIn&& <div>
            <div className="p-2">
            <label className="pl-2 pr-[2.86rem] font-semibold text-lg" >Name</label>
            <input className=" border" placeholder=" Enter your name" onChange={(e)=>setName(e.target.value)}/>
        </div>
            
            
            </div>}
        <div className="p-2">
            <label className="pl-2 pr-[0.6rem] font-semibold text-lg" >Password</label>
            <input className="border rounded-xs" placeholder="  Enter your password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className="flex justify-center px-2 pt-2 pb-2">
        <button className="bg-blue-600 text-white px-7 py-2 rounded-md " onClick={()=>handleClick()} >{isSignIn?"Sign In":"Sign Up"}</button>
        </div>
        {errorMessage&&<div className="flex justify-center">
            <h3 className="text-red-800 pb-2">{errorMessage}</h3>
            </div>}
        {/* <div className="text-sm font-semibold flex justify-center pb-4">
            { (isSignIn)?(<link href={"/signup"} >Not Signed up? Sign up now!</link>)
            :(<link href={"/signin"} >Already signed up. Sign in now!</link>)}
        </div> */}
        
        </div>
    </div>

}
