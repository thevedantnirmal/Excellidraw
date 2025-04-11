import express from 'express';
import {JWT_SECRET} from '@repo/backend-common/config'
import {jwt} from '@repo/backend-common/jwt'
import {client} from '@repo/database/client'
import {CreateRoomScema, SignUpSchema,SignInSchema} from '@repo/common/ZodScema'
import { AuthMiddleware } from './middleware/AuthMiddleware.js';
const app=express();
app.post('/signup',async (req,res)=>{
    const {email,password,name}=req.body;
    try{
        const dataValidation=SignUpSchema.parse({email,password,name});

    }
    catch{
        res.json({
            message:"Enter the data in correct format"
        })
    }
    
    await client.user.create({data:{name:name,password:password,email}})
    res.json({
        message:"Successfully Signed Up"
    })
})
app.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
   const val= SignInSchema.safeParse(email,password)
   if(!val.success){
    res.json({"message":"Data not in coreect formate"})
    return;
   }
  const user= await client.user.findFirst({
    where:{
        email,password
    }
   })
if(!user){
    res.json({message:"user not found"})
    return 
}
const token=jwt.sign({userId:user?.id},JWT_SECRET)
res.json({
    token
})
})
app.post("/room",AuthMiddleware,(req,res)=>{
  

})
app.listen(3001);