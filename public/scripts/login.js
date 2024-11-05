const socket = io('/'); // Connect to the server
const nameInput = document.getElementById('inputName');


document.getElementById('submit').addEventListener('click', () => {
    const name = nameInput.value;
    if(name){
        console.log("Vas a enviar el nombre: ", name);

        socket.emit('login', {
            name: name,
        })
    }
    
});

socket.on('loginSuccess', (data)=>{
    console.log("Login exitoso: ", data);
    window.location.href = '/chat';
})