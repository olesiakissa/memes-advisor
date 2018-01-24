// info
module.exports = {
	name: 'analysis',
	version: '1.0.0',
    author: 'Lesya'
}

// Require this for picture initialization in the future
var jsonPic = require("./jsonPic.js");
//region initialize array
// Array must be initialized from file
var memes = [];

module.exports.getNextTwoMemes = function(jsonArray) {
	let index1, index2;
	let memes = [];
    // Avoid picking equal indexes and indexes where elements already have more than 5 views
	do {
        index1 = generateIndex(jsonArray);
        index2 = generateIndex(jsonArray);
	} while ( (index1 === index2) || (!(viewsIsValid(index1, jsonArray) && viewsIsValid(index2, jsonArray))) );
    if ((index1 !== index2) && (viewsIsValid(index1, jsonArray) && viewsIsValid(index2, jsonArray))) {
        memes.push(jsonArray[index1], jsonArray[index2]);
        return memes;
    } else return false;
}

function viewsIsValid(index, array) {
    return (array[index].hasOwnProperty('views') && array[index].views <= 5);
}

function generateIndex(jsonArray) {
	let max = jsonArray.length - 1,
		min = 0,
		index = ~~((Math.random() * (max - min + 1)) + min);
	return (index < max && index) ? index : Math.abs((index - max));
}

// Increments the amount of likes and views of pictures
module.exports.setStatsForPictures = function(picture, chosenPicture, originalArray) {
    let picsWithStats = [];
	let tempPicture = findPictureById(picture.id, originalArray);
    let tempChosenPicture = findPictureById(chosenPicture.id, originalArray);
    ++tempPicture.views;
    ++tempChosenPicture.views;
    ++tempChosenPicture.likes;
    picsWithStats.push(tempPicture, tempChosenPicture);
    return picsWithStats;
}

// Looks for the picture in the original array
function findPictureById(id, array) {
	for (let i = 0; i < array.length; i++) {
        if ((array[i].hasOwnProperty('id')) && (array[i].id === id)) {
        	var foundPicture = array[i];
        	break;
		}
	}
	return foundPicture;
}

// Use this function only at the end of 1 hour interval
// Returns array of pictures sorted by their stats
module.exports.getTopMemes = function(memesArray) {
    memesArray.sort(function (a, b) {
        return b.stats - a.stats;
    });

    // for (let i = 0; i < memesArray.length; i++) {
        // memesArray[i] = JSON.stringify(memesArray[i]);
    // }

    return memesArray;
}