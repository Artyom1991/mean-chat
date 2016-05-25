var myApp = angular.module('SignInApp', []);

myApp.controller('UserSignInCtrl', function ($scope, $http, $window) {
    $scope.user = {
        login: '',
        password: ''
    };

    $scope.isAuthenticated = false;
    $scope.welcome = '';
    $scope.message = '';

    /**
     * Sign in
     *
     * @success save received token to session storage
     * @error delete token from session storage
     */
    $scope.signIn = function () {
        $http
            .post('/auth-api/sign-in', $scope.user)
            .success(function (data, status, headers, config) {
                /** save received token */
                TokenHandler.saveToken(data.token);

                //redirect to index
                window.location.href = '/index.html';
            })
            .error(function (data, status, headers, config) {
                /** erase the token if the user fails to log in*/
                delete $window.sessionStorage.token;

                // Handle login errors here
                $scope.error = 'Error: Invalid login or password';
                $scope.welcome = '';
            });
    };
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