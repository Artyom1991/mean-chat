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

    // /** create new test user*/
    // xbeforeEach(function (done) {
    //     async.waterfall([
    //             function (callback) {
    //                 console.log("sending user registration request");
    //                 request.post({
    //                     headers: {'content-type': 'application/json'},
    //                     url: REGISTRATION_URL,
    //                     body: JSON.stringify(testUser)
    //                 }, callback(error, response, body))
    //             },
    //             function (error, response, body, next) {
    //                 console.log("Creating new user response: %j", body);
    //                 expect(response.statusCode).toBe(200);
    //                 callback(null, body);
    //             }
    //         ],
    //         function (err, result) {
    //             console.log("finally, res: %j", body);
    //             done();
    //         }
    //     )
    //     ;
    //
    //     // request.post({
    //     //     headers: {'content-type': 'application/json'},
    //     //     url: REGISTRATION_URL,
    //     //     body: JSON.stringify(testUser)
    //     // }, function (error, response, body) {
    //     //     console.log("Creating new user response: %s", body);
    //     //     expect(response.statusCode).toBe(200);
    //     //
    //     //     //log in
    //     //     request.post({
    //     //             headers: {'content-type': 'application/json'},
    //     //             url: LOGIN_URL,
    //     //             body: JSON.stringify(testUser)
    //     //         },
    //     //         function (error, response, body) {
    //     //             // console.log("token:\r\n%s", JSON.parse(body).token);
    //     //             authToken = JSON.parse(body).token;
    //     //             expect(response.statusCode).toBe(200);
    //     //             done();
    //     //         });
    //     // });
    // });
    //
    // /** delete recently created test user */
    // xafterEach(function (done) {
    //     request({
    //             headers: {'Authorization': authToken},
    //             method: 'DELETE',
    //             url: TEST_USER_URL
    //         },
    //         function (error, response, body) {
    //             console.log("Response for single user: \r\n%s", body);
    //             expect(response.statusCode).toBe(200);
    //             done();
    //         }
    //     );
    // });

    it("GET single user, returns status code 200", function (done) {
        // request.get({
        //     headers: {'Authorization': authToken},
        //     url: TEST_USER_URL,
        //     body: JSON.stringify(testUser)
        // }, function (error, response, body) {
        //     console.log("Response for single user: \r\n%j", body);
        //     expect(response.statusCode).toBe(200);
        //     done();
        // });

        async.waterfall([
            function (callback) {
                console.log("Sending request");
                request.get({
                    headers: {'Authorization': authToken},
                    url: TEST_USER_URL,
                    body: JSON.stringify(testUser)
                }, callback);
            },
            function (response, body) {
                console.log("Response for single user: \r\n%j", body);
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
