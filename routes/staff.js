var express = require('express');
var router = express.Router();
var Staff = require("../models/staff.js");

/* Creating a new Staff */
router.post("/create",function(req,res){
  var newStaff = new Staff({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    category: req.body.category,
    age: req.body.age,
    telNumber: req.body.telNumber,
    wage: req.body.wage,
    description: req.body.description,
    image: req.body.image,
    email: req.body.email,
    password: req.body.password
  });

  Staff.getStaffByEmail(req.body.email,function(err,staff){
    if (err) throw err ;
    if (staff){
      res.sendStatus(409);
    }
    else {
      Staff.createStaff(newStaff, function(err){
        if (err) {
          res.sendStatus(404);
        }
        else {
          res.sendStatus(201);
        }
      });
    }
  });
});

router.get("/all",function(req,res){
  Staff.getAllStaff(function(err,staff){
    if (err){
      res.sendStatus(404);
    }
    else {
      res.status(200) ;
      res.json(staff);
    }
  });
});

router.get("/:staffId",function(req,res){
  var data = req.params ;
  Staff.getStaffById(data.staffId,function(err,staff){
    if (err){
      res.sendStatus(404);
    }
    else {
      res.status(200);
      res.json(staff);
    }
  });
});

router.patch("/:staffId",function(req,res){
  var data = req.params ;
  Staff.updateStaffPassword(data.staffId,req.body.newPassword,function(err){
    if (err) {
      res.sendStatus(404) ;
    }
    else {
      res.sendStatus(200) ;
    }
  });
});

router.delete("/:staffId",function(req,res){
  var data = req.params ;
  Staff.deleteStaffById(data.staffId,function(err){
    if (err) {
      res.sendStatus(404);
    }
    else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
