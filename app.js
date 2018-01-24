// info
module.exports = {
	name: 'application',
	version: '1.0.0',
    author: 'Tymur'
}

// global modules and setup
const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const jsonParser = bodyParser.json();
const hbs = require("hbs");
app.set('views', __dirname + '/views');
app.set("view engine", "hbs");
app.use(express.static(__dirname + '/public'));

// set partials
hbs.registerPartials(__dirname + "/views/partials");

// local modules
const crud = require('./crud');
const api = require('./reddit_api');
const analysis = require('./analysis');

// testing local modules
function test_module(module) {
	console.log(`Loaded module: ${module.name} [${module.version}] (${module.author})`);
}
test_module(crud);
test_module(api);
test_module(analysis);

var arraymemes = [];
api.getMemesFromReddit
	.then(result => {
		let memeSet = result;
		crud.handleDataSet(memeSet);
		arraymemes = Array.from(memeSet);
		console.log('done');
	})
	.catch(e => console.error('api query error', e.stack));



// set static resources
app.use(express.static(path.join(__dirname, 'public')));

// routing 
app.get("/", function(request, response){
	//console.log(arraymemes);
	let memes = analysis.getNextTwoMemes(arraymemes);
	response.render('home.hbs',{
		title: 'memes-advisor',
		meme1: memes[0],
		meme2: memes[1]
	});
});

app.get("/statistic", function(request, response){
	let array = analysis.getTopMemes(arraymemes);
	let stats = [];
	for (let i = 0; i < array.length; i++) {
		stats[i] = {};
        stats[i].id = array[i].id;
        stats[i].url = array[i].url;
        stats[i].stats = array[i].stats;
    }
	response.render('statistic.hbs',{
		title: 'memes-advisor: statistic',
		memes: stats
	});
});

// takes json with result and send 2 new memes
app.post("/next", jsonParser, function(request, response){
	if(!request.body) return response.sendStatus(400);
	analysis.setStatsForPictures(request.body.liked, request.body.viewed, arraymemes);
	let memes = analysis.getNextTwoMemes(arraymemes);
	response.json({
		meme1: memes[0],
		meme2: memes[1]		
	});
});



app.get("/stop", function(request, response){
	console.log(`Server stop listening ${server.address().address}:${server.address().port}`);
	console.log('Cause: The server has been shut down by the web request');
	process.exit();
	response.send('Server disabled');
});

var server = app.listen(3000, () => {
	console.log(`Server start listening ${server.address().address}:${server.address().port}`);
});