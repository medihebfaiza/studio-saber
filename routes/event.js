var express = require('express');
var router = express.Router();
var Event = require("../models/event.js");

router.post("/create",function(req,res){
  var newEvent = new Event ({
    clientId: req.body.clientId,
    staffIds: req.body.staffIds,
    eventType: req.bodyeventType,
    name: req.body.name,
    date: req.body.date,
    address: req.body.address,
    description: req.body.description,
    duration: req.body.duration,
    confirmed: req.body.confirmed,
    done: req.body.done
  });
  Event.createEvent(newEvent,function(err){
    if (err){
      res.sendStatus(404);
    }
    else {
      res.sendStatus(201);
    }
  });
});

router.get("/client/:clientId",function(req,res){
  var data = req.params ;
  Event.getClientEvents(data.clientId,function(err,events){
    if (err){
      res.sendStatus(404);
    }
    else {
      res.status(200);
      res.json(events);
    }
  });
});

router.get("/staff/:staffId",function(req,res){
  var data = req.params ;
  Event.getStaffEvents(data.staffId,function(err,events){
    if (err){
      res.sendStatus(404);
    }
    else {
      res.status(200);
      res.json(events);
    }
  });
});

router.get("/all",function(req,res){
  var data = req.params ;
  Event.getEvents(function(err,events){
    if (err){
      res.sendStatus(404);
    }
    else {
      res.status(200);
      res.json(events);
    }
  });
});

router.patch("/confirm/:eventId",function(req,res){
  var data = req.params ;
  Event.confirmEvent(data.eventId,function(err){
    if (err){
      res.sendStatus(404);
    }
    else {
      res.sendStatus(200);
    }
  });
});

router.patch("/unconfirm/:eventId",function(req,res){
  var data = req.params ;
  Event.unconfirmEvent(data.eventId,function(err){
    if (err){
      res.sendStatus(404);
    }
    else {
      res.sendStatus(200);
    }
  });
});

router.delete("/:eventId",function(req,res){
  var data = req.params ;
  Event.deleteEvent(data.eventId,function(err){
    if (err){
      res.sendStatus(404) ;
    }
    else {
      res.sendStatus(200) ;
    }
  });
});


module.exports = router;
