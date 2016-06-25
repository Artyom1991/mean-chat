const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const HttpStatus = require('http-status-codes');
const winston = require('winston');
const nconf = require('nconf');

/** read configuration*/
nconf.reset();
nconf.argv()
    .env()
    .file({file: 'config/common-config.json'});

const SECRET_KEY = nconf.get("security:secret");

/**
 * Route to authenticate a user
 *
 * @method signIn
 * @param req
 * @param res
 */
module.exports.signIn = function (req, res) {
    if (req.body.login && req.body.password) {
        /** find user by login in DB*/
        mongoose.model('User').findOne({
            login: req.body.login
        }, function (err, user) {
            /** user not found in db*/
            if (!user || err) {
                res.statusCode = HttpStatus.UNAUTHORIZED;
                res.end();
            } else {
                winston.info("User trying to log in: %j", user);

                /** Check that client password matches user from DB password.*/
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        let token = jwt.encode(user, SECRET_KEY);

                        /** response to client with token*/
                        res.json({token: token});
                    } else {
                        res.statusCode = HttpStatus.UNAUTHORIZED;
                        res.end();
                    }
                });
            }
        });
    } else {
        winston.info("User trying to log in without login or password");
        res.statusCode = HttpStatus.BAD_REQUEST;
        res.end();
    }
};