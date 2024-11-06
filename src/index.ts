import express from 'express';
import { config } from 'dotenv';
config();

import routes from './routes';
import path from 'path';
import { Server } from 'socket.io'

const app = express();
const port = process.env.PORT || 3000;
const metadata = {"username": ""};



app.use('', express.static(path.join(__dirname, '..', 'public')));

app.use(routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/chat/:id/:user', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'chat.html'));
});

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('login', (data) => {
        metadata.username = data.name;
        console.log('User logged in:', data.name);
        socket.emit('loginSuccess', data);
    });

    
    socket.on('joinRoom', (roomId) => {
        console.log(`User ${metadata.username} joined room ${roomId}`);
        socket.join('room-'+roomId);
        socket.broadcast.to('room-'+roomId).emit('userJoined', metadata.username);
    });

    socket.on('sendNewMessage', (data) => {
    
        //socket.broadcast.emit('messageRecieved', data);
        socket.to('room-'+data.room).emit('messageReceived', data);
    });
});

io.on('disconnect', (socket) => {
    socket.emit('userLeft', metadata.username);
});

    

