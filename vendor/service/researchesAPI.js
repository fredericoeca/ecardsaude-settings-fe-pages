(function () {
    'use strict';
    angular.module('myApp').factory('researchesAPI', researchesAPI);

    researchesAPI.$inject = ['$http'];

    function researchesAPI($http) {

        var _list = function () {
            return $http.get('http://localhost:3000/researches/');
        };

        var _delete = function (news) {
            return $http.put('http://localhost:3000/researches/delete/' + news._id, news);
        };

        var _refresh = function () {
            return $http.get('http://localhost:3000/researches/refresh');
        };

        var _nResearchNew = function () {
            return $http.get('http://localhost:3000/researches/searchnew');
        };

        return{
            list: _list,
            delete: _delete,
            refresh: _refresh,
            nResearchNew: _nResearchNew
        }
    }
})();