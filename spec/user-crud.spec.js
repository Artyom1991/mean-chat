const request = require("request");
const util = require('util');
const nconf = require('nconf');

// get test user obj
nconf.reset();
nconf.argv().env()
    .add('testUser', {type: 'file', file: 'spec/test-users/test-user.json'});

let testUser = nconf.get("testUser");

/** URL */
const BASE_URL = `http://localhost:3000`;
const LOGIN_URL = `${BASE_URL}/sign-in`;
const USERS_API_URL = `${BASE_URL}/api/users`;
const TEST_USER_URL = `${USERS_API_URL}/${testUser.login}`;

/**
 * Test user CRUD
 */
describe("CRUD", function () {
    let authToken = null;

    /** create new test user*/
    beforeEach(function (done) {
        request.post({
            headers: {'content-type': 'application/json'},
            url: USERS_API_URL,
            body: JSON.stringify(testUser)
        }, function (error, response, body) {
            console.log("Creating new user response: %s", body);
            expect(response.statusCode).toBe(200);

            //log in
            request.post({
                    headers: {'content-type': 'application/json'},
                    url: LOGIN_URL,
                    body: JSON.stringify(testUser)
                },
                function (error, response, body) {
                    // console.log("token:\r\n%s", JSON.parse(body).token);
                    authToken = JSON.parse(body).token;
                    expect(response.statusCode).toBe(200);
                    done();
                });
        });
    });

    /** delete recently created test user */
    afterEach(function (done) {
        request({
                headers: {'Authorization': authToken},
                method: 'DELETE',
                url: TEST_USER_URL
            },
            function (error, response, body) {
                console.log("Response for single user: \r\n%s", body);
                expect(response.statusCode).toBe(200);
                done();
            }
        );
    });

    it("GET single user, returns status code 200", function (done) {
        request.get({
            headers: {'Authorization': authToken},
            url: TEST_USER_URL,
            body: JSON.stringify(testUser)
        }, function (error, response, body) {
            console.log("Response for single user: \r\n%j", body);
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    it("GET all users from not-admin user", function (done) {
        request.get({
            headers: {'Authorization': authToken},
            url: USERS_API_URL
        }, function (error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});
