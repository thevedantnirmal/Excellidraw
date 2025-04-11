import express from 'express';
import {JWT_SECRET} from '@repo/backend-common/config'
import jwt from '@repo/backend-common/jwt'
import {client} from '@repo/database/client'
import {CreateRoomScema, SignUpSchema,SignInSchema} from '@repo/common/ZodScema'
import { AuthMiddleware } from './middleware/AuthMiddleware.js';
import cors from 'cors'
const app=express();
app.use(express.json())
app.use(cors())
//@ts-ignore
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
    
   try{ await client.user.create({data:{name:name,password:password,email}})
   res.json({
    message:"Successfully Signed Up"
})
}
   catch{
    res.json({
        message:"User already exists"
    })
   } 
})
app.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
   const val= SignInSchema.safeParse({email,password})
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
app.post("/room",AuthMiddleware,async(req,res)=>{
 
    const parsedData=CreateRoomScema.safeParse(req.body)
    console.log(req.body)
    if(!parsedData.success){
        res.json({
            message:"Enter correct format of slug"
        })
        return;
    }
       //@ts-ignore
    const userId=req.userId;
   
     try{
      const room= await client.room.create({data:{
            name:parsedData.data.name,
            slug:parsedData.data.name,
            adminId:userId
        }})
        res.json({
            message:"Room Created",
            roomId:room.id
        })
     }
     catch{
         res.status(411).json({
            message:"Room already exists"
         })
     }

    })

 app.get("/chat/:roomId",async(req,res)=>{
    const roomId=Number(req.params.roomId)
    
    if(isNaN(roomId)) {
        res.json({
            messsage:"Enter the correvt roomId"
        })
        return ;
    }
  try{  const chats= await client.chat.findMany({
        where:{
            roomId
        },
        take:50,
        orderBy:{
            id:"desc"
        }
        
    })
    res.json(chats)}
    catch{
        res.json({
            mesage:"Enable to fetch the chats"
        })
    }
 })   

 app.get('/room/:slug',async(req,res)=>{
    const slug=req.params.slug;
    try{
    const room=await client.room.findFirst({
        where:{
            slug
        }
        
    })
  res.json({
    room
  })
}
    catch{
         res.status(401).json({
           message:"Enable to get id"
         })
         return ;
    }
 })
app.listen(3001);