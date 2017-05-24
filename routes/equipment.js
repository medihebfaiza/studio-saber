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
      res.sendStatus(404) ;
    }
    else {
      res.sendStatus(201) ;
    }
  });
});


router.get("/all",function(req,res){
  Equipment.getAllEquipment(function(err,equipment){
    if (err){
      res.sendStatus(404) ;
    }
    else {
      res.status(200);
      res.json(equipment);
    }
  });
});

router.get("/available",function(req,res){
  Equipment.getAvailableEquipment(function(err,equipment){
    if (err){
      res.sendStatus(404) ;
    }
    else {
      res.status(200);
      res.json(equipment);
    }
  });
});

router.get("/:equipmentId",function(req,res){
  var data = req.params ;
  Equipment.getEquipment(data.equipmentId,function(err,equipment){
    if (err){
      res.sendStatus(404) ;
    }
    else {
      res.status(200);
      res.json(equipment);
    }
  });
});

router.patch("/available/:equipmentId",function(req,res){
  var data = req.params ;
  Equipment.makeAvailable(data.equipmentId,function(err){
    if (err){
      res.sendStatus(404);
    }
    else {
      res.sendStatus(200);
    }
  });
});

router.patch("/unavailable/:equipmentId",function(req,res){
  var data = req.params ;
  Equipment.makeUnAvailable(data.equipmentId,function(err){
    if (err){
      res.sendStatus(404);
    }
    else {
      res.sendStatus(200);
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
