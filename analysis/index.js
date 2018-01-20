// info
module.exports = {
	name: 'analysis',
	version: '1.0.0',
    author: 'Lesya'
}

// Require this for picture initialization in the future
// var jsonPic = require("jsonPic");

// Sample array for testing the generation of indexes
// var jsonArray = [1,2,3,4,5,6,7];

function getNextTwoMemes(jsonArray) {
	let index1 = generateIndex(jsonArray);
	let index2 = generateIndex(jsonArray);
	let memes = [];
	if (index1 === index2 || (index1 === 0 && index2 === 0)) {
		do {
            index1 = generateIndex(jsonArray);
            index2 = generateIndex(jsonArray);
        } while (index1 !== index2);
	}
    memes.push(jsonArray[index1], jsonArray[index2]);
    return memes;
}

function generateIndex(jsonArray) {
	let max = jsonArray.length - 1,
		min = 0,
		index = ~~((Math.random() * (max - min + 1)) + min);
	return (index < max && index) ? index : Math.abs((index - max));
}

//console.log(getNextTwoMemes(jsonArray))