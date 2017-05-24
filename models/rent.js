var mongoose = require('mongoose');

var RentSchema = mongoose.Schema({
  clientId: String,
  equipmentId: String,
  date: Date,
  duration: Number,
  confirmed: Boolean
});

var Rent = module.exports = mongoose.model('Rent', RentSchema);

module.exports.createRent = function(newRent, callback){
  newRent.save(callback) ;
}

module.exports.confirmRent = function(rentId, callback){
  Rent.update({_id:rentId},{confirmed:true},callback) ;
}

module.exports.getRents = function(callback){
  Rent.find({},callback) ;
}

module.exports.getClientRents = function(clientId,callback){
  Rent.find({clientId:clientId},callback) ;
}

module.exports.getEquipmentRents = function(equipmentId,callback){
  Rent.find({equipmentId:equipmentId},callback) ;
}

module.exports.getRent = function(rentId,callback){
  Rent.find({_id:rentId},callback) ;
}

module.exports.deleteRent = function(rentId,callback){
  Rent.remove({_id:rentId},callback)
}
