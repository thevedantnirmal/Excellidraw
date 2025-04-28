import { MouseEvent } from "react"
import { getExistingShape } from "./http"
import { eventNames } from "process"

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

    }|{
        type:"pencil",
        points:{x:number,y:number}[]
    }
export class Game{
    private canvas:HTMLCanvasElement
    private ctx:CanvasRenderingContext2D
    private existingShape:Shape[]
    private socket:WebSocket
    private roomId:string
    private startX=0
    private startY=0
    private endX=0;
    private endY=0;
    private click:boolean
    private selectedShape="circle"
    private isDrawing:boolean
    private points:{x:number,y:number}[]
    constructor(canvas:HTMLCanvasElement,roomId:string,socket:WebSocket){

        this.canvas=canvas
        this.ctx=canvas.getContext("2d")!
        this.roomId=roomId
        this.existingShape=[]
        this.points=[]
        this.click=false
        this.isDrawing=false
        this.init(),
        this.socket=socket
        this.initHandlers()
        this.mouseHandler()

    }
    destroy(){
        this.canvas.removeEventListener("mousedown",this.mouseDownHandler)
        this.canvas.removeEventListener("mouseup",this.mouseUpHandler)
        this.canvas.removeEventListener("mousemove",this.mouseMoveHandler)

    }
    setSelectedShape(shape:"circle"|"pencil"|"rectangle"){
        this.selectedShape=shape

    }
    async init(){
        this.existingShape=await getExistingShape(this.roomId)
        this.clearCanvas()

    }
    initHandlers(){
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
    
            if (message.type == "chat") {
                const parsedShape = JSON.parse(message.message)
                this.existingShape.push(parsedShape.shape)
                this.clearCanvas()
        }
    }}
     clearCanvas=()=>{
        
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.fillStyle="rgba(0,0,0)"
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.strokeStyle="rgba(255,255,255)"
        this.existingShape.map((shape,index)=>{
            if(shape.type=="rect"){
                this.ctx.strokeStyle="rgba(255,255,255)"
                this.ctx.strokeRect(shape.StartX,shape.StartY,shape.width,shape.height)
            }
            else if(shape.type==="circle"){
                this.ctx.beginPath();
                this.ctx.arc(shape.CenterX,shape.CenterY,Math.abs(shape.radius),0,Math.PI*2);
                this.ctx.stroke();
                this.ctx.closePath()
            }
            else if(shape.type==="pencil"){
                this.ctx.beginPath()
                shape.points.map((p,i)=>{
                    if(i==0) this.ctx.moveTo(p.x,p.y)
                        else this.ctx.lineTo(p.x,p.y)
                })
                this.ctx.stroke();
                this.ctx.closePath()
            }
        })
        
    }
    //@ts-ignore
    mouseDownHandler=(e)=>{
        
            this.click=true
            this.startX=e.clientX
            this.startY=e.clientY
    
    }
    //@ts-ignore
    mouseUpHandler=(e)=>{
        
            let shape:Shape|null=null
            this.click=false
            this.endX=e.clientX;
            this.endY=e.clientY;
            const height=this.endY-this.startY;
            const width=this.endX-this.startX
            //@ts-ignore
            const selectedShape=this.selectedShape
            if(selectedShape==="rectangle"){
             shape= {
                type:"rect",
                StartX:this.startX,
                StartY:this.startY,
                width,height

            }}
            if(selectedShape==="circle"){
                const radius=Math.max(width,height)/2
                shape={
                    type:"circle",
                    CenterX:this.startX+radius,
                    CenterY:this.startY+ radius,
                radius:Math.max(width,height)/2                  
             }
            }
            if(selectedShape==="pencil"){
               shape={
                type:"pencil",
                points:this.points
               }
               this.points=[]
            }
            if(!shape) return;
            this.existingShape.push(shape)
                this.socket.send(JSON.stringify({
                    type:"chat",
                    roomId:this.roomId,
                    message:JSON.stringify({
                       shape
                    })
                }))
            
    }//@ts-ignore
    mouseMoveHandler=(e)=>{
        if(this.click){
            //@ts-ignore
            const selectedShape=this.selectedShape
        let width=e.clientX-this.startX;
        let height=e.clientY-this.startY;
        this.clearCanvas()

        if(selectedShape==="rectangle"){
        this.ctx.strokeStyle="rgba(255,255,255)"
        this.ctx.strokeRect(this.startX,this.startY,width,height)}
        else if(selectedShape==="circle"){
            const radius=Math.max(width,height)/2;

            const centerX=this.startX+ radius;
            const CenterY=this.startY + radius;
            this.ctx.beginPath();
            this.ctx.arc(centerX,CenterY,Math.abs(radius),0,Math.PI*2);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        else if(selectedShape==="pencil"){
            const rect=this.canvas.getBoundingClientRect();
            const x=e.clientX-rect.left
            const y=e.clientY-rect.top
            this.points.push({x,y})
            this.ctx.beginPath()
            //this.ctx.moveTo(x,y)
            this.ctx.lineWidth = 2;
     this. ctx.lineCap = 'round';
     this.ctx.strokeStyle = "white"; 
     this.ctx.moveTo(this.points[0].x, this.points[0].y);
this.points.slice(1).forEach(p => this.ctx.lineTo(p.x, p.y));
           
            
            this.ctx.lineTo(x,y)
            this.ctx.stroke()
            this.ctx.closePath()

            

        }
        
        
    }}
    mouseHandler(){

        this.canvas.addEventListener("mousedown",this.mouseDownHandler)
        this.canvas.addEventListener("mouseup",this.mouseUpHandler)
        this.canvas.addEventListener("mousemove",this.mouseMoveHandler)
    }
}