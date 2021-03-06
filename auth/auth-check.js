/**
 * Authenticating user module.
 */
"use strict";
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
const log = require('../utils/logger')(module);
const nconf = require('nconf');

/** read configuration*/
nconf.reset();
nconf.argv()
    .env()
    .file({file: 'config/common-config.json'});

const SECRET_KEY = nconf.get("security:secret");

module.exports = {
    /**
     * Check that user JWT token is valid.
     *
     * Token is string: "JWT 'SHA256 encoded user obj' ".
     * @param jwtToken
     * @param unAuthorizedCallback - callback if user unauthorized
     * @param authorizedCallback(user) - callback if user authorized
     */
    checkAuthToken:function (jwtToken, unAuthorizedCallback, authorizedCallback) {        
        if (!jwtToken) return unAuthorizedCallback();

        //var encodedToken = jwtToken.split(' ')[1];

        try {
            var tokenUser = jwt.decode(jwtToken, SECRET_KEY);
        } catch (err){
            log.error(err)
        }

        /** fetch user from DB by login from jwtToken*/
        mongoose.model('User').findOne({
            login: tokenUser.login
        }, function (err, dbUser) {
            if (err) throw err;

            /** if user exists in DB*/
            if (dbUser) {
                /** if password from token matches password from DB, authorize user*/
                tokenUser.password === dbUser.password ? authorizedCallback(dbUser) : unAuthorizedCallback();
            } else {
                unAuthorizedCallback();
            }
        });
    }
};