const chatApp = angular.module("ChatPageApp", ['ngRoute']);

/**
 * Provider of the $route service.
 *
 * chat page elements.
 */
chatApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/chat', {
            templateUrl: './html/chat.html'
            // controller: 'ChatCtrl'
        }).
        when('/sign-in',{
            templateUrl: './html/sign-in.html'
            // controller: 'SignInCtrl'
        }).
        when('/sign-up',{
            templateUrl: './html/sign-up.html'
            // controller: 'SignUpCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);
