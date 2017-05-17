// users.js
// Fake list of users to be used for the authentication
// Should use the database instead

var users = [{
    id: 1,
    name: "John",
    email: "john@mail.com",
    password: "john123"
}, {
    id: 2,
    name: "Sarah",
    email: "sarah@mail.com",
    password: "sarah123"
}];

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var people = [] ;

// Connection URL
var url = 'mongodb://medihebfaiza:vBA3dBTgGBar4pyD@cluster0-shard-00-00-jkjon.mongodb.net:27017,cluster0-shard-00-01-jkjon.mongodb.net:27017,cluster0-shard-00-02-jkjon.mongodb.net:27017/studiosaber?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to MongoDB Atlas server");
  db.close();
});

module.exports = users;
