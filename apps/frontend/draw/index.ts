import { BACKEND_URL } from "@/config";
import axios from "axios";

export async function initDraw(canvas:HTMLCanvasElement,roomId:string,socket:WebSocket ){
   type Shape={
        type:"rect",
        StartX:number,
        StartY:number,
        height:number,
        width:number
    }|{
        type:"circle",
        CenterX:number,
        CenterY:number,
        radius:number

    }

    
    const ctx=canvas.getContext("2d")
    

    
    let existingShape:Shape[]=await getExistingShape(roomId)
    if(!ctx){return}
    
    socket.onmessage = (event) => {
        console.log("Control reaches here")
        const message = JSON.parse(event.data);
        console.log(message)

        if (message.type == "chat") {
            const parsedShape = JSON.parse(message.message)
            existingShape.push(parsedShape)
            clearCanvas(existingShape, canvas, ctx);
        }
    }
    clearCanvas(existingShape,canvas,ctx)

    
 
    // ctx.fillStyle="rgba(0,0,0)"
    // ctx.fillRect(0,0,canvas.width,canvas.height);

            //ctx.strokeRect(50,50,50,50)
        let click=false
        let startX=0;
        let startY=0;
        let endX=0;
        let endY=0;
            canvas.addEventListener("mousedown",(e)=>{
                click=true
                startX=e.clientX
                startY=e.clientY
            })
            canvas.addEventListener("mouseup",(e)=>{
                click=false
                endX=e.clientX;
                endY=e.clientY;
                const height=endY-startY;
                const width=endX-startX
                existingShape.push({
                    type:"rect",
                    StartX:startX,
                    StartY:startY,
                    width,height

                })
                
                    socket.send(JSON.stringify({
                        type:"chat",
                        roomId:Number(roomId),
                        message:JSON.stringify({
                            type:"rect",
                    StartX:startX,
                    StartY:startY,
                    width,height
                        })
                    }))
                


            })
            canvas.addEventListener("mousemove",(e)=>{
                if(click){
                let width=e.clientX-startX;
                let height=e.clientY-startY;
                clearCanvas(existingShape,canvas,ctx)
                ctx.strokeStyle="rgba(255,255,255)"
                ctx.strokeRect(startX,startY,width,height)
                
                
            }})
        
     function clearCanvas(existingShape:Shape[],canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){

                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.fillStyle="rgba(0,0,0)"
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.strokeStyle="rgba(255,255,255)"
                //ctx.strokeRect(startX,startY,width,height)

                existingShape.map((shape,index)=>{
                    if(shape.type=="rect"){
                        ctx.strokeStyle="rgba(255,255,255)"
                        ctx.strokeRect(shape.StartX,shape.StartY,shape.width,shape.height)
                    }
                })
     }   
        async function  getExistingShape(roomId:string){
            const getChats=await axios.get(`${BACKEND_URL}/chat/${roomId}`)
            const shapes=getChats?.data.map((x: {message: string})=>JSON.parse(x.message))
            return shapes
            
            

        }
        
        }
