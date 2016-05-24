/**
 * 
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var UserSchema = require('../models/user-model');
var jwt         = require('jwt-simple');
var databaseConfig = require('../config/database'); // get db config file
var passport	= require('passport');

/**
 * Route to authenticate a user
 */
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

/**
 * Get token from request headers
 *
 * @param requestHeaders request headers
 * @returns token string or null if not exists
 */
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