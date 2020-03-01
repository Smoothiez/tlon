"use strict";
const express = require("express");
const app = express();
const http = require("http");
const port = 8080;
const path = require("path");
var server = http.createServer(app);
const io = require("socket.io")(server);
let connections = {};

io.on("connection", client => {
	console.log("Client connected:", client.handshake.query.token, client.id);
	connections[client.id] = [client.handshake.query.token];

	client.on("entities", entities => {
		console.log("Got entities...");
		for (var id in connections) {
			if (connections[id] != client.handshake.query.token) {
				console.log("ID " + client.id + " SENDING TO " + id);
				io.to(id).emit("entities", entities);
			}
		}
	});

	client.on("error", err => {
		console.log(err);
	});
});

server.listen(8080);
console.log("SERVER LISTENING ON 8080");
