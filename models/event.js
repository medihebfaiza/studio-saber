var mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
  clientId: String,
  staffIds: [String],
  eventType: String,
  name: String,
  date: Date,
  address: String,
  description: String,
  duration: {
    type: Number,
    min: 1,
    max: 8,
  },
  confirmed: Boolean,
  done: Boolean
});

var Event = module.exports = mongoose.model('Event', EventSchema);

module.exports.createEvent = function(newEvent, callback){
  newEvent.save(callback) ;
}

module.exports.getEvents = function(callback){
  Event.find({},callback) ;
}

module.exports.confirmEvent = function(eventId,callback){
  Event.update({_id:eventId},{confirmed:true},callback) ;
}

module.exports.unconfirmEvent = function(eventId,callback){
  Event.update({_id:eventId},{done:false},callback) ;
}

module.exports.doEvent = function(eventId,callback){
  Event.update({_id:eventId},{done:true},callback) ;
}

module.exports.deleteEvent = function(eventId,callback){
  Event.remove({_id:eventId},callback) ;
}

module.exports.getClientEvents = function(clientId,callback){
  Event.find({clientId:clientId},callback) ;
}
