(function () {
    'use strict';
    angular.module('myApp').controller('notificationController', notificationController);

    notificationController.$inject = ['notificationAPI', '$scope','$location','$rootScope','$route'];

    function notificationController(notificationAPI, $scope, $location, $rootScope, $route) {

        $scope.notifications = [];

        $scope.list = function () {
            notificationAPI.list().then(function (data) {
                $scope.notifications = data.data;
            })
        };

        $scope.save = function (notification) {
            notificationAPI.register(notification).then(function (data) {
                console.log(data);
                $location.path('/notification');
                $scope.list();
            })
        };

        $scope.editar = function (notification) {
            notificationAPI.editar(notification).then(function (data) {
                console.log(data);
                $scope.list();
            })
        };

        $scope.localization = function(notification, municipios){

            var is = false;

            if(notification.regiao === $rootScope.usuario.cidade ){
                return true;
            } else {
                for(var i=0; i < municipios.length; i++){
                    if(notification.regiao === municipios[i].nome_uf || notification.regiao === municipios[i].sigla_uf ||
                        notification.regiao === municipios[i].Regiao || notification.regiao === municipios[i].Pais){
                        if(municipios[i].sigla_uf === $rootScope.usuario.estado){
                            return true;
                        } else {
                            is = false;
                        }
                    }
                }
            }

            return is;
        };

        $scope.delete = function (notification) {
            notificationAPI.delete(notification).then(function (data) {
                console.log(data);
                $scope.list();
            })
        };

        $scope.publicar = function (notification) {
            notificationAPI.publish(notification).then(function (data) {
                console.log(data);
                $scope.list();
            })
        };

        $scope.cancPublicar = function (notification) {
            notificationAPI.unpublish(notification).then(function (data) {
                console.log(data);
                $scope.list();
            })
        };

        $scope.like = function (id, email) {
            var notification = {
                '_id' : id,
                'email' : email
            };

            notificationAPI.like(notification).then(function (data) {
                console.log(data);
                //$location.path('/home');
                //$route.reload();
                $scope.list();
            })
        };

        $scope.islike = function (notification) {
            var is = false;
            for(var i=0; i<notification.curtidas.length; i++) {
               if(notification.curtidas[i].email === $rootScope.usuario.email){
                   return true;
               } else {
                   is = false;
               }
            }
            return is;
        };

        $scope.countlike = function (notification) {
            var cont = 0;
            for(var i=0; i<notification.curtidas.length; i++) {
                cont++;
            }
            return cont;
        };

        $scope.unlike = function (id, email) {
            var notification = {
                '_id' : id,
                'email' : email
            };
            notificationAPI.unlike(notification).then(function (data) {
                console.log(data);
                //$location.path('/home');
                //$route.reload();
                $scope.list();
            })
        };

        $scope.confirmNot = function (notification) {
            $scope.not = notification;
        };

        $scope.confirmRes = function (research) {
            $scope.not = research;
        };

        $scope.list();

    }
})();