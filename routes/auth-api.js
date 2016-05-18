// bundle our routes
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var UserSchema = require('../models/user-model');
var jwt         = require('jwt-simple');
var databaseConfig = require('../config/database'); // get db config file
var passport	= require('passport');

// create a new user account (POST http://localhost:8080/api/signup)
/**
 * Duplicated functionality of user api post creating
 * Simple validation and creating new user if all is OK
 * TODO must be refactored
 */
router.post('/sign-up', function(req, res) {
    //simple validation
    if (!req.body.login || !req.body.email || !req.body.password ) {
        res.json({success: false, msg: 'Missed login or email or password in ' + JSON.stringify(req.body)});
    } else {
        var newUser = new  UserSchema({
            login: req.body.login,
            email: req.body.email,
            password: req.body.password
        });

        /** trying to save new user*/
        newUser.save(function(err) {
            console.log('Trying to save user %s', JSON.stringify(newUser));
            if (err) {
                console.log("Maybe User already exists in DB, err: %s",err);
                return res.json({success: false, msg: 'Username already exists'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/sign-in', function(req, res) {
    mongoose.model('UserModel').findOne({
        login: req.body.login
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            console.log("User %s trying to sing in", user);
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, databaseConfig.secret);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

// route to a restricted info (GET http://localhost:8080/api/memberinfo)
router.get('/member-info', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, databaseConfig.secret);

        mongoose.model('UserModel').findOne({
            login: decoded.login
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                res.json({success: true, msg: 'Welcome in the member area ' + user.login + '!'});
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});

var getToken = function (requestHeaders) {
    if (requestHeaders && requestHeaders.authorization) {
        var parted = requestHeaders.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;