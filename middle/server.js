"use strict";
const express = require("express");
const app = express();
const http = require("http");
const port = 8080;
const path = require("path");
var server = http.createServer(app);
const io = require("socket.io")(server);
let clients = [];

io.on("connection", client => {
	clients.push(client.id);
	console.log("CLIENTS CONNECTED: " + clients);
	client.on("entities", data => {
		if (clients.length == 2) {
			let other = clients[0] == client.id ? clients[0] : clients[1];
			console.log("ID " + client.id + " SENDING TO " + other);
			io.to(other).emit("entities", data);
		}
	});
	client.on("frame", data => {
		if (clients.length == 2) {
			let other = clients[0] == client.id ? clients[0] : clients[1];
			console.log("ID " + client.id + " SENDING TO " + other);
			io.to(other).emit("frame", data);
		}
	});
});

server.listen(8080, () => console.log(`Nat Lang listening on port ${port}!`));
