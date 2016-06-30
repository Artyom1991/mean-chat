const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** Auth API routing */
/**
 * @api {post} /sign-in/ Log in system, response with access token: JWT.
 * @apiGroup Auth
 *
 * @apiParam {string} login - user's login
 * @apiParam {string} password - users's password
 *
 * @apiSuccess (200) {Object} JWT token
 * @apiSuccess Success-Response:
 *     HTTP/1.1 200 OK
 *     {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Nzc1MGY4YWRmYjQyYzg4MjM4ZDhiMzgiLCJjb2RlIjo0OTY5LCJ2ZXJpZmljYXRpb25fc3RhdHVzIjoiYWN0aXZlIiwicm9sZSI6InVzZXIiLCJsb2dpbiI6InRlc3QtdXNlci1zaW1wbGUxIiwibmFtZSI6IlZhc2lsaXkgUHlhdG9jaGtpbiIsImVtYWlsIjoibWFpbDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkSlFrNVouUjJSbWpQZTNlMGJIeGxCLktUZ1Iwc1RsQ0VZS0w5aWhjZ2RwbGx4WE9TUVVnZUMiLCJjb21tZW50cyI6InNvbWUgY29tbWVudHMiLCJfX3YiOjAsImRpc2NvdW50Q291cG9ucyI6W3siX2lkIjoiNTc3NTBmOGFkZmI0MmM4ODIzOGQ4YjM5IiwiZGlzY291bnQiOiIyMCUifV0sImFkZHJlc3NfZGV0YWlscyI6bnVsbH0.kul5pY4ULatBkQk-bljT0aRL05D8VO0u7r5mgLF_WnQ"}
 */
app.post('/sign-in', require('./routes/auth-api').signIn);

/**
 * @api {post} /sign-up/ Register in system.
 * @apiGroup Auth
 *
 * @apiParam {Object} user object in request body
 * @apiSuccess (201) {Object} - new user object
 */
app.post('/sign-up', require('./routes/users-api').createNewUser);

/** User API  routing */

/**
 * @api {get} /api/users/:user_login Fetch single user by login.
 * @apiGroup User
 *
 * @apiParam {String} user_login user's login
 *
 * @apiHeader {String} JWT token
 * @apiHeaderExample {String} Header-Example:
 *     {
 *       "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Nzc1MGY4YWRmYjQyYzg4MjM4ZDhiMzgiLCJjb2RlIjo0OTY5LCJ2ZXJpZmljYXRpb25fc3RhdHVzIjoiYWN0aXZlIiwicm9sZSI6InVzZXIiLCJsb2dpbiI6InRlc3QtdXNlci1zaW1wbGUxIiwibmFtZSI6IlZhc2lsaXkgUHlhdG9jaGtpbiIsImVtYWlsIjoibWFpbDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkSlFrNVouUjJSbWpQZTNlMGJIeGxCLktUZ1Iwc1RsQ0VZS0w5aWhjZ2RwbGx4WE9TUVVnZUMiLCJjb21tZW50cyI6InNvbWUgY29tbWVudHMiLCJfX3YiOjAsImRpc2NvdW50Q291cG9ucyI6W3siX2lkIjoiNTc3NTBmOGFkZmI0MmM4ODIzOGQ4YjM5IiwiZGlzY291bnQiOiIyMCUifV0sImFkZHJlc3NfZGV0YWlscyI6bnVsbH0.kul5pY4ULatBkQk-bljT0aRL05D8VO0u7r5mgLF_WnQ"
 *     }
 *
 * @apiSuccess (200) {json} user
 */
app.get('/api/users/:user_login', require('./routes/users-api').getSingleUser);

/**
 * @api {put} /api/users/:user_login Replace user by new one.
 * @apiGroup User
 *
 * @apiParam {String} user_login user's login
 * @apiParam {Object} user object in request body
 *
 * @apiHeader {String} JWT token
 * @apiHeaderExample {String} Header-Example:
 *     {
 *       "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Nzc1MGY4YWRmYjQyYzg4MjM4ZDhiMzgiLCJjb2RlIjo0OTY5LCJ2ZXJpZmljYXRpb25fc3RhdHVzIjoiYWN0aXZlIiwicm9sZSI6InVzZXIiLCJsb2dpbiI6InRlc3QtdXNlci1zaW1wbGUxIiwibmFtZSI6IlZhc2lsaXkgUHlhdG9jaGtpbiIsImVtYWlsIjoibWFpbDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkSlFrNVouUjJSbWpQZTNlMGJIeGxCLktUZ1Iwc1RsQ0VZS0w5aWhjZ2RwbGx4WE9TUVVnZUMiLCJjb21tZW50cyI6InNvbWUgY29tbWVudHMiLCJfX3YiOjAsImRpc2NvdW50Q291cG9ucyI6W3siX2lkIjoiNTc3NTBmOGFkZmI0MmM4ODIzOGQ4YjM5IiwiZGlzY291bnQiOiIyMCUifV0sImFkZHJlc3NfZGV0YWlscyI6bnVsbH0.kul5pY4ULatBkQk-bljT0aRL05D8VO0u7r5mgLF_WnQ"
 *       "content-type": "application/json"
 *     }
 *
 * @apiPermission this user of admin
 *
 * @apiSuccess (200) {json} new user
 */
app.put('/api/users/:user_login', require('./routes/users-api').replaceUserByNew);

/**
 * @api {delete} /api/users/:user_login Delete user.
 * @apiGroup User
 *
 * @apiParam {String} user_login user's login
 *
 * @apiHeader {String} JWT token
 * @apiHeaderExample {String} Header-Example:
 *     {
 *       "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Nzc1MGY4YWRmYjQyYzg4MjM4ZDhiMzgiLCJjb2RlIjo0OTY5LCJ2ZXJpZmljYXRpb25fc3RhdHVzIjoiYWN0aXZlIiwicm9sZSI6InVzZXIiLCJsb2dpbiI6InRlc3QtdXNlci1zaW1wbGUxIiwibmFtZSI6IlZhc2lsaXkgUHlhdG9jaGtpbiIsImVtYWlsIjoibWFpbDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkSlFrNVouUjJSbWpQZTNlMGJIeGxCLktUZ1Iwc1RsQ0VZS0w5aWhjZ2RwbGx4WE9TUVVnZUMiLCJjb21tZW50cyI6InNvbWUgY29tbWVudHMiLCJfX3YiOjAsImRpc2NvdW50Q291cG9ucyI6W3siX2lkIjoiNTc3NTBmOGFkZmI0MmM4ODIzOGQ4YjM5IiwiZGlzY291bnQiOiIyMCUifV0sImFkZHJlc3NfZGV0YWlscyI6bnVsbH0.kul5pY4ULatBkQk-bljT0aRL05D8VO0u7r5mgLF_WnQ"
 *     }
 *
 * @apiPermission this user of admin
 */
app.delete('/api/users/:user_login', require('./routes/users-api').deleteSingleUser);

/**
 * @api {get} /api/users/ Get all users from DB.
 * @apiGroup Admin
 *
 * @apiHeader {String} JWT token
 * @apiHeaderExample {String} Header-Example:
 *     {
 *       "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Nzc1MGY4YWRmYjQyYzg4MjM4ZDhiMzgiLCJjb2RlIjo0OTY5LCJ2ZXJpZmljYXRpb25fc3RhdHVzIjoiYWN0aXZlIiwicm9sZSI6InVzZXIiLCJsb2dpbiI6InRlc3QtdXNlci1zaW1wbGUxIiwibmFtZSI6IlZhc2lsaXkgUHlhdG9jaGtpbiIsImVtYWlsIjoibWFpbDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkSlFrNVouUjJSbWpQZTNlMGJIeGxCLktUZ1Iwc1RsQ0VZS0w5aWhjZ2RwbGx4WE9TUVVnZUMiLCJjb21tZW50cyI6InNvbWUgY29tbWVudHMiLCJfX3YiOjAsImRpc2NvdW50Q291cG9ucyI6W3siX2lkIjoiNTc3NTBmOGFkZmI0MmM4ODIzOGQ4YjM5IiwiZGlzY291bnQiOiIyMCUifV0sImFkZHJlc3NfZGV0YWlscyI6bnVsbH0.kul5pY4ULatBkQk-bljT0aRL05D8VO0u7r5mgLF_WnQ"
 *     }
 *
 * @apiPermission admin
 *
 * @apiSuccess (200) {Array} array of users
 */
app.get('/api/users', require('./routes/users-api').getAllUsers);

/**
 * Messages routing
 */
app.use('/messages-api', require('./routes/messages-api'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
