(function () {
    'use strict';
    angular.module('myApp').factory('municipiosAPI', municipiosAPI);

    municipiosAPI.$inject = ['$http'];

    function municipiosAPI($http) {

        var _list = function () {
            return $http.get('http://localhost:3000/municipios/');
        };

        return{
            list: _list
        }
    }
})();