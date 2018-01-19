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
app.set("view engine", "hbs");

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

api.getMemesFromReddit.then(result => console.log(result)).catch(e => console.error('api query error', e.stack));


// set static resources
app.use(express.static(path.join(__dirname, 'public')));

// routing 
app.get("/", function(request, response){
	response.render('home.hbs',{
		title: 'memes-advisor'
	});
});

app.get("/statistic", function(request, response){
	response.render('statistic.hbs',{
		title: 'memes-advisor: statistic'
	});
});

// takes json with result and send 2 new memes
app.post("/next", jsonParser, function(request, response){
	if(!request.body) return response.sendStatus(400);
	response.json({
		test: '2 new memes'
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