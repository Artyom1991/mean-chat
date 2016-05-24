/**
 * Socket.io events handler
 *
 * @param io
 */
var util = require('util');

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
        client.on('chat message', function (message, cb) {
            try {
                io.emit('chat message', message);

                client.broadcast.emit('chat message', message);
                cb(util.format("\"%s\" successfully received", message));
            } catch (e) {
                console.log(e);
                client.disconnect();
            }
        });
    })
};