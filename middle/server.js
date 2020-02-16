"use strict";
const express = require("express");
const app = express();
const http = require("http");
const port = 8080;
const path = require("path");
var server = http.createServer(app);
const io = require("socket.io")(server);
let clients = new Set()

io.on('connection', client => {
	clients.add(client.id);
	console.log(client.id + ' connected.');
	console.log('Currently connected clients: ' + clients.values())
	client.on('entities', data => {
		console.log(data);
	});
	client.on('frame', data => {
		console.log(data)
	});
});

server.listen(8080, () => console.log(`Nat Lang listening on port ${port}!`));
