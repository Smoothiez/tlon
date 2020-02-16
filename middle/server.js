"use strict";
const express = require("express");
const app = express();
const http = require("http");
const port = 8080;
const path = require("path");
var server = http.createServer(app);
const io = require("socket.io")(server);

io.on('connection', client => {
	console.log(client.id + ' connected.');
	client.on('entities', data => {
		console.log(data);
	});
});

server.listen(8080, () => console.log(`Nat Lang listening on port ${port}!`));
