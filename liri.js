//api key for omdb: 5d673c51
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);