const io = require("socket.io-client");

var socket = io('http://178.62.39.153:8080');
socket.on('connect', function (data) {
    console.log(data)
    socket.emit('text', 'HELLO MY NAME IS MIKEY')
})
