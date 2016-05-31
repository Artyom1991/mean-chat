var myApp = angular.module('SignUpApp', []);

myApp.controller('UserSignUpCtrl', function ($scope, $http, $window) {
    $scope.user = {
        login: '',
        email: '',
        password: ''
    };

    $scope.confirmPasswordValue = '';

    $scope.signUp = function () {
        $http
            .post('/api/users', $scope.user)
            .success(function (data, status, headers, config) {
                $scope.messageToUser = 'User successfully registered';
                window.location.href = '/index.html';
            })
            .error(function (data, status, headers, config) {
                console.log("data: %j\r\nstatus: %d\r\n", data, status);
                $scope.error = 'Error: Invalid login or email or password';
            });
    };
})