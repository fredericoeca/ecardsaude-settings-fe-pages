(function () {
    'use strict';

    angular.module('myApp').factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$rootScope', '$q'];

    function authInterceptor($rootScope, $q) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if(sessionStorage.token){
                    config.headers.authorization = sessionStorage.token;
                }
                return config;
            },
            response: function (response) {
                if(response.status === 403){
                    console.log('Proibido');
                }
                return response;
            }
        }
    }

})();