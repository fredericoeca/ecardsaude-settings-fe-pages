(function () {
    'use strict';
    angular.module('myApp',['ngRoute']).config(function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'view/home.html',
                controller: 'usuariosController',
                controllerAs: 'ctrl'
            })
            .when('/login', {
                templateUrl: 'view/login.html',
                controller: 'loginController',
                controllerAs: 'ctrl'
            })
            .when('/notification', {
                templateUrl: 'view/notifications.html',
                controller: 'notificationController',
                controllerAs: 'ctrl'
            })
            .when('/register', {
                templateUrl: 'view/register.html',
                controller: 'loginController',
                controllerAs: 'ctrl'
            })
            .when('/forbidden', {
                templateUrl: 'view/forbidden.html',
                controller: 'forbiddenController',
                controllerAs: 'ctrl'
            })
            .when('/vacinas', {
                templateUrl: 'view/vacinas.html',
                controller: 'vacinaController',
                controllerAs: 'ctrl'
            })
            .when('/registerFoto',{
                templateUrl: 'view/registerFoto.html',
                controller: 'usuariosController',
                controllerAs: 'ctrl'
            })
            .when('/usuario',{
                templateUrl: 'view/usuario.html',
                controller: 'usuariosController',
                controllerAs: 'ctrl'
            })
            .when('/usuarios',{
                templateUrl: 'view/usuarios.html',
                controller: 'usuariosController',
                controllerAs: 'ctrl'
            })
            .when('/cartaoVacina', {
                templateUrl: 'view/cartaoVacina.html',
                controller: 'vacinaController',
                controllerAs: 'ctrl'
            })
            .when('/cartaoVacinaFamiliar', {
                templateUrl: 'view/cartaoVacinaFamiliar.html',
                controller: 'vacinaController',
                controllerAs: 'ctrl'
            })
            .when('/viagens', {
                templateUrl: 'view/viagens.html',
                controller: 'viagensController',
                controllerAs: 'ctrl'
            })
            .when('/vacinaspet', {
                templateUrl: 'view/vacinas_pets.html',
                controller: 'vacinaPetController',
                controllerAs: 'ctrl'
            })
            .when('/viagenspets',{
                templateUrl: 'view/viagens_pets.html',
                controller: 'viagemPetController',
                controllerAs: 'ctrl'
            })
            .when('/cartaoVacinaPet', {
                templateUrl: 'view/cartaoVacinaPet.html',
                controller: 'usuariosController',
                controllerAs: 'ctrl'
            })
            .otherwise({redirectTo: '/login'});
    })
    .run(function ($rootScope, $location) {
        var blockGeneral = ['/home', '/notification','/registerFoto','/vacinas','/usuario','/usuarios', '/cartaoVacina',
            '/cartaoVacinaFamiliar','/viagens','/vacinaspet','/viagenspets','/cartaoVacinaPet'];
        var blockUser = ['/notification','/usuarios'];

        $rootScope.usuario = JSON.parse(sessionStorage.getItem('usuario'));

        $rootScope.$on('$locationChangeStart', function () {
            if(sessionStorage.getItem('usuario') === null && blockGeneral.indexOf($location.path()) !== -1){
                $location.path('/forbidden');
            } else if($rootScope.usuario !== null && blockUser.indexOf($location.path()) !== -1 && $rootScope.usuario.admin === false){
                $location.path('/forbidden');
            }
        })
    })
})();