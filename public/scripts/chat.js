const socket = io('/'); // Connect to the server
const messageInput = document.getElementById('message');
const roomId = window.location.href.split('/').pop();


socket.emit('joinRoom', roomId);
    

document.getElementById('trigger').addEventListener('click', () => {
    const msg = messageInput.value;
    console.log("Vas a enviar el texto: ", msg);

    socket.emit('sendNewMessage', {
        message: msg,
        room: roomId,
    })
});

socket.on('messageReceived', (data) => {
        console.log("Mensaje recibido: ", data);
    });