/**
 * Users REST API implementation.
 */
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const util = require('util');
const HttpStatus = require('http-status-codes');
const passport = require('passport');
const winston = require('winston');
const UserModel = require('../models/user-model');

/**
 * Response all users from DB to client.
 *
 * @method getAllUsers.
 * @param req
 * @param res
 * @param next
 */
module.exports.getAllUsers = function (req, res, next) {
    winston.info("Retrieving all users from DB");
    mongoose.model('User').find({}, function (err, users) {
        if (err || !users) {
            res.statusCode = HttpStatus.NO_CONTENT;
            res.end();
        }
        else {
            res.json(users);
        }
    })
};

/**
 * Response single user by login from DB to client.
 *
 * @method getSingleUser
 * @apiParam {String} :user_login user's login to find by
 * @param req
 * @param res
 * @param next
 */
module.exports.getSingleUser = function (req, res, next) {
    mongoose.model('UserModel').findOne({login: req.params.user_login},
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
};

/**
 * Create new user in DB from client request.
 *
 * @method createNewUser
 * @param req - request contains new user
 * @param res
 */
module.exports.createNewUser = function (req, res) {
    let newUser = new UserModel(req.body);

    /** trying to save new user*/
    newUser.save(function (err, user) {
        if (err || !user) {
            winston('error', "Error while saving user to DB, err: %s", err);
            res.statusCode = HttpStatus.CONFLICT;
            res.end();
        } else {
            res.json(user);
        }
    });
};

/**
 * Replace user by new one from client request.
 *
 * @method replaceUserByNew
 * @apiParam {String} user_login - user's login to find by
 * @param req
 * @param res
 */
module.exports.replaceUserByNew = function (req, res) {
    mongoose.model('User').findOne({login: req.params.user_login},
        function (err, user) {
            if (err) {
                winston.log('error', "While requesting for user with login %s error occurs: %s", req.params.login, err);
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
};

/**
 * Delete user by login.
 *
 * @method deleteSingleUser
 * @apiParam {String} user_login - user's login to delete
 * @param req
 * @param res
 */
module.exports.deleteSingleUser = function (req, res) {
    mongoose.model('User').remove({login: req.params.user_login},
        function (err, user) {
            if (err) {
                winston.log('error', "While deleting user with login %s error occurs: %s", req.params.login, err);
                res.statusCode = HttpStatus.CONFLICT;
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
};