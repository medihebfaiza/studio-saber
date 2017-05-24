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
      res.json({
        message : "Couldn't create Rent"
      });
    }
    else {
      res.json({
        message : "Created Rent successfully"
      });
    }
  });
});

router.patch("/confirm/:rentId",function(req,res){
  var data = req.params ;
  Rent.confirmRent(data.rentId,function(err){
    if (err){
      res.status(err).send("Couldn't Confirm Rent");
    }
    else {
      res.status(200).send("OK");
    }
  });
});

router.get("/all",function(req,res){
  Rent.getRents(function(err,rents){
    if (err){
      res.json({
        message : "Error"
      });
    }
    else {
      res.json(rents);
    }
  });
});

router.get("/:rentId",function(req,res){
  var data = req.params ;
  Rent.getEquipment(data.rentId,function(err,rent){
    if (err){
      res.json({
        message : "Error"
      });
    }
    else {
      res.json(rent);
    }
  });
});

router.get("/client/:clientId",function(req,res) {
  var data = req.params ;
  Rent.getClientRents(data.clientId,function(err,rents){
    if (err){
      res.json({
        message : "Error"
      });
    }
    else {
      res.json(rents);
    }
  });
});

router.get("/equipment/:equipmentId",function(req,res) {
  var data = req.params ;
  Rent.getEquipmentRents(data.equipmentId,function(err,rents){
    if (err){
      res.json({
        message : "Error"
      });
    }
    else {
      res.json(rents);
    }
  });
});

router.delete("/:rentId",function(req,res){
  var data = req.params ;
  Rent.deleteRent(data.rentId,function(err){
    if (err){
      res.json({
        message : "Couldn't delete Rent"
      });
    }
    else {
      res.json({
        message : "Deleted Rent successfully"
      });
    }
  });
});

module.exports = router;
