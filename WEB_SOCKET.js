const express = require('express');
const { createServer } = require('node:http');
const {join}=require('node:path');
const {Server}=require('socket.io');

const app = express();
const server = createServer(app);
const io=new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname,'index.html'));
});

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     // socket.on('disconnect', () => {
//     //   console.log('user disconnected');
//     // });
//   });

  // real time chat application
//   io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       console.log('message: ' + msg);
//     });
//   });

io.on('connection', (socket) => {
    console.log("Connection Established");
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });


  // Broadcating 
  //The next goal is for us to emit the event from the server to the rest of the users.
// In order to send an event to everyone, Socket.IO gives us the io.emit() method.

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});