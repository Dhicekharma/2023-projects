const express = require('express');
const socketio = require('socket.io'); // Use 'socketio' instead of 'socket'
const http = require('http');
const app = express();
const server = http.createServer(app);
const { v4: uuidv4 } = require('uuid')
// Serve static files
app.use(express.static('public'));

// Start the server
server.listen(4000, () => {
    console.log('Server is up and running on port 4000');
});

// Initialize Socket.IO
const io = socketio(server); // Use 'socketio' here


const getUsers = () => {
    const connectedSockets = io.sockets.sockets;
    const users = Object.values(connectedSockets).map(socket => socket.user);
    return users;
};



const users=getUsers()

 uuidv4();
// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('New connection:', socket.id);
   const sockets = io.fetchSockets();

   console.log(socket.nsp.sockets);

 
   
   
   socket.on("new_users", Credentials => {
       socket.user = Credentials;
        io.sockets.emit("new_users", getUsers());
        console.log(users)
    
});
    // socket.on("adduser", username => {
      
    //     if (!users.includes(username)) {
    //         socket.user = username;
    //         users.push(username);
    //         io.sockets.emit("users", users.filter(user => user !== null));
    //     }
    // });
    // Broadcasting when someone is typing
    socket.on('typing', (data) => {
        console.log(data);
        socket.broadcast.emit('typing', data);
    });

    // Forwarding messages to clients
    socket.on('chat', (data) => {
        const timestamp = new Date().toISOString(); // Get the current timestamp in ISO format
        const chatData = {
            timestamp:data.timestamp,
            message:data.chatmessage,
            user: socket.user,
            id:uuidv4()
        };
        io.sockets.emit('chat', chatData);
    });

    // Handling disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    if (socket.user) {
        user.splice(user.indexOf(socket.user),1)
    io.sockets.emit("users",users)
    } 
    });
});
