var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var jwt = require("jwt-simple");
var cfg = require("./config.js");
var auth = require("./auth.js")();
var dbUrl = 'mongodb://medihebfaiza:vBA3dBTgGBar4pyD@cluster0-shard-00-00-jkjon.mongodb.net:27017,cluster0-shard-00-01-jkjon.mongodb.net:27017,cluster0-shard-00-02-jkjon.mongodb.net:27017/studiosaber?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin' ;
var client = require("./models/client.js")
var mongoose = require('mongoose') ;

mongoose.connect(dbUrl);
var db = mongoose.connection;

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

app.get("/client", auth.authenticate(), function(req, res) {
    console.log('client '+req.user.id+' trying to access /client');//TEST
    res.json({
        message: "This message can only be seen by our lovely clients"
    });
});

// Generating tokens for authenticated clients
app.post("/token", function(req, res) {
    var email = req.body.email || req.headers['email'];
    var password = req.body.password || req.headers['password'];
    if (email && password) {
      console.log('Client '+email+' Trying to login with Password : '+password) ;//TEST
      client.getClientByEmail(email,function(err,client){
        if (err) throw err ;
        if (!client){
          res.sendStatus(401);
        }
        else {
          if (password == "123"){ //TEST : Get the real client pass instead
            /* Problem Here with saving the client id, maybe beacause of the datatype on mongodb*/
            var payload = {
                id: client.id
            };
            var token = jwt.encode(payload, cfg.jwtSecret); //Generates the token
            console.log('Client '+email+' got the Token') ;//TEST
            res.json({
              token : token
            }) ;
          }
          else {
            res.sendStatus(401);
          }
        }
      });
    }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
