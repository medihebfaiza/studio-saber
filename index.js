var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var jwt = require("jwt-simple");
var cfg = require("./config.js");
var auth = require("./auth.js")();
var mongoose = require('mongoose') ;
var cors = require('cors') ;

// Database Connection
var dbUrl = 'mongodb://medihebfaiza:vBA3dBTgGBar4pyD@cluster0-shard-00-00-jkjon.mongodb.net:27017,cluster0-shard-00-01-jkjon.mongodb.net:27017,cluster0-shard-00-02-jkjon.mongodb.net:27017/studiosaber?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin' ;
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

// Enable All CORS Requests
app.use(cors())

// View Engine
app.set('views', __dirname + '/views');// views is directory for all template files
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/staffform', function(request, response) {
  response.render('partials/staff-form');
});

app.get('/admin', function(request, response) {
  response.render('pages/admin');
});

// Routing
var staff = require('./routes/staff');
app.use('/staff', staff);

var client = require('./routes/client');
app.use('/client', client);

var event = require('./routes/event');
app.use('/event', event);

var equipment = require('./routes/equipment');
app.use('/equipment',equipment) ;

var rent = require('./routes/rent');
app.use('/rent',rent) ;

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
