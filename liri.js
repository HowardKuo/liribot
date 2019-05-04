//api key for omdb: 5d673c51
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var searchType = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");

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

    }

    function getSong() {

    }

    function getMovie() {

    }

    function doWhatItSays() {
        
    }
}