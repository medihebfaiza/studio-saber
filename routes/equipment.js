var express = require('express');
var router = express.Router();
var Equipment = require("../models/equipment.js");

router.post("/create",function(req,res){
  var newEquipment = new Equipment ({
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    image: req.body.image,
    rental: req.body.rental,
    price: req.body.price,
    available: req.body.available
  });
  Equipment.createEquipment(newEquipment,function(err){
    if (err){
      res.json({
        message : "Couldn't create Equipment"
      });
    }
    else {
      res.json({
        message : "Created Equipment successfully"
      });
    }
  });
});


router.get("/all",function(req,res){
  Equipment.getAllEquipment(function(err,equipment){
    if (err){
      res.json({
        message : "Error"
      });
    }
    else {
      res.json(equipment);
    }
  });
});

router.get("/available",function(req,res){
  Equipment.getAvailableEquipment(function(err,equipment){
    if (err){
      res.json({
        message : "Error"
      });
    }
    else {
      res.json(equipment);
    }
  });
});

router.get("/:equipmentId",function(req,res){
  var data = req.params ;
  Equipment.getEquipment(data.equipmentId,function(err,equipment){
    if (err){
      res.json({
        message : "Error"
      });
    }
    else {
      res.json(equipment);
    }
  });
});

router.delete("/:equipmentId",function(req,res){
  var data = req.params ;
  Equipment.deleteEquipment(data.equipmentId,function(err){
    if (err){
      res.json({
        message : "Couldn't delete Equipment"
      });
    }
    else {
      res.json({
        message : "Deleted Equipment successfully"
      });
    }
  });
});

module.exports = router;
