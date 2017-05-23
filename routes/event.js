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
      res.json({
        message : "Couldn't add Event"
      });
    }
    else {
      res.json({
        message : "Added Event successfully"
      });
    }
  });
});

router.get("/client",function(req,res){
  //ISSUE HERE CAN'T PARSE HEADERS
  console.log("getting events for client "+req.headers['clientId']);//TEST
  Event.getClientEvents(req.headers['clientId'],function(events,err){
    if (err){
      res.json({
        message : "Error"
      });
    }
    else {
      res.json(events);
    }
  });
});

module.exports = router;
