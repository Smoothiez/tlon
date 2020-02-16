'use strict'
const express = require('express')
const app = express()
const port = 8080
const path = require('path')

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/speech', (req, res) => {
	res.sendFile(path.join(__dirname + '/p5.speech.js'))
})

app.get('/json', (req, res) => {
	res.sendFile(path.join(__dirname + '/webcams.json'))
})

app.get('/emotion', (req, res) => {
	res.sendFile(path.join(__dirname + '/emotion_detection-master/Test.py'))


	var spawn = require("child_process").spawn; 
      
    // Parameters passed in spawn - 
    // 1. type_of_script 
    // 2. list containing Path of the script 
    //    and arguments for the script  
      
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
    // so, first name = Mike and last name = Will 
    var process = spawn('python',["/emotion_detection-master/Test.py",]); 

})

app.get('/text/:text', (req, res) => {
	async function quickstart() {
		const language = require('@google-cloud/language')
		const client = new language.LanguageServiceClient()
		const text = decodeURI(req.params.text)
		const document = {
			content: text,
			type: 'PLAIN_TEXT',
		}
		//const [result] = await client.analyzeSentiment({ document: document })
		//const sentiment = result.documentSentiment
		//res.send(sentiment)

		console.log('entities...')


		const [result] = await client.analyzeEntities({ document: document });
		const entities = result.entities;

		console.log('Entities:');
		entities.forEach(entity => {
			console.log(entity.name);
			console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
			if (entity.metadata && entity.metadata.wikipedia_url) {
				console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
			}
		});		

		res.send(entities)

	}
	quickstart().catch(console.error)
})


app.listen(port, () => console.log(`Nat Lang listening on port ${port}!`))
