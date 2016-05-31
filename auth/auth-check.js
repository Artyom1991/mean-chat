/**
 * Authenticating user module.
 */
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var databaseConfig = require('../config/database'); // get db config file
var passport = require('passport');

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

        var encodedToken = jwtToken.split(' ')[1];
        var tokenUser = jwt.decode(encodedToken, databaseConfig.secret);

        /** fetch user from DB by login from jwtToken*/
        mongoose.model('UserModel').findOne({
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