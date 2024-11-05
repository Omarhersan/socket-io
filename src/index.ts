import express from 'express';
import { config } from 'dotenv';
config();

import routes from './routes';
import path from 'path';
import { Server } from 'socket.io'

const app = express();
const port = process.env.PORT || 3000;



app.use('', express.static(path.join(__dirname, '..', 'public')));

app.use(routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/chat/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'chat.html'));
});

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('joinRoom', (roomId) => {
        console.log('User joined room', roomId);
        socket.join('room-'+roomId);
    });

    socket.on('sendNewMessage', (data) => {
        console.log("Recibiste un mensaje", data);
    
        //socket.broadcast.emit('messageRecieved', data);
        socket.to('room-'+data.room).emit('messageReceived', data);
    });
});

    

