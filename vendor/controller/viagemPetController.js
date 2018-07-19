(function () {
    'use strict';

    angular.module('myApp').controller('viagemPetController', viagemPetController);

    viagemPetController.$inject = ['viagemPetAPI','$scope','$rootScope', '$location', '$route', '$filter'];

    function viagemPetController(viagemPetAPI, $scope, $rootScope, $location, $route, $filter) {

        /*$scope.infos = [];
        $scope.finds = [];
        $scope.fi = false;

        $scope.save = function (info) {
            viagensAPI.save(info).then(function (data) {
                console.log(data);
                $scope.list();
            })
        };

        $scope.update = function(info){
            viagensAPI.update(info).then(function (data) {
                console.log(data);
                $scope.list();
                $scope.inf = '';
            })
        };

        $scope.delete = function(id){
            viagensAPI.delete(id).then(function (data) {
                console.log(data);
                $scope.list();
            })
        };

        $scope.list = function () {
            viagensAPI.list().then(function (data) {
                $scope.infos = data.data;
            })
        };

        $scope.pesquisar = function(estado, cidade){
            var f = [];
            for(var i=0; i<$scope.infos.length; i++){
                for(var j=0; j<$scope.infos[i].paises.length; j++) {
                    if(estado.Pais === $scope.infos[i].paises[j].local) {
                        f.push($scope.infos[i]);
                        $scope.fi = true;
                    }
                }
                for(var w=0; w<$scope.infos[i].regioes.length; w++) {
                    if(estado.Regiao === $scope.infos[i].regioes[w].local) {
                        f.push($scope.infos[i]);
                        $scope.fi = true;
                    }
                }
                for(var x=0; x<$scope.infos[i].estados.length; x++) {
                    if(estado.nome_uf === $scope.infos[i].estados[x].local) {
                        f.push($scope.infos[i]);
                        $scope.fi = true;
                    }
                }
                for(var y=0; y<$scope.infos[i].cidades.length; y++) {
                    if(cidade.nome_municipio === $scope.infos[i].cidades[y].local) {
                        f.push($scope.infos[i]);
                        $scope.fi = true;
                    }
                }
            }
            $scope.finds = f;
        };

        $scope.registrarCuidado = function(_id, cuidado){
            viagensAPI.registerCuidado(_id, cuidado).then(function (data) {
                console.log(data);
                $scope.list();
                $scope.cuidado = '';
            })
        };

        $scope.updateCuidado = function(_id, cuidado){
            viagensAPI.updateCuidado(_id, cuidado).then(function (data) {
                console.log(data);
                $scope.list();
            })
        };

        $scope.deleteCuidado = function(_id, cuidado){
            viagensAPI.deleteCuidado(_id, cuidado).then(function (data) {
                console.log(data);
                $scope.list();
            })
        };

        $scope.registrarLocal = function(_id, localizacao){
            console.log(_id, localizacao);
            viagensAPI.registerLocalizacao(_id, localizacao).then(function (data) {
                console.log(data);
                $scope.list();
                $scope.localizacao = '';
            })
        };

        $scope.updateLocal = function(_id, localizacao){
            viagensAPI.updateCuidado(_id, localizacao).then(function (data) {
                console.log(data);
                $scope.list();
            })
        };

        $scope.deleteLocal = function(_id, localizacao){
            viagensAPI.deleteCuidado(_id, localizacao).then(function (data) {
                console.log(data);
                $scope.list();
            })
        };

        $scope.setInfo = function(info){
            $scope.inf = info;
        };

        $scope.setInfoCuidado = function(info, cuidado){
            $scope.infs = info;
            $scope.cuid = cuidado;
        };

        $scope.list();*/
    }
})();