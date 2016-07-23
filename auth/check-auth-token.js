"use strict";
const jwt = require('jwt-simple');
const mongoose = require('mongoose');
const nconf = require('nconf');
const log = require('../utils/logger')(module);

/** read configuration*/
nconf.reset();
nconf.argv()
    .env()
    .file({file: 'config/common-config.json'});

const SECRET_KEY = nconf.get("security:secret");

/**
 * Check auth JWT token.
 *
 * Parse token, get user's login & password,
 * find user by login in DB and compare password from jwt and obtained from DB.
 *
 * @param {string} authToken - JWT encoded token.
 * @param {function} onSuccess
 * @param {function} onFailure  
 *
 * @author polesskiy
 */
module.exports.checkAuthToken = function (authToken, onSuccess, onFailure) {
    let decodedJWT = null;

    log.info("Auth token from client: %s", authToken);

    //decode jwt token
    try {
        decodedJWT = jwt.decode(authToken, SECRET_KEY);
    } catch (err) {
        return onFailure(err);
    }

    //validate that login && password presents
    if (decodedJWT && decodedJWT.login && decodedJWT.password) {
        log.info("user fields are valid, trying to find user with login %s in DB", decodedJWT.login);

        /** retrieve user by login from DB*/
        mongoose.model('User').findOne({login: decodedJWT.login})
            .then(
                (user) => decodedJWT.password == user.password ?
                    onSuccess(user) : onFailure(new Error("Actual user password and password from token not equals"))
            )
            .catch(onFailure);
    } else
        onFailure(new Error("Now login or password in JWT token"))
};