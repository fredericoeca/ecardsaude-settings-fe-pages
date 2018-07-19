(function () {
    'use strict';
    angular.module('myApp').factory('notificationAPI', notificationAPI);

    notificationAPI.$inject = ['$http'];

    function notificationAPI($http) {

        var _list = function () {
            return $http.get('http://localhost:3000/notifications/');
        };

        var _register = function (notification) {
            return $http.post('http://localhost:3000/notifications/register', notification);
        };

        var _editar = function (notification) {
            return $http.put('http://localhost:3000/notifications/edit/' + notification._id, notification);
        };

        var _delete = function (notification) {
            return $http.delete('http://localhost:3000/notifications/delete/' + notification._id);
        };

        var _publish = function (notification) {
            return $http.put('http://localhost:3000/notifications/publish/' + notification._id);
        };

        var _unpublish = function (notification) {
            return $http.put('http://localhost:3000/notifications/unpublish/' + notification._id);
        };

        var _like = function (notification) {
            return $http.post('http://localhost:3000/notifications/curtidas/like', notification);
        };

        var _unlike = function (notification) {
            return $http.post('http://localhost:3000/notifications/curtidas/unlike', notification);
        };

        return {
            list: _list,
            register: _register,
            editar: _editar,
            delete: _delete,
            publish: _publish,
            unpublish: _unpublish,
            like : _like,
            unlike: _unlike
        }
    }
})();