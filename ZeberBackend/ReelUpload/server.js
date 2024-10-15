require("dotenv").config();
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');
const app =require('./app')
// adding socket.io configuration
const server=http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend address (Vite's default port)
    methods: ["GET", "POST"], // Allowed methods
    credentials: true // Allow credentials if needed
  }
});


// socket.io connection
io.on('connection', (socket) => {
    //console.log('a user connected', socket.id);
    socket.on('comment', (msg) => {
      // console.log('new comment received', msg);
      io.emit("new-comment", msg);
    })
  })
// connecting to database
connectDB()
.then(()=>{
      console.log("MongoDB connection Successful !")
})
.catch((err)=>console.error("MongoDB connection Failed !",err))

exports.io=io

server.listen(process.env.PORT||8000,()=>{
    console.log(`server is running on localhost:${process.env.PORT}`)
})