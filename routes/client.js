var express = require('express');
var router = express.Router();
var Client = require("../models/client.js");
var jwt = require("jwt-simple");
var cfg = require("../config.js");
var auth = require("../auth.js")();

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

  /* Should Check if client already exists befo */
  Client.getClientByEmail(req.body.email,function(err,client){
    if (err) throw err ;
    if (client){
      res.sendStatus(409) ;
    }
    else {
      Client.createClient(newClient,function(err){
        if (err){
          res.sendStatus(409) ;
        }
        else {
          res.sendStatus(201) ;
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
              res.sendStatus(401);
            }
            else {
              var payload = {
                  id: client._id
              };
              var token = jwt.encode(payload, cfg.jwtSecret); //Generates the token
              res.status(200) ;
              res.json({
                token : token
              }) ;
            }
          });
        }
      });
    }
});

router.get("/all",function(req,res){
  Client.getClients(function(err,clients){
    if (err){
      res.sendStatus(404) ;
    }
    else {
      res.status(200);
      res.json(clients);
    }
  });
});

router.get("/:clientId",function(req,res){
  var data = req.params ;
  Client.getClient(data.clientId,function(err,client){
    if (err){
      res.sendStatus(404) ;
    }
    else {
      res.status(200);
      res.json(client);
    }
  });
});

router.patch("/:clientId",function(req,res){
  var data = req.params ;
  Client.updateClientPassword(data.clientId,req.body.newPassword,function(err){
    if (err){
      res.sendStatus(404) ;
    }
    else {
      res.sendStatus(200) ;
    }
  });
});

router.delete("/:clientId",function(req,res){
  var data = req.params ;
  Client.deleteClientById(data.clientId,function(err){
    if (err){
      res.sendStatus(404) ;
    }
    else {
      res.sendStatus(200) ;
    }
  });
});

router.get("/protected", auth.authenticate(), function(req, res) {
    res.json({
        message: "This message can only be seen by our lovely clients"
    });
});

module.exports = router;
