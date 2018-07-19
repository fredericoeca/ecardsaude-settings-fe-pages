(function () {
    'use strict';

    angular.module('myApp').directive('dateFormat', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attr, ngModelCtrl) {
                //Angular 1.3 insert a formater that force to set model to date object, otherwise throw exception.
                //Reset default angular formatters/parsers
                ngModelCtrl.$formatters.length = 0;
                ngModelCtrl.$parsers.length = 0;
            }
        };
    });
})();