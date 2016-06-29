/**
 * @see <a href="https://www.npmjs.com/package/jasmine-node"></a>
 * @see <a href="https://www.npmjs.com/package/async"></a>
 */
const request = require("request");
const util = require('util');
const async = require('async');
const nconf = require('nconf');

// get test user obj
nconf.reset();
nconf.argv().env()
    .add('testUser', {type: 'file', file: 'spec/resources/test-user.json'});

let testUser = nconf.get("testUser");

/** URL */
const BASE_URL = `http://localhost:3000`;
const REGISTRATION_URL = `${BASE_URL}/sign-up`;
const LOGIN_URL = `${BASE_URL}/sign-in`;
const USERS_API_URL = `${BASE_URL}/api/users`;
const TEST_USER_URL = `${USERS_API_URL}/${testUser.login}`;

/**
 * Test user CRUD
 */
describe("CRUD", function () {
    let authToken = "";

    /** create new test user*/
    beforeEach(function (done) {
        async.waterfall([
                /** register new test user*/
                    function (next) {
                    request.post({
                        headers: {'content-type': 'application/json'},
                        url: REGISTRATION_URL,
                        body: JSON.stringify(testUser)
                    }, next)
                },
                function (response, body, next) {
                    expect(response.statusCode).toBe(201);
                    next();
                },
                /** log in*/
                    function (next) {
                    request.post({
                        headers: {'content-type': 'application/json'},
                        url: LOGIN_URL,
                        body: JSON.stringify(testUser)
                    }, next)
                },
                function (response, body, next) {
                    authToken = JSON.parse(body).token;
                    expect(response.statusCode).toBe(200);
                    next(null, body);
                }],
            function (err, result) {
                expect(err).toBe(null);
                done();
            }
        );
    });

    /** delete recently created test user */
    afterEach(function (done) {
        async.waterfall([
                function (next) {
                    request({
                        headers: {'Authorization': authToken},
                        method: 'DELETE',
                        url: TEST_USER_URL
                    }, next)
                },
                function (response, body, next) {
                    expect(response.statusCode).toBe(200);
                    next(null, body);
                }],
            function (err, result) {
                expect(err).toBe(null);
                done();
            }
        )
    });

    /** fetch single user*/
    it("GET single user, returns status code 200", function (done) {
        async.waterfall([
            function (callback) {
                request.get({
                    headers: {'Authorization': authToken},
                    url: TEST_USER_URL
                }, callback);
            },
            function (response, body) {
                console.log("Response for fetching single user: \r\n%s", body);
                expect(response.statusCode).toBe(200);
                done();
            }
        ]);
    });

    /** update single user*/
    it("PUT - update single user", function (done) {
        //update email
        testUser.email = "updatedemal@mail.ru";
        async.waterfall([
            function (callback) {
                console.log("Sending PUT request with new user %s", JSON.stringify(testUser));
                request.put({
                    headers: {
                        'Authorization': authToken,
                        'content-type': 'application/json'
                    },
                    url: TEST_USER_URL,
                    body: JSON.stringify(testUser)
                }, callback);
            },
            function (response, body) {
                console.log("Response for updating single user: \r\n%s", body);
                expect(response.statusCode).toBe(200);
                done();
            }
        ]);
    });

    xit("GET all users from not-admin user", function (done) {
        request.get({
            headers: {'Authorization': authToken},
            url: USERS_API_URL
        }, function (error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
})
;
