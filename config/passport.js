/**
 * JWT strategy for PassportJS.
 *
 * Adds the JwtStrategy to our passport,
 * just defines how PassportJS tries to find a user with a given jwt_payload.id.
 */
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var mongoose = require('mongoose');
var UserModel = require('../models/user-model');
var databaseConfig = require('../config/database'); // get db config file

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = databaseConfig.secret;

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        mongoose.model('UserModel').findOne({id: jwt_payload.id}, function(err, user) {
            if (err) return done(err, false);
            
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};