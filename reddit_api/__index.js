// info
module.exports = {
  name: 'reddit_api',
  version: '1.0.2',
  author: 'Nikita'
}

const https = require("https");
const jsonPic = require("./../analysis/jsonPic.js");
let url = "https://www.reddit.com/r/dankmemes/new.json?limit=100&after=";

const posts = new Set(), afters = new Set();

module.exports.getMemesFromReddit = new Promise((resolve, reject) => {
	
let after = "";
const amount = 3;
afters.add(after);
function searchFunc(amount, after){
    afters.delete(after);
    url += after;
    https.get(url, res => {
        res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
            body = JSON.parse(body);
            afters.add(body.data.after);
            if((amount > 0) && (afters.size > 0)){
                let newAfter = '';
                newAfter = body.data.after;
                searchFunc(amount - 1, newAfter);
            } 
            let children = body.data.children;
            let length = children.length;
            for (var i = 0; i < length; i++) {
                //за последний час (они по данному запросу все отсортированны по времени должны быть)
                if(children[i].data.created_utc < (new Date().getDate - 60000)) break;
                let objPost = new jsonPic(children[i].data.id, children[i].data.title, children[i].data.url.replace("&amp;", "&"), 0, 0);
                posts.add(objPost);
    }
	res.on("end", error => {
		reject(error);
	});
    // checker
    console.log(posts.size);
    //console.log(posts);s
    return posts;
})
})
}
resolve(searchFunc(amount, after));
});