var app = angular.module("AdminPageApp", []);
app.controller("usersTableCtrl", function ($scope, $http) {
    $http.get("/api/users")
        .then(function (response) {
            $scope.users = response.data;
        });
});