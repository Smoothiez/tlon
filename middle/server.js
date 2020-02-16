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
		console.log("LOL");
		if (clients.len == 2) {
			console.log("TWO CLIENTS CONNECTED");
		}
	});
	client.on("frame", data => {
		if (clients.len == 2) {
			console.log("TWO CLIENTS CONNECTED");
		}
	});
});

server.listen(8080, () => console.log(`Nat Lang listening on port ${port}!`));
