const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const { createServer } = require('http');  // Import http
const { Server } = require('socket.io');   // Import socket.io

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);  // Create an HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: "*",  // Allow all origins or specify your frontend's URL
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));  // Serve uploaded files
app.use('/api', bookRoutes);

const PORT = process.env.PORT || 8080;

// Listen for connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for new comments
  socket.on('newComment', (commentData) => {
    // Broadcast the comment to all connected clients
    io.emit('commentAdded', commentData);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Handle like updates in real-time
    socket.on('likeComment', (data) => {
      io.emit('commentLiked', data); // Emit an event when a comment is liked
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });


httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
