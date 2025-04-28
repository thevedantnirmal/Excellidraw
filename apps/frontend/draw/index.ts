import { BACKEND_URL } from "@/config";
import axios from "axios";

export async function initDraw(canvas:HTMLCanvasElement,roomId:string,socket:WebSocket){

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
    //@ts-ignore
    console.log(window.selectedShape)
    if(!ctx){return}
    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type == "chat") {
            const parsedShape = JSON.parse(message.message)
            existingShape.push(parsedShape.shape)
            clearCanvas(existingShape, canvas, ctx);
        }
    }
    clearCanvas(existingShape,canvas,ctx)
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
                let shape:Shape|null=null
                click=false
                endX=e.clientX;
                endY=e.clientY;
                const height=endY-startY;
                const width=endX-startX
                //@ts-ignore
                const selectedShape=window.selectedShape
                if(selectedShape==="rectangle"){
                 shape= {
                    type:"rect",
                    StartX:startX,
                    StartY:startY,
                    width,height

                }}
                if(selectedShape==="circle"){
                    const radius=Math.max(width,height)/2
                    shape={
                        type:"circle",
                        CenterX:startX+radius,
                        CenterY:startY+ radius,
                    radius:Math.max(width,height)/2                  
                 }
                }
                if(!shape) return;
                existingShape.push(shape)
                    socket.send(JSON.stringify({
                        type:"chat",
                        roomId:roomId,
                        message:JSON.stringify({
                           shape
                        })
                    }))
                })
            canvas.addEventListener("mousemove",(e)=>{
                if(click){
                    //@ts-ignore
                    const selectedShape=window.selectedShape
                let width=e.clientX-startX;
                let height=e.clientY-startY;
                clearCanvas(existingShape,canvas,ctx)
                if(selectedShape==="rectangle"){
                ctx.strokeStyle="rgba(255,255,255)"
                ctx.strokeRect(startX,startY,width,height)}
                else if(selectedShape==="circle"){
                    const radius=Math.max(width,height)/2;

                    const centerX=startX+ radius;
                    const CenterY=startY + radius;
                    ctx.beginPath();
                    ctx.arc(centerX,CenterY,radius,0,Math.PI*2);
                    ctx.stroke();
                    ctx.closePath();
                }
                
                
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
                    else if(shape.type==="circle"){
                        ctx.beginPath();
                        ctx.arc(shape.CenterX,shape.CenterY,shape.radius,0,Math.PI*2);
                        ctx.stroke();
                        ctx.closePath()
                    }
                })
     }   
        async function  getExistingShape(roomId:string){
            const getChats=await axios.get(`${BACKEND_URL}/chat/${roomId}`)
            const shapes=getChats?.data.map((x: {message: string})=>JSON.parse(x.message).shape)
            return shapes
            
            

        }
        
        }
