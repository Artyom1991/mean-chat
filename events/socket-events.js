/**
 * Socket.io events handler
 *
 * @param io
 */
var util = require('util');
var ChatMessage = require('../models/chat-message-model');

module.exports = function (io) {
    /** subscribe on events from client*/
    io.on('connection', function (client) {
        //user connected event
        console.log('a user connected');
        client.broadcast.emit('user connected');

        //user disconnected event
        client.on('disconnect', function () {
            console.log('user disconnected');
        });

        //incoming message from user
        client.on('chat message', function (messagePlainText) {
            try {
                /** create message obj from incoming message text*/
                var newMsg = new ChatMessage({
                    userLogin: "mock-stub",
                    message: messagePlainText,
                    created: new Date()
                });

                /** save message to DB*/
                newMsg.save(function (err, msg) {
                    if (err)
                        console.log("Error while saving chat message to DB:\r\n%s", err);
                    else {
                        /** send message to those connected*/
                        io.emit('chat message created', messagePlainText);
                    }
                });
            } catch (e) {
                console.log(e);
                client.disconnect();
            }
        });
    })
};