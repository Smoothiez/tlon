"use strict";
const express = require("express");
const app = express();
const path = require("path");
const io = require("socket.io-client");
let socket = io("http://178.62.39.153:8080/send?token=1");

const language = require("@google-cloud/language");
const language_client = new language.LanguageServiceClient();

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/speech", (req, res) => {
	res.sendFile(path.join(__dirname + "/p5.speech.js"));
});

socket.on("connect", function(data) {
	app.get("/text/:text", (req, res) => {
		async function quickstart() {
			const text = decodeURI(req.params.text);
			const document = {
				content: text,
				type: "PLAIN_TEXT"
			};
			const [result] = await language_client.analyzeEntities({ document: document });
			const entities = result.entities;
			console.log("Entities:");
			entities.forEach(entity => {
				console.log(entity.name);
				console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
			});
			console.log('SENDING ENTITIES TO SERVER...")
			socket.emit("entities", entities);
		}
		quickstart().catch(console.error);
	});
});

app.listen(7000, "0.0.0.0");
