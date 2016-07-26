const chatApp = angular.module("chatApp", ['ngRoute']);

/**
 * Provider of the $route service.
 *
 * chat page elements.
 */
chatApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/chat', {
            templateUrl: './chat.html'
            // controller: 'ChatCtrl'
        }).
        when('/sign-in',{
            templateUrl: './html/auth_templates/sign-in.html',
            controller: 'SignInCtrl'
        }).
        when('/sign-up',{
            templateUrl: './html/auth_templates/sign-up.html',
            controller: 'SignUpCtrl'
        }).
        otherwise({
            templateUrl: './chat.html'
            // controller: 'ChatCtrl'
        });
    }]);
