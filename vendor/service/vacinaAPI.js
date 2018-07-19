(function () {
    'use strict';

    angular.module('myApp').factory('vacinaAPI', vacinaAPI);

    vacinaAPI.$inject = ['$http'];

    function vacinaAPI($http) {

        var _list = function () {
            return $http.get('http://localhost:3000/vacinas/list');
        };

        var _save = function (vacina) {

            console.log(vacina);
            return $http.post('http://localhost:3000/vacinas/register', vacina);
        };

        var _get = function (id) {
            return $http.get('http://localhost:3000/vacinas/vacina/' + id);
        };

        var _update = function (vacina) {
            return $http.put('http://localhost:3000/vacinas/update/' + vacina._id, vacina);
        };

        var _delete = function (id) {
            return $http.delete('http://localhost:3000/vacinas/delete/' + id);
        };

        return {
            list: _list,
            save: _save,
            get: _get,
            update: _update,
            delete: _delete
        }

    }

})();