//api key for omdb: 5d673c51
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');
var spotify = require('node-spotify-api');
var spotifyKeys = new spotify(keys.spotify);
var searchType = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");

typeOfSearch(searchType);

function typeOfSearch(searchType) {
    switch (searchType) {
        case "concert-this":
            getConcert();
            break;

        case "spotify-this-song":
            if (searchTerm) {
                getSong(searchTerm);
            }
            else {
                getSong("The Sign");
            }
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

    function getSong(song) {
        spotifyKeys.search(
            {
                type: "track",
                query: song,
                limit: 5
            },
            function (err, data) {
                if (err) {
                    console.log("Error occurred: " + err);
                    return;
                }

                var response = data.tracks.items;

                for (var i = 0; i < response.length; i++) {
                    //console.log(response[i].artists[0].name);
                    var showData = [
                        "Artist(s): " + response[i].artists[0].name,
                        "Song Name: " + response[i].name,
                        "Preview Song: " + response[i].preview_url,
                        "Album: " + response[i].album.name,
                        "\n--------------------------------------------------------\n"
                    ].join("\n");
                    addLog(showData);
                }
            }
        )
    };

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