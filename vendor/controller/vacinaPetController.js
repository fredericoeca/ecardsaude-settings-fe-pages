(function () {
    'use strict';

    angular.module('myApp').controller('vacinaPetController', vacinaPetController);

    vacinaPetController.$inject = ['vacinaPetAPI', '$scope','$rootScope', '$location', '$route', '$filter'];

    function vacinaPetController(vacinaPetAPI, $scope, $rootScope, $location, $route, $filter) {

        $scope.vacinasPet = [];
        $rootScope.pet = JSON.parse(sessionStorage.getItem('pet'));

        $scope.list = function () {
            vacinaPetAPI.list().then(function (data) {
                $scope.vacinasPet = data.data;
            })
        };

        $scope.save = function (vacinaPet) {
            vacinaPetAPI.save(vacinaPet).then(function (data) {
                console.log(data);
                $scope.list();
            })
        };

        $scope.update = function (vacPet) {
            vacinaPetAPI.update(vacPet).then(function (data) {
                console.log(data);
                $scope.list();
            })
        };

        $scope.delete = function (vacPet){
            vacinaPetAPI.delete(vacPet._id).then(function (data) {
                console.log(data);
                $scope.list();
            })
        };

        $scope.setPetReg = function(pet, vp){
            $scope.vacinacao = {
                'pet': pet._id,
                'vacina': vp.vacina
            }
        };

        $scope.setPetRegVac = function(pet, reg){
            $scope.p = pet;
            $scope.r = reg;
        };

        $scope.confirmVac = function (vacinaPet) {
            $scope.vp = vacinaPet;
        };

        $scope.list();
    }
})();