(function () {
    'use strict';
    angular.module('myApp').controller('municipiosController', municipiosController);

    municipiosController.$inject = ['$scope','$rootScope','municipiosAPI'];

    function municipiosController($scope, $rootScope, municipiosAPI) {

        $rootScope.municipios = [];

        $scope.list = function () {
            municipiosAPI.list().then(function (data) {
                $rootScope.municipios = data.data;
            })
        };

        $scope.list();
    }
})();