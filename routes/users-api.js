/**
 * Users REST API implementation.
 */

var express = require('express');
var mongoose = require('mongoose');
var UserSchema = require('../models/user-model');
var jwt = require('jwt-simple');
var util = require('util');
var HttpStatus = require('http-status-codes');
var passport = require('passport');
var router = express.Router();

/**
 * GET all users from DB
 */
router.get('/', function (req, res, next) {
    mongoose.model('UserModel').find({}, function (err, users) {
        if (err) {
            return console.error(err)
        }
        else {
            res.json(users);
        }
    })
});

/**
 * GET single user by login
 * :user_login user's login to find by
 */
router.get('/:user_login', function (req, res, next) {
    mongoose.model('UserModel').findOne({login: req.params.login},
        function (err, user) {
            if (err) {
                console.log("While requesting for user with login " +
                    req.params.login + " error occurs: " + err);
                res.statusCode = HttpStatus.NOT_FOUND;
                res.end();
            }
            else {
                if (user)
                    res.json(user);
                else {
                    res.statusCode = HttpStatus.NO_CONTENT;
                    res.end();
                }
            }
        })
});

/**
 * POST (create) new user
 */
router.post('/', function (req, res) {
    //simple validation
    //TODO validate user data here
    if (!req.body.login || !req.body.email || !req.body.password) {
        res.statusCode =  HttpStatus.BAD_REQUEST;
        //TODO message to client with invalid format user fields
        res.send('Wrong or missed user fields: (not implemented yet)');
    } else {
        var newUser = new UserSchema({
            login: req.body.login,
            email: req.body.email,
            password: req.body.password
        });

        /** trying to save new user*/
        newUser.save(function (err) {
            console.log('Trying to save user %j', newUser);
            if (err) {
                console.log("Maybe User already exists in DB, err: %s", err);
                res.statusCode =  HttpStatus.CONFLICT;
                res.send(util.format('User with login %s already exists in DB', newUser.login));
            }
            res.statusCode =  HttpStatus.OK;
            res.end();
        });
    }
});

/**
 * PUT (edit) user by login
 * :user_login user's login to find by
 */
router.put('/:user_login', function (req, res) {
    mongoose.model('UserModel').findOneAndUpdate({login: req.params.login}, req.body, function (err) {
        if (err) {
            res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            res.send(util.format("There was a problem updating in DB user:\r\n%s\r\n%s", req.params, err));
        } else {
            //User has been created
            console.log("User has been edited: %j", req.body);
            res.statusCode = HttpStatus.OK;
            res.end();
        }
    });
});

/**
 * DELETE user by login
 * :user_login user's login to find by
 */
router.delete('/:user_login', function (req, res) {
    mongoose.model('UserModel').remove({login: req.params.login},
        function (err, user) {
            if (err) {
                console.log("While deleting user with login " +
                    req.params.login + " error occurs: " + err);
                res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
                res.end();
            }
            else {
                if (user)
                    res.json(user);
                else {
                    res.statusCode = HttpStatus.NOT_FOUND;
                    res.end();
                }
            }
        })
});

/**
 * DELETE all users
 */
router.delete('/', function (req, res) {
    mongoose.model('UserModel').remove({},
        function (err) {
            if (err) {
                console.log("Error while deleting all users");
                res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
                res.end();
            } else {
                console.log("All users successfully deleted");
                res.statusCode = HttpStatus.OK;
                res.end();
            }
        })
});

module.exports = router;