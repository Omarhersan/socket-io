socket = io('/');
const salas = document.getElementsByClassName('sala');


socket.on('loginSuccess', (data) => {
    for (let i = 0; i < salas.length; i++) {
        salas[i].addEventListener('click', () => {
            console.log("Vas a entrar a la sala: ", salas[i].id);
            window.location.href = `/chat/${salas[i].id}/${data.name}`;
        });
    }
});