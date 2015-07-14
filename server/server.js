// var browserify = require('browserify-middleware')
var express = require('express');
var app = express();
var request = require("request");
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json()) 

app.use(express.static('../client/'))

app.post('/steamfriends', function(req, res) {
  request('http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=E2CFE7F7D8694A7E18DFDE00853526F4&steamid='+req.body.steamId+'&relationship=friend',
   function(error, response, body) {
    if (error) throw error;
    res.send(body)
  });
})

app.post('/steamgames', function(req, res) {
  request('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=E2CFE7F7D8694A7E18DFDE00853526F4&steamid='+req.body.steamId+'&format=json&include_played_free_games',
   function(error, response, body) {
    if (error) throw error;
    res.send(body)
  });
})

app.post('/steamname', function(req, res) {
  request('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=E2CFE7F7D8694A7E18DFDE00853526F4&steamids='+req.body.steamId,
   function(error, response, body) {
    if (error) throw error;
    res.send(body)
  });
})

var port = process.env.PORT || 8000
app.listen(port)
console.log("Listening on port", port)
