var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var mongoose = require('mongoose');
var User = require('../models/user-schema');
var databaseConfig = require('./database'); // get db config file

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = databaseConfig.secret;

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        mongoose.model('UserModel').findOne({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};