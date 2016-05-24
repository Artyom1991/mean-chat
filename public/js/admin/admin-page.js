var adminApp = angular.module("AdminPageApp", ['ngRoute']);

/**
 * Provider of the $route service.
 *
 * Navigating throw admin resources.
 */
adminApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'admin-templates/users-table-template.html',
            controller: 'UsersCtrl'
        }).
        when('/showUserApiTest', {
            templateUrl: 'templates/show-orders.html',
            controller: 'UsersAPICtrl'
        }).
            when('/showMessages',{
            templateUrl: 'admin-templates/messages-table-template.html',
            controller: 'MessagesCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

/**
 * Users controller.
 *
 * Retrieve all users.
 */
adminApp.controller("UsersCtrl", function ($scope, $http) {
    $http.get("/api/users")
        .then(function (response) {
            $scope.users = response.data;
        });
});

/**
 * Messages controller
 *
 * Retrieve all messages.
 */
adminApp.controller("MessagesCtrl", function ($scope, $http) {
    $http.get("/messages-api")
        .then(function (response) {
            $scope.messages = response.data;
        });
});