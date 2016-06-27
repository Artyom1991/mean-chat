var myApp = angular.module('SignUpApp', []);

myApp.controller('UserSignUpCtrl', function ($scope, $http, $window) {
    const SIGN_UP_URL = "/sign-up";

    $scope.user = {
        login: '',
        email: '',
        password: ''
    };

    $scope.confirmPasswordValue = '';

    $scope.signUp = function () {
        /** check user fields */
        let userValidationObj = validateUserStr($scope.user, $scope.confirmPasswordValue);

        $scope.registrationErrorMessage = "";

        /** if user fields valid*/
        if ($scope.registrationErrorMessage == "") {
            console.log($scope.registrationErrorMessage);
            $http
                .post(SIGN_UP_URL, $scope.user)
                .success(function (data, status, headers, config) {
                    //redirect to index page
                    window.location.href = '/index.html';
                })
                .error(function (data, status, headers, config) {
                    console.log("data: %j\r\nstatus: %d\r\n", data, status);
                    $scope.registrationErrorMessage = data;
                });
        }
    };

    /**
     * Validate user fields.
     *
     * @param user - user obj
     * @param {string} confirmPassVal
     * @returns {Object} - user validation object
     */
    function validateUserStr(user, confirmPassVal) {
        let userValidationObj = {
            invalidLogin: user.login ? false : "Empty login\r\n",
            invalidEmail: user.email ? false : "Empty email\r\n",
            invalidPassword: user.password ? false : "Empty password\r\n",
            invalidConfirmPassVal: (user.password == confirmPassVal) ? false : "Not equal passwords\r\n"
        };

        return (userValidationObj);
    }
})

