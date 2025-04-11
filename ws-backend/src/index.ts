import { WebSocketServer } from 'ws';
const wss=new WebSocketServer({port:8080})
wss.on('connection',function connection(ws,request){
    const url=request.url;
    if (!url) {
        return;
      }
    const params=new URLSearchParams(url.split("?")[1]);
    const token=params.get("token");
    
})