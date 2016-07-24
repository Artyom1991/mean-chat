var myApp = angular.module('SignUpApp', []);
const BAD_REQUEST = 400;
const CONFLICT = 409;

myApp.controller('UserSignUpCtrl', function ($scope, $http, $window) {
    const SIGN_UP_URL = "/sign-up";

    $scope.user = {
        login: '',
        email: '',
        password: ''
    };

    $scope.serverRegistrationErrorMessage = "";

    $scope.submitSignUpForm = function () {
        /** if user fields valid*/
        if ($scope.signUpForm.$valid) {
            $http
                .post(SIGN_UP_URL, $scope.user)
                .success(function (data, status, headers, config) {
                    /** save received auth token */
                    TokenHandler.saveToken(data.token);
                    //redirect to index page
                    window.location.href = '/html/index.html';
                })
                .error(function (resBody, status, headers, config) {
                    console.log("Registration problem, server response: %s\r\nstatus: %d\r\n", JSON.stringify(resBody), status);
                    switch (status) {
                        case BAD_REQUEST :
                            $scope.serverRegistrationErrorMessage = resBody.email ? resBody.email.message : resBody.login ? resBody.login.message : resBody.password ? resBody.password.message : "Unexpected validation problem";
                            break;
                        case CONFLICT :
                            $scope.serverRegistrationErrorMessage = "User already exists!";
                            break;
                    }
                });
        }
    }
});

