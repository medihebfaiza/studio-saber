var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var jwt = require("jwt-simple");
var cfg = require("./config.js");
var auth = require("./auth.js")();
var dbUrl = 'mongodb://medihebfaiza:vBA3dBTgGBar4pyD@cluster0-shard-00-00-jkjon.mongodb.net:27017,cluster0-shard-00-01-jkjon.mongodb.net:27017,cluster0-shard-00-02-jkjon.mongodb.net:27017/studiosaber?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin' ;
var Client = require("./models/client.js")
var mongoose = require('mongoose') ;

mongoose.connect(dbUrl);
var db = mongoose.connection;

// Init App
var app = express();

// Set Port
app.set('port', (process.env.PORT || 5000));

// Set Static Folder
app.use(express.static(__dirname + '/public'));

// Set Favicon
app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));

// REST API
app.use(bodyParser.json());

// For parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));

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

/* Registration Route */
app.post("/register", function(req,res){
  var newClient = new Client({
			firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      telNumber: req.body.telNumber,
			email: req.body.email,
			password: req.body.password
		});
  console.log("Trying to add client : "+newClient);//TEST

  /* Should Check if client already exists befo */
  Client.getClientByEmail(req.body.email,function(err,client){
    if (err) throw err ;
    if (client){
      res.json({
        message: "An Account is already created with this email"
      });
    }
    else {
      Client.createClient(newClient,function(err){
        if (err){
          res.json({
            message: "Failed"
          });
        }
        else {
          res.json({
            message: "Your Client Account has been Successfully !"
          });
        }
      });
    }
  });
});

// Generating tokens for authenticated clients
app.post("/login", function(req, res) {
    var email = req.body.email || req.headers['email'];
    var password = req.body.password || req.headers['password'];
    if (email && password) {
      console.log('Client '+email+' Trying to login with Password : '+password) ;//TEST
      Client.getClientByEmail(email,function(err,client){
        if (err) throw err ;
        if (!client){
          res.sendStatus(401);
        }
        else {
          Client.comparePassword(password,client.password, function(err,isMatch){
            if(err) throw err;
            if (!isMatch){
              console.log('wrong password') ;//TEST
              res.json({
                message : 'wrong',
                token : ''
              });
            }
            else {
              var payload = {
                  id: client._id
              };
              var token = jwt.encode(payload, cfg.jwtSecret); //Generates the token
              console.log('Client '+email+' got the Token') ;//TEST
              res.json({
                token : token
              }) ;
            }
          });
        }
      });
    }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
