var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var StaffSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  category: String,
  age: {
    type: Number,
    min: 18,
    max: 65
  },
  telNumber: String,
  wage: Number,
  available: Boolean,
  description: String,
  image: String,
  email: {
    type: String,
    index:true
  },
  password: String
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

module.exports.getAllStaff = function(callback){
	Staff.find({}, callback);
}

module.exports.updateStaffPassword = function(id, newPassword, callback){
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newPassword, salt, function(err, hash) {
          newPassword = hash;
          Staff.update({_id:id},{password:newPassword},callback);
      });
  });
}

module.exports.deleteStaffById = function(staffId, callback){
  Staff.remove({_id:staffId}, callback);
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
