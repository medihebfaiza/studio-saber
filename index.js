var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var jwt = require("jwt-simple");
var users = require("./users.js");
var cfg = require("./config.js");
var auth = require("./auth.js")();

// Init App
var app = express();

// Set Port
app.set('port', (process.env.PORT || 5000));

// Set Static Folder
app.use(express.static(__dirname + '/public'));

// REST API
app.use(bodyParser.json());

// Authentication Initialization
app.use(auth.initialize());

// View Engine
app.set('views', __dirname + '/views');// views is directory for all template files
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

// API response testing
app.get("/api", function(req, res) {
    res.json({
        status: "My API is alive!"
    });
});

app.get("/user", auth.authenticate(), function(req, res) {
    console.log('User trying to access /user');//TEST
    res.json(users[req.user.id]);
});

// Generating tokens for authenticated users
app.post("/token", function(req, res) {
    var email = req.body.email || req.headers['email'];
    var password = req.body.password || req.headers['password'];
    if (email && password) {
        console.log('User '+email+' Trying to login with Password : '+password) ;//TEST
        var user = users.find(function(u) {
            return u.email === email && u.password === password;
        });
        if (user) {
            var payload = {
                id: user.id
            };
            var token = jwt.encode(payload, cfg.jwtSecret); //Generates the token
            console.log('User '+email+' got the Token') ;//TEST
            res.json({
                token: token
            });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
