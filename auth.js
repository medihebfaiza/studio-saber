// auth.js
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passportJWT = require("passport-jwt");
var client = require("./models/client.js");
var cfg = require("./config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {
  var strategy = new Strategy(params, function(payload, done) {
    Client.getClientById(payload.id, function(err,client){
      if (err) throw err ;
      if (!client){
        return done(new Error("User not found"), null);
      }
      else {
        return done(null, {
          id: client.id
        });
      }
    });
  });
  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };
};
