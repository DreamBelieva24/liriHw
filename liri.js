require("dotenv").config();
var keys = require('./keys.js');

var command = process.argv[2]
var keyword = process.argv[3]

if (command === "my-tweets"){
    tweets();
}

else if (command === "spotify-this-song"){
    spotify();
}

else if (command === "movie-this"){
    movie();
}

else if (command === "do-what-it-says"){
    doIt();
}

else {
    console.log("Invalid Command");
}

function tweets(){
    console.log("One sec...");
    var Twitter = require('twitter');
 
var client = new Twitter(keys.twitter);
 
var params = {screen_name: 'chuck_facts'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
      for (i=0;i<20;i++){
    console.log(tweets[i].text);
      }
  }
});
}

function spotify(){
    

    var Spotify = require('node-spotify-api');
 
    var spotify = new Spotify(keys.spotify);
     
    if (keyword === undefined) {
        console.log("Please enter a song to search.")
    }
    else {
        console.log("One sec...");
        spotify.search({ type: 'track', query: keyword }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      
    console.log("Artist: " + data.tracks.items[0].artists[0].name); 
    console.log("Song: " + data.tracks.items[0].name); 
    console.log("Preview Link: " + data.tracks.items[0].preview_url); 
    console.log("Album: " + data.tracks.items[0].album.name); 
    });
}}

function movie(){
    
    if (keyword === undefined) {
        console.log("Please enter a movie to search.")
    }
    else {
    console.log("One sec...");
    var request = require("request");
    var queryUrl = "http://www.omdbapi.com/?t=" + keyword + "&y=&plot=short&apikey=trilogy";

  
    request(queryUrl, function(error, response, body) {
    
      if (!error && response.statusCode === 200) {
        
        console.log("Movie: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
      }
    });
    }
}

function doIt(){

    var fs = require("fs");
    
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }
        
        var dataArr = data.split(", ");

        command = dataArr[0];
        keyword = dataArr[1];


    if (command === "my-tweets"){
        tweets();
    }
    
    else if (command === "spotify-this-song"){
        spotify();
    }
    
    else if (command === "movie-this"){
        movie();
    }
        
    });


}





