(function () {
    'use strict';

    angular.module('myApp').factory('vacinaPetAPI', vacinaPetAPI);

    vacinaPetAPI.$inject = ['$http'];

    function vacinaPetAPI($http) {

        var _list = function () {
            return $http.get('http://localhost:3000/vacinaspet/list');
        };

        var _save = function (vacina) {

            console.log(vacina);
            return $http.post('http://localhost:3000/vacinaspet/register', vacina);
        };

        var _get = function (id) {
            return $http.get('http://localhost:3000/vacinaspet/vacina/' + id);
        };

        var _update = function (vacina) {
            return $http.put('http://localhost:3000/vacinaspet/update/' + vacina._id, vacina);
        };

        var _delete = function (id) {
            return $http.delete('http://localhost:3000/vacinaspet/delete/' + id);
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