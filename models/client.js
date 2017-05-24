var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Client Schema
var ClientSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	gender: String,
	telNumber: String,
	email: {
		type: String,
		index:true
	},
	password: String
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

module.exports.getClients = function(callback){
	Client.find({}, callback);
}

module.exports.updateClientPassword = function(clientId, newPassword,callback){
	bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(newPassword, salt, function(err, hash) {
					newPassword = hash;
					Client.update({_id:clientId}, {password:newPassword},callback);
			});
	});
}

module.exports.deleteClientById = function(clientId, callback){
  var query = {
    _id : clientId
  };
  Client.remove(query, callback);
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
