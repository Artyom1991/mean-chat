var app = angular.module('bookWorldApp', ['ngRoute', 'authorizationModule'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/books/:letter?', {
                templateUrl: 'books.html',
                controller: 'booksCtrl'
            })
            .when('/login', {
                templateUrl: 'login.html',
                controller: 'loginCtrl'
            })
            .when('/settings', {
                templateUrl: 'settings.html',
                controller: 'settingsCtrl'
            })
            .otherwise({
                redirectTo: '/login'
            });
    });

app.controller('appCtrl', ['$scope', '$location', '$userProvider',
    function($scope, $location, $userProvider) {
        //удобно, чтобы не инжектить $location в дочерних контроллерах
        //однако, плохо для тестирования
        $scope.goTo = function(path) {
            $location.path(path);
        }
        //расширяем самый верхний $scope методами провайдера пользователя
        //после этого удобно использовать эти методы сразу в представлениях (см. books.html)
        angular.extend($scope, $userProvider, true);
    }]);

app.controller('booksCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {
    $scope.booksFilter = $routeParams.letter;
    $scope.books = [{ Name: 'Zen and the Art of Motorcycle Maintenance' },
        { Name: 'Ulysses' }, { Name: 'Gatsby' }, { Name: 'Ginger' }, { Name: 'Zimmermann Telegram' }];
    $scope.bookClick = function(book) {
        $scope.goTo('/books/' + book.Name[0].toLowerCase());
    };
    $scope.filterBooks = function() {
        return function(book) {
            if (!$scope.booksFilter) {
                return true;
            }
            return book.Name[0].toLowerCase() === $scope.booksFilter;
        };
    };
}]);

app.controller('settingsCtrl', ['$scope', function ($scope) { }])