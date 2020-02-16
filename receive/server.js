"use strict";
const express = require("express");
const app = express();
const path = require("path");
const io = require("socket.io-client");
let socket = io("http://178.62.39.153:8080");

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/speech", (req, res) => {
	res.sendFile(path.join(__dirname + "/p5.speech.js"));
});

app.get("/json", (req, res) => {
	res.sendFile(path.join(__dirname + "/webcams.json"));
});

socket.on("connect", function(data) {
	app.get("/text/:text", (req, res) => {
		async function quickstart() {
			const language = require("@google-cloud/language");
			const client = new language.LanguageServiceClient();
			const text = decodeURI(req.params.text);
			const document = {
				content: text,
				type: "PLAIN_TEXT"
			};
			//const [result] = await client.analyzeSentiment({ document: document })
			//const sentiment = result.documentSentiment
			//res.send(sentiment)

			console.log("entities...");

			const [result] = await client.analyzeEntities({ document: document });
			const entities = result.entities;

			console.log("Entities:");
			entities.forEach(entity => {
				console.log(entity.name);
				console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
				if (entity.metadata && entity.metadata.wikipedia_url) {
					console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
				}
			});
			socket.emit("entities", entities);
		}
		quickstart().catch(console.error);
	});
});

app.listen(8080, "0.0.0.0");
