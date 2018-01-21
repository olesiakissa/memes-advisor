// info
module.exports = {
    name: 'crud',
    version: '1.0.0',
    author: 'Dasha'
}

const fs = require("fs");

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
    let dataSet = new Set(parsedArray);
    return dataSet
};

//Writes JSON to file
function saveToFile(jsonData) {
    fs.writeFile('crud/data/example.json', jsonData, function (err) {
        if (err) {
            return console.error(err);
        }-
    });
}

//Gets JSON from file
function getFromFile() {
    return fs.readFileSync('crud/data/example.json', 'utf8');
}