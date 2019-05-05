require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');
var spotify = require('node-spotify-api');
var omdbKey = "5d673c51";
var spotifyKeys = new spotify(keys.spotify);
var searchType = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");

typeOfSearch(searchType);

function typeOfSearch(searchType) {
    switch (searchType) {
        case "concert-this":
            if (searchTerm) {
                getConcert(searchTerm);
            }
            else {
                getConcert("Blink-182");
            }
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
            if (searchTerm) {
                getMovie(searchTerm);
            }
            else {
                getMovie("Mr.Nobody")
            }
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
    }

    function getConcert(band) {
        var URL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
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

    function getMovie(movie) {
        var URL = "http://www.omdbapi.com/?t=" + movie + "&apikey=" + omdbKey;
        axios.get(URL).then(function (response) {

            var jsonData = response.data;
            var showData = [
                "Title: " + jsonData.Title,
                "Year Made: " + jsonData.Year,
                "IMDB Rating: " + jsonData.Ratings[0].Value,
                "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
                "Country Produced: " + jsonData.Country,
                "Language: " + jsonData.Language,
                "Plot: " + jsonData.Plot,
                "Actors: " + jsonData.Actors,
                "\n--------------------------------------------------------\n"
            ].join("\n");
            addLog(showData);
        });
    };

    function doWhatItSays() {
        fs.readFile('random.txt', "utf8", function (err, data) {
            if (err) throw err;
            var txt = data.split(',');
            getSong(txt[1]);
        });
    }
    function addLog(data) {
        fs.appendFile("log.txt", data, function (err) {
            if (err) throw err;
            console.log(data);
        });
    };
}