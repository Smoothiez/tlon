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
	});
	client.on("frame", data => {
	});
});

server.listen(8080, () => console.log(`Nat Lang listening on port ${port}!`));
