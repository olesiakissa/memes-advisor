// info
module.exports = {
	name: 'reddit_api',
	version: '1.0.1',
	author: 'Nikita'
}

const https = require("https");
const url = "https://www.reddit.com/r/dankmemes/search.json?restrict_sr=on&t=all";
const jsonPic = require("./../analysis/jsonPic.js");

module.exports.getMemesFromReddit = new Promise((resolve, reject) => {
		let posts = new Set();
/////////////////request/////////////////
		https.get(url, res => {
			res.setEncoding("utf8");
			let body = "";
			res.on("data", data => {
				body += data;
			});
			res.on("end", () => {
				body = JSON.parse(body);
				let children = body.data.children;
				let length = children.length;
				for (var i = 0; i < length; i++) {
					let objPost = new jsonPic(children[i].data.id, children[i].data.title, children[i].data.url, 0, 0);
					posts.add(objPost);
				}
				// children.forEach(function(item) {
					// let objPost = {};
					// objPost.url = item.data.url;
					// objPost.title = item.data.title;
					// objPost.subreddit = item.data.subreddit;
					// posts.add(objPost);
				// });
				//console.log(posts);
				resolve(posts);
			});
			res.on("end", error => {
				reject(error);
			});

		});
	});

/////////////////server/////////////////
// var http = require("http");
// http.createServer(function(request,response){

    // response.end('Memes Squad ');

// }).listen(8080, "ec2-52-15-225-70.us-east-2.compute.amazonaws.com", function(){
    // console.log("started listening to 8080 ec2-52-15-225-70.us-east-2.compute.amazonaws.com");
// });