/**
 * Check auth JWT token.
 *
 * Parse token, get user's login & password,
 * find user by login in DB and compare password from jwt and obtained from DB.
 *
 * @param authToken {string} - JWT encoded token.
 * @param success
 * @param fail
 */
module.exports.checkAuthToken = function (authToken, success, fail) {
    
};