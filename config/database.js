/**
 * Database connection to mLab.
 *
 * @see {@link http://blog.mlab.com/2014/04/mongodb-driver-mongoose/}
 */

var mongoose = require('mongoose');
/** secret key for encrypting, for example - users pass in DB */
var MONGODB_SECRET_KEY = "secretKey";
//TODO need to encrypt 34dream:e34dream
/** URI for connection to mLab */
var MONGODB_URI = 'mongodb://e34dream:e34dream@ds055762.mlab.com:55762/chatusersdb';


/**
 * Connect to Mongo DB by URI
 *
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
(function (){
    /** connection options*/
    var options = {
        server: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}},
        replset: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}}
    };

    /** connect to mLab*/
    mongoose.connect(MONGODB_URI, options);

    var conn = mongoose.connection;

    conn.on('error', console.error.bind(console, 'DB connection error'));

    /** while connection opens successfully*/
    conn.once('open', function () {
        console.log("Database connection established to %s", MONGODB_URI);
    });
})();

module.exports = mongoose;
module.exports = {
    'secret': MONGODB_SECRET_KEY
};