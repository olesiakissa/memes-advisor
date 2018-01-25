// info
module.exports = {
    name: 'crud',
    version: '1.0.1',
    author: 'Dasha'
};

const fs = require("fs");
const path = "crud/data/memes.json";
var dataSet;

// Receives Set and parses it to json
module.exports.handleDataSet = function (dataSet) {
    var arrayFromSet = Array.from(dataSet);
    var json = JSON.stringify(arrayFromSet, null, 2);
    saveToFile(json);
};

// Returns Set from JSON that is stored in file
module.exports.handleJson = function () {
    var json = getFromFile();
    var parsedArray = JSON.parse(json);
    return new Set(parsedArray);
};

// Writes JSON to file
function saveToFile(jsonData) {
    fs.writeFile(path, jsonData, function (err) {
        if (err) {
            return console.error(err);
        }
    });
}

// Gets JSON from file
function getFromFile() {
    return fs.readFileSync(path, 'utf8');
}

//Updates element with specific id from Set with given data
module.exports.updateMeme = function (id, data) {
    var iterator = dataSet.values();
    for (let entry of iterator) {
        if (entry.id === id) {
            entry = data;
            entry.id = id;
            console.log("UPDATED -->");
            console.log(entry);
        }
    }
};

// Deletes meme from Set by id
module.exports.deleteMeme = function (id) {
    var itemToDelete = this.getMeme(id, dataSet);
    dataSet.delete(itemToDelete);
};

// Returns meme form Set by id
module.exports.getMeme = function (id) {
    var iterator = dataSet.values();
    for (let entry of iterator) {
        if (entry.id === id) {
            console.log("READ -->");
            console.log(entry);
            return entry;
        }
    }
};

// Test functions
module.exports.testCRUD = function () {
    dataSet = this.handleJson();

    console.log("==========READ TEST==========");
    this.getMeme('7j705f');

    console.log("==========EDIT TEST==========");
    var data = {
        url: 'google.com',
        title: 'test',
        id: '7k7we4',
        likes: 0,
        views: 0,
        stats: 0
    };
    this.getMeme('7k7we4');
    this.updateMeme('7k7we4', data);

    console.log("==========DELETE TEST==========");
    this.deleteMeme('5c4tgr');
    console.log(this.getMeme('5c4tgr'));
};