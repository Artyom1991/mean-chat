var authorizationModule = angular.module('authorizationModule', []);

authorizationModule.controller('loginCtrl', ['$scope', 'authorizationFactory', '$location',
    function($scope, authorizationFactory, $location){
        $scope.loginClick = function() {
            if (authorizationFactory.login($scope.login, $scope.pass)) {
                $location.path('/books');
            } else {
                alert('Pass is 123456!');
            }
        }
    }]);

//заглушка фабрики, обращающейся к серверу для проверки авторизации
authorizationModule.factory('authorizationFactory',['$userProvider',
    function($userProvider){
        var login = function(login, pass){
            if (pass !== '123456') {
                return false;
            }
            if (login === 'admin') {
                $userProvider.setUser({Login: login, Roles: [$userProvider.rolesEnum.Admin]});
            } else {
                $userProvider.setUser({Login: login, Roles: [$userProvider.rolesEnum.User]});
            }
            return true;
        }

        return {
            login: login,
        }
    }]);

//провайдер информации о пользователе (роли, логин и тд)
authorizationModule.factory('$userProvider', function(){
    var rolesEnum = {
        Admin: 0,
        User: 1
    };
    var setUser = function(u){
        user = u;
    }
    var getUser = function(){
        return user;
    }

    return {
        getUser: getUser,
        setUser: setUser,
        rolesEnum: rolesEnum
    }
});