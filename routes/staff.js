var express = require('express');
var router = express.Router();
var Staff = require("../models/staff.js");

/* Creating a new Staff */
router.post("/create",function(req,res){
  var newStaff = new Staff({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
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
      res.json({
        message : "A Staff is already created with this Email"
      });
    }
    else {
      Staff.createStaff(newStaff, function(err){
        if (err) {
          res.json({
            message: "Failed to create Staff Account"
          });
        }
        else {
          res.json({
            message: "Staff Account has been created successfully !"
          });
        }
      });
    }
  });
});

/* Deleting Staff */
router.post("/delete",function(req,res){
  Staff.deleteStaffByEmail(req.body.email,function(err){
    if (err) {
      res.json({
        message : "Failed to remove Staff"
      });
    }
    else {
      res.json({
        message : "Removed Staff Successfully"
      });
    }
  });
});

module.exports = router;
