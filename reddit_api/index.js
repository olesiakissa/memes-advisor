// info
module.exports = {
	name: 'reddit_api',
	version: '1.0.0',
	author: 'Nikita'
}

const https = require("https");
const posts = new Set();
/////////////////request/////////////////
const url =
  "https://www.reddit.com/r/dankmemes/search.json?restrict_sr=on&t=all";
https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    body = JSON.parse(body);
    let children = body.data.children;
      children.forEach(function(item) {
          let objPost = new Object();
          objPost.url = item.data.url;
          objPost.title = item.data.title;
          objPost.subreddit = item.data.subreddit;
          posts.add(objPost);
      });
    
    console.log(
      posts
    );
  });
});
/////////////////server/////////////////
var http = require("http");
http.createServer(function(request,response){
     
    response.end('Memes Squad ');
     
}).listen(8080, "ec2-52-15-225-70.us-east-2.compute.amazonaws.com", function(){
    console.log("started listening to 8080 ec2-52-15-225-70.us-east-2.compute.amazonaws.com");
});