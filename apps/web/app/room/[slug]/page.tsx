import axios from '@repo/frontend-common/axios'
import { HTTP_URL } from "../../config"
import { ChatRoom } from '../../../components/ChatRoom'

async function getRoomId(slug:string){

    try{const response=await axios.get(`${HTTP_URL}/room/${slug}`)
    return response.data.room.id

}
catch (e: any) {
    console.error("Axios Error:", e.response?.status, e.response?.data || e.message);
    return null; 
}

}

export default async function({params}:{params:{slug:string}}){
    const slug=(await params).slug

    const roomid= await getRoomId(String(slug))
    return <ChatRoom id={roomid}></ChatRoom>
}