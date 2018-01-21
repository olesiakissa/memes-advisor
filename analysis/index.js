// info
module.exports = {
	name: 'analysis',
	version: '1.0.0',
    author: 'Lesya'
}

// Require this for picture initialization in the future
 var jsonPic = require("./jsonPic.js");

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

// Test array for pics
var memes = [];

var picture = new jsonPic(1, 'title', 'https://78.media.tumblr.com/08b21a4ece8b9a5d8c55c3a46f8bffe4/tumblr_p2rpt4z7Ut1r1r78ao1_540.gif', 0, 0);
var chosenPicture = new jsonPic(2, 'title', 'https://78.media.tumblr.com/2021cadd01b9ecf610f80cb2b6904961/tumblr_p1bgeg3s9v1r1r78ao1_540.gif', 0, 0);
var picture2 = new jsonPic(3, 'tsdfsdfsdf', 'https://78.media.tumblr.com/2021cadd01b9ecf610f80cb2b6904961/tumblr_p1bgeg3s9v1r1r78ao1_540.gif', 0, 0);
var anotherPicture = new jsonPic(4, 'one more title', 'https://78.media.tumblr.com/2021cadd01b9ecf610f80cb2b6904961/tumblr_p1bgeg3s9v1r1r78ao1_540.gif', 0, 0);
memes.push(picture, chosenPicture, picture2, anotherPicture);


function setStatsForPictures(picture, chosenPicture, originalArray) {
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

// Should increment views in pics with id 1 and 2 and likes in picture with id 2 (see variables picture and chosenPicture)
var memesWithStats = setStatsForPictures(picture, chosenPicture, memes);
console.log(memes);
console.log(memesWithStats);

/*
function getTopTenMemes(memesArray) {
    let formedArray;

    return formedArray;
}*/
