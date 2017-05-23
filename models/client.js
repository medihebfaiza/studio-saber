var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Client Schema
var ClientSchema = mongoose.Schema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	gender: {
		type: String
	},
	telNumber: {
		type: String
	},
	email: {
		type: String,
		index:true
	},
	password: {
		type: String
	}
});

var Client = module.exports = mongoose.model('Client', ClientSchema);

module.exports.createClient = function(newClient, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newClient.password, salt, function(err, hash) {
	        newClient.password = hash;
	        newClient.save(callback);
	    });
	});
}

module.exports.getClientByEmail = function(email, callback){
	var query = {email: email};
	Client.findOne(query, callback);
}

module.exports.getClientById = function(id, callback){
	Client.findById(id, callback);
}

module.exports.deleteClientByEmail = function(email, callback){
  var query = {
    email : email
  };
  Client.remove(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
