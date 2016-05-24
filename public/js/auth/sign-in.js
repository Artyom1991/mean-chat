var myApp = angular.module('SignInApp', []);

myApp.controller('UserCtrl', function ($scope, $http, $window) {
    $scope.user = {
        login: '',
        password: ''
    };

    $scope.isAuthenticated = false;
    $scope.welcome = '';
    $scope.message = '';

    $scope.signIn = function () {
        $http
            .post('/auth-api/sign-in', $scope.user)
            .success(function (data, status, headers, config) {
                $window.sessionStorage.token = data.token;
                $scope.isAuthenticated = true;
                var encodedProfile = data.token.split('.')[1];
                var profile = JSON.parse(url_base64_decode(encodedProfile));
                $scope.welcome = 'Welcome, ' + profile.login;
            })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete $window.sessionStorage.token;
                $scope.isAuthenticated = false;

                // Handle login errors here
                $scope.error = 'Error: Invalid login or password';
                $scope.welcome = '';
            });
    };

    /*$scope.logout = function () {
        $scope.welcome = '';
        $scope.message = '';
        $scope.isAuthenticated = false;
        delete $window.sessionStorage.token;
    };*/
});

myApp.factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                // handle the case where the user is not authenticated
            }
            return $q.reject(rejection);
        }
    };
});

myApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});