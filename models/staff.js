var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var StaffSchema = mongoose.Schema({
  id: {
    type: Number
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  gender: {
    type: String
  },
  age: {
    type: Number,
    min: 18,
    max: 65
  },
  telNumber: {
    type: String
  },
  wage: {
    type: Number,
    available: Boolean
  },
  description:{
    type: String
  },
  image:{
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

var Staff = module.exports = mongoose.model('Staff', StaffSchema);

module.exports.createStaff = function(newStaff, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newStaff.password, salt, function(err, hash) {
	        newStaff.password = hash;
	        newStaff.save(callback);
	    });
	});
}

module.exports.getStaffByEmail = function(email, callback){
	var query = {email: email};
	Staff.findOne(query, callback);
}

module.exports.getStaffById = function(id, callback){
	Staff.findById(id, callback);
}

module.exports.deleteStaffByEmail = function(email, callback){
  var query = {
    email : email
  };
  Staff.remove(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
