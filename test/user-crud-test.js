/**
 * Test users REST API
 */
var assert = require('chai').assert;

var userSchema = require('../models/user-schema');
var mongoose = require('mongoose');

var mlab = require('../config/database.js');
describe("Your test", function () {
    var testUser = {
        login:"testLogin",
        email:"testEmail",
        password:"testPassword"
    };
});