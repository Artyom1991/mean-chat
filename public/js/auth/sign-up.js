var myApp = angular.module('SignUpApp', []);

myApp.controller('UserSignUpCtrl', function ($scope, $http, $window) {
    $scope.user = {
        login: '',
        email: '',
        password: ''
    };

    $scope.confirmPasswordValue = '';


    $scope.signUp = function () {
        //if user fields valid

        if (($scope.registrationErrorMessage = validateUserStr($scope.user, $scope.confirmPasswordValue)) == "") {
            console.log($scope.registrationErrorMessage);
            $http
                .post('/api/users', $scope.user)
                .success(function (data, status, headers, config) {
                    //redirect to index page
                    window.location.href = '/index.html';
                })
                .error(function (data, status, headers, config) {
                    console.log("data: %j\r\nstatus: %d\r\n", data, status);
                    $scope.registrationErrorMessage = data.errorMessage;
                });
        }
    };

    function validateUserStr(user, confirmPassVal) {
        console.log(user.login);
        return "" +
            (user.login ? "" : "Empty login\r\n") +
            (user.email ? "" : "Empty email\r\n") +
            (user.password ? "" : "Empty password\r\n") +
            (confirmPassVal ? "" : "Empty confirm password\r\n") +
            (user.password == confirmPassVal ? "" : "Not equal passwords ");
    }
});