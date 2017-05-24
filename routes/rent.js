var express = require('express');
var router = express.Router();
var Rent = require("../models/rent.js");

router.post("/create",function(req,res){
  var newRent = new Rent ({
    clientId: req.body.clientId,
    equipmentId: req.body.equipmentId,
    date: req.body.date,
    duration: req.body.duration,
    confirmed: req.body.confirmed
  });
  Rent.createRent(newRent,function(err){
    if (err){
      res.sendStatus(404);
    }
    else {
      res.sendStatus(200);
    }
  });
});

router.patch("/confirm/:rentId",function(req,res){
  var data = req.params ;
  Rent.confirmRent(data.rentId,function(err){
    if (err){
      res.sendStatus(404);
    }
    else {
      res.sendStatus(200);
    }
  });
});

router.get("/all",function(req,res){
  Rent.getRents(function(err,rents){
    if (err){
      res.sendStatus(404);
    }
    else {
      res.status(200);
      res.json(rents);
    }
  });
});

router.get("/:rentId",function(req,res){
  var data = req.params ;
  Rent.getRent(data.rentId,function(err,rent){
    if (err){
      res.sendStatus(404);
    }
    else {
      res.status(200);
      res.json(rent);
    }
  });
});

router.get("/client/:clientId",function(req,res) {
  var data = req.params ;
  Rent.getClientRents(data.clientId,function(err,rents){
    if (err){
      res.status(404).send("Error");
    }
    else {
      res.status(200);
      res.json(rents);
    }
  });
});

router.get("/equipment/:equipmentId",function(req,res) {
  var data = req.params ;
  Rent.getEquipmentRents(data.equipmentId,function(err,rents){
    if (err){
      res.status(404).send("Error");
    }
    else {
      res.status(200);
      res.json(rents);
    }
  });
});

router.delete("/:rentId",function(req,res){
  var data = req.params ;
  Rent.deleteRent(data.rentId,function(err){
    if (err){
      res.sendStatus(405);
    }
    else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
