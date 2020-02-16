"use strict";
const express = require("express");
const app = express();
const path = require("path");
const io = require("socket.io-client");
var arg = process.argv.slice(2)[0];
if (!['1', '2'].includes(arg)) {
	process.exit();
}
let socket = io("http://178.62.39.153:8080/receive?token=" + arg);

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/index.html"));
});

socket.on("hello", text => {
	console.log("!!!!!!");
});

socket.on('error', err => {
    console.log(err);
});

app.listen(7001, "0.0.0.0");
