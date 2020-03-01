"use strict";
const express = require("express");
const app = express();
const path = require("path");

app.use("/scripts", express.static(__dirname + "/scripts"));

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/1.html"));
});

app.listen(7000, "0.0.0.0");
console.log("SERVER 1 LISTENING ON localhost:7000");
