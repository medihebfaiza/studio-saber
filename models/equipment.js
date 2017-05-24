var mongoose = require('mongoose');

var EquipmentSchema = mongoose.Schema({
  name: String,
  type: String,
  description: String,
  image: String,
  rental: Number,
  price: Number,
  available: Boolean
});

var Equipment = module.exports = mongoose.model('Equipment', EquipmentSchema);

module.exports.createEquipment = function(newEquipment, callback){
  newEquipment.save(callback) ;
}

module.exports.getAllEquipment = function(callback){
  Equipment.find({},callback) ;
}

module.exports.getEquipment = function(equipmentId,callback){
  Equipment.find({_id:equipmentId},callback) ;
}

module.exports.getAvailableEquipment = function(callback){
  Equipment.find({available:true},callback) ;
}

module.exports.makeAvailable = function(equipmentId,callback){
  Equipment.update({_id:equipmentId},{available:true},callback) ;
}

module.exports.makeUnavailable = function(equipmentId,callback){
  Equipment.update({_id:equipmentId},{available:false},callback) ;
}

module.exports.deleteEquipment = function(equipmentId,callback){
  Equipment.remove({_id:equipmentId},callback)
}
