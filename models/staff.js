var mongoose = require('mongoose');

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
    type: Number
    available: Boolean
  },
  description:{
    type: String
  }
  image:{
    type: String
  }
  email: {
    type: String,
    index:true
  },
  password: {
    type: String
  }
})

var Staff = module.exports = mongoose.model('Staff', StaffSchema);

bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newClient.password, salt, function(err, hash) {
        newClient.password = hash;
        newClient.save(callback);
    });
});
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
