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
        /** user not found in db*/
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

module.exports = router;