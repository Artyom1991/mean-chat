// bundle our routes
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var userSchema = require('../models/user-schema');

// create a new user account (POST http://localhost:8080/api/signup)
router.post('/', function(req, res) {
    console.log(req.body);
    if (!req.body.login || !req.body.password) {
        res.json({success: false, msg: 'Please pass name and password.'});
    } else {
        //TODO create single point to user DAO
        var newUser = new User({
            login: req.body.login,
            email: req.body.email,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

module.exports = router;