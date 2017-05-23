var express = require('express');
var router = express.Router();
var Client = require("../models/client.js");
var jwt = require("jwt-simple");
var cfg = require("../config.js");
var auth = require("../auth.js")();

/* Registration Route */
router.post("/register", function(req,res){
  /* Tout mettre dans le module */
  var newClient = new Client({
			firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      telNumber: req.body.telNumber,
			email: req.body.email,
			password: req.body.password
		});
  console.log("Trying to add client : "+newClient);//TEST

  /* Should Check if client already exists befo */
  Client.getClientByEmail(req.body.email,function(err,client){
    if (err) throw err ;
    if (client){
      res.json({
        message: "An Account is already created with this Email"
      });
    }
    else {
      Client.createClient(newClient,function(err){
        if (err){
          res.json({
            message: "Failed to create Client Account"
          });
        }
        else {
          res.json({
            message: "Your Client Account has been created successfully !"
          });
        }
      });
    }
  });
});

// Generating tokens for authenticated clients
router.post("/login", function(req, res) {
    var email = req.body.email || req.headers['email'];
    var password = req.body.password || req.headers['password'];
    if (email && password) {
      console.log('Client '+email+' Trying to login with Password : '+password) ;//TEST
      Client.getClientByEmail(email,function(err,client){
        if (err) throw err ;
        if (!client){
          res.sendStatus(401);
        }
        else {
          Client.comparePassword(password,client.password, function(err,isMatch){
            if(err) throw err;
            if (!isMatch){
              console.log('wrong password') ;//TEST
              res.json({
                message : 'wrong',
                token : ''
              });
            }
            else {
              var payload = {
                  id: client._id
              };
              var token = jwt.encode(payload, cfg.jwtSecret); //Generates the token
              console.log('Client '+email+' got the Token') ;//TEST
              res.json({
                token : token
              }) ;
            }
          });
        }
      });
    }
});

router.get("/client", auth.authenticate(), function(req, res) {
    console.log('client '+req.user.id+' trying to access /client');//TEST
    res.json({
        message: "This message can only be seen by our lovely clients"
    });
});

module.exports = router;
