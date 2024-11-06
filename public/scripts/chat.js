const socket = io('/'); // Connect to the server
const url = window.location.href.split('/');
const messageInput = document.getElementById('message');
const chat = document.getElementById('messages');
const username = url.pop();
const roomId = url.pop();
const submit = document.getElementById('submit');



socket.emit('joinRoom', roomId);
socket.on('userJoined', (data) => {
    const userConnected = document.createElement('li');
    userConnected.textContent = `User ${data} connected`;
    chat.appendChild(userConnected);
    window.scrollTo(0, document.body.scrollHeight);


});

socket.on('userLeft', (data) => {
    const userDisconnected = document.createElement('li');
    userDisconnected.textContent = `User ${data} disconnected`;
    chat.appendChild(userDisconnected);
    window.scrollTo(0, document.body.scrollHeight);
});
    

document.getElementById('trigger').addEventListener('click', () => {
    const msg = messageInput.value;
    console.log("Vas a enviar el texto: ", msg);

    socket.emit('sendNewMessage', {
        message: msg,
        room: roomId,
        username: username,
        date: new Date(),
        
    })
});



socket.on('messageReceived', (data) => {
        const newMessage = document.createElement('li');
        newMessage.textContent = `${data.username}: ${data.message} at ${data.date}`;
        chat.appendChild(newMessage);
        window.scrollTo(0, document.body.scrollHeight);
    });
