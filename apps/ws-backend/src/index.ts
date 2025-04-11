import { WebSocket, WebSocketServer } from 'ws';
import jwt from '@repo/backend-common/jwt'
import {JWT_SECRET} from '@repo/backend-common/config';
import {client} from '@repo/database/client'
const wss=new WebSocketServer({port:8080})
interface User{
  ws:WebSocket,
  userId:string,
  rooms:string[],

}
const Users:User[]=[]
function checkUser(token:string):string|null{
 try{ const decoded=jwt.verify(token,JWT_SECRET)
  if(typeof(decoded)=="string"){
   
    return null

  }
  
  if(!decoded||!decoded.userId){
    
    return null;
  }
 return decoded.userId}
 catch{
  return null
 }
}

wss.on('connection',function connection(ws,request){
    const url=request.url;
    if (!url) {
        return;
      }
    const params=new URLSearchParams(url.split("?")[1]);
    const token=params.get("token");

    //@ts-ignore
    const userId=checkUser(token);
    if(!userId){
      ws.close();
      return;
    }
    Users.push({
     userId,rooms:[],ws
    })
    //Now there there will be only authenticated u here
    ws.on('message',async function message(data){
      const parsedData=JSON.parse(data as unknown as string)
      if(parsedData.type==="join_room"){
       const user=Users.find(x=>x.ws===ws)
       
       user?.rooms.push(parsedData.roomId)
      }
      if(parsedData.type==="close_room"){
        const user=Users.find(x=>x.ws===ws)
        if(!user) return
        //doubt  about this one
       user.rooms= user?.rooms.filter(x=>x===parsedData.room)

      }
      if(parsedData.type==="chat"){
        // const users=Users.filter(x=>x.rooms.includes(parsedData.room))
        // users.map((x)=>{
        //   ws.on('message',function message(data){
        //      x.ws.send(data)
        //   })
        // })
        const roomId=parsedData.roomId
        const message=parsedData.message
      try{ await client.chat.create({
          data:{message,roomId:Number(roomId),userId}
        })
}     
      catch(e){
        ws.send("Enable to accesss databse")
        ws.close
      }
      console.log("RoomID:",roomId)
      console.log("Users",Users.map((u)=>({
        userId:u.userId,
        rooms:u.rooms
      })));

         
         Users.forEach(user=>{
          if(user.rooms.includes(roomId)){
            user.ws.send(JSON.stringify({
              type:"chat",
              message,roomId
          
            }))
          }
         })

      }

    })
})