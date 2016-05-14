var mongoose = require('mongoose');

/**
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
var mlab = (function () {
    var options = {
        server: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}},
        replset: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}}
    };

    var MONGODB_URI = 'mongodb://e34dream:e34dream@ds055762.mlab.com:55762/chatusersdb';

    mongoose.connect(MONGODB_URI, options);

    var conn = mongoose.connection;

    conn.on('error', console.error.bind(console, 'connection error:'));

    conn.once('open', function () {
        console.log("Database connection established");
    });
})();

module.exports = mongoose;
module.exports = mlab;