"use strict";
const express = require("express");
const app = express();
const http = require("http");
const port = 8080;
const path = require("path");
var server = http.createServer(app);
const io = require("socket.io")(server);
let senders = {};
let receivers = {};

let send = io.of("/send");
let receive = io.of("/receive");

send.on("connection", client => {
	console.log('SENDER CONNECTED')
	console.log(client.handshake.query.token, client.id);
	senders[client.id] = [client.handshake.query.token];

	client.on("entities", entities => {
		for (var id in receivers) {
			if (receivers[id] != client.handshake.query.token) {
				console.log("ID " + client.id + " SENDING TO " + id);
				receive.emit("entities", entities);
			}
		}
	});

	client.on("frame", frame => {
		console.log("lol");
		for (var id in receivers) {
			if (receivers[id] != client.handshake.query.token) {
				console.log("ID " + client.id + " SENDING TO " + id);
				receive.emit("frame", frame);
			}
		}
	});

	client.on("error", err => {
		console.log(err);
	});
});

receive.on("connection", client => {
	console.log('RECEIVER CONNECTED')
	console.log(client.handshake.query.token, client.id);
	receivers[client.id] = [client.handshake.query.token];
});

server.listen(8080);
