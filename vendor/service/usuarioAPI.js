(function () {
    'use strict';

    angular.module('myApp').factory('usuarioAPI', usuarioAPI);

    usuarioAPI.$inject = ['$http'];
    
    function usuarioAPI($http) {

        var _update = function (usuario) {
                return $http.put('http://localhost:3000/usuarios/update/' + usuario._id, usuario);
        };

        var _list = function () {
            return $http.get('http://localhost:3000/usuarios/list');
        };

        var _changePassword = function (senhaAtual, novaSenha) {
            return $http.post('http://localhost:3000/usuarios/update/senha', {
                'senhaAtual': senhaAtual,
                'novaSenha' : novaSenha
            })
        };

        var _delete = function (id) {
            return $http.delete('http://localhost:3000/usuarios/delete/' + id);
        };

        var _registerFoto = function (usuario) {
            return $http.post('http://localhost:3000/usuarios/register/foto', usuario);
        };

        var _getUsuario = function () {
            return $http.get('http://localhost:3000/usuarios/usuario');
        };

        var _registerVacine = function (vacinacao) {
                return $http.post('http://localhost:3000/usuarios/register/reg_vacina', vacinacao);
        };

        var _updateRegisterVacine = function (regVacina) {
            return $http.post('http://localhost:3000/usuarios/update/reg_vacina', regVacina);
        };

        var _deleteRegisterVacine = function (regVacina) {
            return $http.post('http://localhost:3000/usuarios/delete/reg_vacina', regVacina);
        };

        var _registerPet = function (animal) {
            return $http.post('http://localhost:3000/usuarios/register/pet', animal);
        };

        var _updatePet = function (animal) {
            return $http.post('http://localhost:3000/usuarios/update/pet', animal);
        };

        var _deletePet = function (animal) {
            return $http.post('http://localhost:3000/usuarios/delete/pet', animal);
        };

        var _registerVacinePet = function (vacinacao) {

            return $http.post('http://localhost:3000/usuarios/pet/reg_vacina', vacinacao);
        };

        var _updateRegisterVacinePet = function (regVacina) {
            return $http.post('http://localhost:3000/usuarios/pet/upd_vacina', regVacina);
        };

        var _deleteRegisterVacinePet = function (regVacina) {
            return $http.post('http://localhost:3000/usuarios/pet/del_vacina', regVacina);
        };

        var _registerFamiliar = function (familiar) {
            return $http.post('http://localhost:3000/usuarios/register/familiar', familiar);
        };

        var _updateFamiliar = function (familiar) {
            return $http.post('http://localhost:3000/usuarios/update/familiar', familiar);
        };

        var _deleteFamiliar = function (familiar) {
            return $http.post('http://localhost:3000/usuarios/delete/familiar', familiar);
        };

        var _recuperar = function (usuario) {
            return $http.post('http://localhost:3000/usuarios/recuperar', usuario);
        };

        var _ativar = function (usuario) {
            return $http.post('http://localhost:3000/usuarios/ativar', usuario);
        };

        var _desativar = function (usuario) {
            return $http.post('http://localhost:3000/usuarios/desativar', usuario);
        };

        return {
            update: _update,
            list: _list,
            changePassword: _changePassword,
            registerFoto: _registerFoto,
            delete: _delete,
            getUsuario: _getUsuario,
            registerVacine: _registerVacine,
            updateRegisterVacina: _updateRegisterVacine,
            deleteRegisterVacina: _deleteRegisterVacine,
            registerPet: _registerPet,
            updatePet: _updatePet,
            deletePet: _deletePet,
            registerVacinePet: _registerVacinePet,
            updateRegisterVacinaPet: _updateRegisterVacinePet,
            deleteRegisterVacinaPet: _deleteRegisterVacinePet,
            registerFamiliar: _registerFamiliar,
            updateFamiliar: _updateFamiliar,
            deleteFamiliar: _deleteFamiliar,
            recuperar: _recuperar,
            ativar: _ativar,
            desativar: _desativar
        }
    }
})();