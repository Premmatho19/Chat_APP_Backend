const http=require("http");
const express =require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app=express();
const port= process.env.PORT ;


const users=[{}];

app.use(cors());
app.get("/",(req,res)=>{
    res.send("HELL ITS WORKING");
})

const server=http.createServer(app);

const io=socketIO(server);

io.on("connection",(socket)=>{
    console.log("New Connection");

    socket.on('joined',({user})=>{
          users[socket.id]=user;
          console.log(`${user} has joined `);
          socket.broadcast.emit('userJoined',{user:"Admin",message:` ${users[socket.id]} has joined`});
          socket.emit('welcome',{user:"Admin",message:`Welcome to the chat,${users[socket.id]} `})
    })

    socket.on("message",({message,id})=>{
        io.emit("sendMessage",{user:users[id],message,id})
    })

    socket.on("disconnect",()=>{
        socket.broadcast.emit("leave",{user:"Admin",message:`${users[socket.id]} is left`})
        console.log(`user left`);
    })
})

server.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`);
})



























// const http = require("http")
// const express = require("express")
// const port =  4500 || process.env.PORT

// const users = [{}]

// const cors = require("cors")
// const socketIO = require("socket.io")

// const app = express();
// app.use(cors());
// app.get("/",(req,res)=>{
//     res.send("Hell it is working")
// })

// const server = http.createServer(app)

// const io = socketIO(server)
// const socket = socketIO()
// io.on("connection",()=>{
//     // console.log("New Connection");

//     users[socket.id] = user

//     socket.on("joined",({user})=>{
//         console.log(`${user} has joined`);
//     })
// })

// server.listen(port,()=>{
//     console.log(`server is working on http://localhost:${port}`);
// })