//api key for omdb: 5d673c51
require("dotenv").config();
// var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');
// var spotify = new Spotify(keys.spotify);

var searchType = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");

typeOfSearch(searchType);

function typeOfSearch(searchType) {
    switch (searchType) {
        case "concert-this":
            getConcert();
            break;

        case "spotify-this-song":
            getSong();
            break;
        
        case "movie-this":
            getMovie();
            break;
        
        case "do-what-it-says":
            doWhatItSays();
            break;
    }

    function getConcert() {
        var URL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
        axios.get(URL).then(function (response) {
            var jsonData = response.data;
            for (var i = 0; i < jsonData.length; i++) {
                var showData = [
                "Venue: " + jsonData[i].venue.name,
                "City: " + jsonData[i].venue.city,
                "Date: " + moment(jsonData[i].datetime).format('MM/DD/YYYY'),
                "\n--------------------------------------------------------\n"
                ].join("\n");
                addLog(showData);
            }
          });
        };

    function getSong() {

    }

    function getMovie() {

    }

    function doWhatItSays() {

    }
    function addLog(data) {
        fs.appendFile("log.txt", data, function (err) {
          if (err) throw err;
          console.log(data);
        });
      };
}