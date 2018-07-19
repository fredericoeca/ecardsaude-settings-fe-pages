(function () {
    'use strict';
    angular.module('myApp').factory('loginAPI', loginAPI);

    loginAPI.$inject = ['$http'];

    function loginAPI($http) {

        var _login = function (usuario) {
            return $http.post('http://localhost:3000/usuarios/login', usuario);
        };

        var _register = function (usuario) {
            return $http.post('http://localhost:3000/usuarios/register', usuario);
        };

        var _getUsuario = function () {
            return $http.get('http://localhost:3000/usuarios/usuario');
        };

        var _recuperar = function (usuario) {
            return $http.post('http://localhost:3000/usuarios/recuperar', usuario);
        };

        var _ativar = function (usuario) {
            return $http.post('http://localhost:3000/usuarios/ativar', usuario);
        };

        return {
            login: _login,
            register: _register,
            getUsuario: _getUsuario,
            recuperar: _recuperar,
            ativar: _ativar
        }
    }
})();