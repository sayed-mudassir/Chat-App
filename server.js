const express = require ("express");
const http = require('http');

const socketIo = require('socket.io');
const SocketIoServer = socketIo.Server;

const expressServer = express();

const httpServer = http.createServer(expressServer);
const io = new SocketIoServer(httpServer);

io.on('connection',(socket)=>{
    socket.on('sending message event',(data)=>{
        io.emit('io spreading message', data);
    });
})


/**
 * server.use is used to pass middleware function 
 * server.use((req,res,next){
 *      console.log("this is middleware")
 *      res.send("this is comming from middleware")
 *      next();
 * });
 */

expressServer.use(express.static("client"))

function started(){
    console.log("server has been started");
}

// function handleBase(req,res){
//     res.send("this is empty route or base url");
// }

// server.get('/',handleBase);
httpServer.listen(8888,started);
