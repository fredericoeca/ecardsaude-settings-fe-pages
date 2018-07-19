(function () {
    'use strict';
    angular.module('myApp').controller('researchController', researchController);

    researchController.$inject = ['researchesAPI','$scope','$location', '$route'];

    function researchController(researchesAPI, $scope, $location, $route) {

        $scope.researches = [];
        $scope.loading = false;
        $scope.news;

        $scope.list = function () {
            researchesAPI.list().then(function (data) {
                $scope.researches = data.data;
            })
        };

        $scope.nResearcheNew = function(){
            researchesAPI.nResearchNew().then(function (data) {
                $scope.news = data;
                $scope.list();
            })
        };

        $scope.deleteRe = function (not) {
            researchesAPI.delete(not).then(function (data) {
                console.log(data);
                $scope.list();
            })
        };

        $scope.refresh = function () {
            $scope.loading = true;
            researchesAPI.refresh().then(function (data) {
                console.log(data);
                $scope.loading = false;
                if(data.cod = 901) {
                    console.log(data);
                }
                $scope.nResearcheNew();
            })
        };

        $scope.teste = function(){

        };

        $scope.list();
    }
})();
