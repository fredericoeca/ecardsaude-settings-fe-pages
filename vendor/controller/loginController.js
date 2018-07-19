(function () {
    'use strict';

    angular.module('myApp').controller('loginController', loginController);

    loginController.$inject = ['loginAPI', '$scope', '$location', '$rootScope','$route'];

    function loginController(loginAPI, $scope, $location, $rootScope, $route) {

        $rootScope.usuario = JSON.parse(sessionStorage.getItem('usuario'));

        $scope.save = function (usuario) {
            var usu = {
                'nome': usuario.nome,
                'email': usuario.email,
                'nascimento': usuario.nascimento,
                'tipo_sanguineo': usuario.tipo_sanguineo,
                'genero': usuario.genero,
                'estado': usuario.estado.sigla_uf,
                'cidade': usuario.cidade.nome_municipio,
                'senha': usuario.senha
            };

            loginAPI.register(usu).then(function (data) {
                if(data.data.cod >= 301 && data.data.cod <= 303){
                    $scope.msg = {
                        'cod': data.data.cod,
                        'msg': data.data.msg,
                        'err': data.data.err
                    };
                } else if(data.data.cod === 304){
                    $scope.msg = {
                        'cod': data.data.cod,
                        'msg': data.data.msg
                    };
                }
            })
        };

        $scope.getUsuario = function () {
            loginAPI.getUsuario().then(function (data) {
                $rootScope.usuario = data.data;
                sessionStorage.setItem('usuario', JSON.stringify(data.data));
            })
        };

        $scope.login = function (usuario) {
            loginAPI.login(usuario).then(function (data) {
                if (data.data.cod >= 308 && data.data.cod <= 312) {
                    $scope.msg = {
                        'cod': data.data.cod,
                        'msg': data.data.msg
                    }
                } else {
                    sessionStorage.setItem('token', data.data.token);
                    sessionStorage.setItem('usuario', JSON.stringify(data.data));
                    $scope.getUsuario();
                    $location.path('/home');
                }
            })
        };

        $scope.ativar = function(usuario){
            loginAPI.ativar(usuario).then(function (data) {
                if(data.data.cod >= 359 && data.data.cod <= 361){
                    $scope.msg = {
                        'cod': data.data.cod,
                        'msg': data.data.msg
                    };
                }
                if(data.data.cod === 361){
                    $scope.login(usuario);
                }
            })
        };

        $scope.recuperar = function(usuario){
            loginAPI.recuperar(usuario).then(function (data) {
                if(data.data.cod >= 355 && data.data.cod <= 358){
                    $scope.msg = {
                        'cod': data.data.cod,
                        'msg': data.data.msg
                    };
                }
            })
        };

        $scope.reload = function () {
            $route.reload();
        };

        $scope.logout = function () {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('usuario');
            $location.path('/login');
        };

        $scope.mail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        $scope.re = /^[a-zA-Z0-9]\w{5,13}$/;
    }
})();