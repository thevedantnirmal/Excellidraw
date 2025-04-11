import axios from "@repo/frontend-common/axios"
import { HTTP_URL } from "../app/config"
import ChatRoomClient from "./ChatRoomClient";

async function getChats(roomId:string){
  console.log(`${HTTP_URL}/chat/${roomId}`)
try{
  const response=await axios.get(`${HTTP_URL}/chat/${roomId}`,{
    headers: {
      token:`eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJWZWRhbnQiLCJpYXQiOjE3NDE5Mjc1OTAsImV4cCI6MTc0MjAxMzk5MH0.bHTnbKPPNMr5aS-MVVLUxP7jdVC_lBRcbO2PyMES-rw`
    }
  })
  console.log(response.data)
  return response.data}
  catch(e){
    console.log(e)
    return null
  }
}
export async function ChatRoom({id}:{id:string}){
    const messages=await getChats(id);
    console.log(messages)
    return <ChatRoomClient id={id} messages={messages}></ChatRoomClient>


}