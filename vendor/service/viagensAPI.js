(function () {
    'use strict';

    angular.module('myApp').factory('viagensAPI', viagensAPI);

    viagensAPI.$inject = ['$http'];

    function viagensAPI($http) {

        var _list = function () {
            return $http.get('http://localhost:3000/viagens/list');
        };

        var _save = function (info) {
            return $http.post('http://localhost:3000/viagens/register', info);
        };

        var _get = function (id) {
            return $http.get('http://localhost:3000/viagens/infoviagem/' + id);
        };

        var _update = function (info) {
            return $http.put('http://localhost:3000/viagens/update/' + info._id, info);
        };

        var _delete = function (id) {
            return $http.delete('http://localhost:3000/viagens/delete/' + id);
        };

        var _registerCuidado = function (_id, cuidado) {
            return $http.post('http://localhost:3000/viagens/register/cuidados', {
                '_id': _id,
                'cuidado': cuidado
            });
        };

        var _updateCuidado = function (_id, cuidado) {
            return $http.post('http://localhost:3000/viagens/update/cuidados', {
                '_id': _id,
                '_id_cuidado': cuidado._id,
                'cuidado': cuidado.cuidado
            });
        };

        var _deleteCuidado = function (_id, cuidado) {
            return $http.post('http://localhost:3000/viagens/delete/cuidados', {
                '_id': _id,
                '_id_cuidado': cuidado._id
            });
        };

        var _registerLocalizacao = function (_id, localizacao) {
            return $http.post('http://localhost:3000/viagens/register/localizacao', {
                '_id': _id,
                'tipo': localizacao.tipo,
                'local': localizacao.local
            });
        };

        var _updateLocalizacao = function (_id, localizacao) {
            return $http.post('http://localhost:3000/viagens/update/localizacao', {
                '_id': _id,
                '_id_local': localizacao._id,
                'tipo': localizacao.tipo,
                'local': localizacao.local
            });
        };

        var _deleteLocalizacao = function (_id, localizacao) {
            return $http.post('http://localhost:3000/viagens/delete/localizacao', {
                '_id': _id,
                '_id_local': localizacao._id
            });
        };

        return {
            list: _list,
            save: _save,
            get: _get,
            update: _update,
            delete: _delete,
            registerCuidado: _registerCuidado,
            updateCuidado: _updateCuidado,
            deleteCuidado: _deleteCuidado,
            registerLocalizacao: _registerLocalizacao,
            updateLocalizacao: _updateLocalizacao,
            deleteLocalizacao: _deleteLocalizacao
        }
    }
})();