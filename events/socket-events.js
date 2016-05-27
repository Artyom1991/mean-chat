/**
 * Socket.io events handler
 *
 * @param io socket.io
 */
var util = require('util');
var ChatMessage = require('../models/chat-message');
var chatCacheInstance = require('../events/chat-cache');

var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var databaseConfig = require('../config/database'); // get db config file
var passport = require('passport');

/**
 * Check that user JWT token is valid.
 *
 * Token is string: "JWT 'SHA256 encoded user obj' ".
 * @param jwtToken
 * @param unAuthorizedCallback - callback if user unauthorized
 * @param authorizedCallback(user) - callback if user authorized
 */
var checkAuthToken = function (jwtToken, unAuthorizedCallback, authorizedCallback) {
    if (!jwtToken) return unAuthorizedCallback();
        
    var encodedToken = jwtToken.split(' ')[1];
    var tokenUser = jwt.decode(encodedToken, databaseConfig.secret);

    /** fetch user from DB by login from jwtToken*/
    mongoose.model('UserModel').findOne({
        login: tokenUser.login
    }, function (err, dbUser) {
        if (err) throw err;

        /** if user exists in DB*/
        if (dbUser){
            /** if password from token matches password from DB, authorize user*/
            tokenUser.password === dbUser.password ? authorizedCallback(dbUser) : unAuthorizedCallback();
        } else {
            unAuthorizedCallback();
        }
    });
};

module.exports = function (io) {
    /** subscribe on events from client*/
    io.on('connection', function (client) {

        /** subscribe on user successfully connected event*/
        client.on('connect', function () {
            console.log('a user connected');
            // client.broadcast.emit('user connected');
        });

        /** subscribe on user trying to authorization event*/
        client.on('authentication', function (token) {
            console.log("user trying to authorize through sockets, user token: %s", token);

            /**
             * Check user token for valid user and password,
             * pass cb function for success and not success (unauthorized)
             */
            checkAuthToken(token,
                /** invalid token*/
                function () {
                    /** if user can't be authorized (wrong token), respond to user*/
                    io.to(client.id).emit('authorization failed', "");
                },

                /** valid token*/
                function (user) {
                    /** respond to user with greeting message*/
                    io.to(client.id).emit('successfully authenticated', "Successfully authenticated!");

                    /** respond all previous messages from chat cache*/
                    io.to(client.id).emit('all previous messages cache', chatCacheInstance.messages);

                    /** subscribe on user incoming message event*/
                    client.on('chat message', function (messagePlainText) {
                        console.log("incoming message: %s", messagePlainText);

                        /** create message obj from incoming message text*/
                        var receivedMsg = new ChatMessage(messagePlainText, user.login);

                        /** store message in cache*/
                        chatCacheInstance.pushMessage(receivedMsg);

                        /** send message to all connected users*/
                        io.emit('chat message created', receivedMsg);
                    });
                })
        });

        /** subscribe on user disconnect event*/
        client.on('disconnect', function () {
            console.log('user disconnected');
        });
    })
};