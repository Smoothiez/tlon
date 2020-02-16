"use strict";
const express = require("express");
const app = express();
const path = require("path");
const io = require("socket.io-client");
let socket = io("http://178.62.39.153:8080/receive?token=1");

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/index.html"));
});

socket.on("entities", entity => {
	console.log(entity);
});

app.listen(7001, "0.0.0.0");
