(function () {
    'use strict';

    angular.module('myApp').controller('usuariosController', usuariosController);

    usuariosController.$inject = ['usuarioAPI', '$scope', '$location', '$rootScope', '$filter','$route'];

    function usuariosController(usuarioAPI, $scope, $location, $rootScope, $filter, $route) {

        $scope.foto = {};
        $scope.usuarios = [];

        $scope.update = function (usuario) {
            console.log(usuario);
            usuarioAPI.update(usuario).then(function (data) {
                console.log(data);
                $scope.getUsuario();
                $location.path('/home');
               //$route.reload();
            })
        };

        $scope.submittedFile = {};
        $scope.foto = {};

        $scope.submit = function (usuario) {
            usuarioAPI.registerFoto(usuario).then(function (data) {
                $scope.getUsuario();
                $location.path('/home');
            })
        };

        $scope.getUsuario = function () {
            usuarioAPI.getUsuario().then(function (data) {
                $rootScope.usuario = data.data;
                sessionStorage.setItem('usuario', JSON.stringify(data.data));
            })
        };


        $scope.changePassword = function (senhaAtual, novaSenha) {
            usuarioAPI.changePassword(senhaAtual, novaSenha).then(function (data) {
                $scope.msg = {
                    'cod' : data.data.cod,
                    'msg' : data.data.msg
                };
                $scope.getUsuario();
            })
        };

        $scope.registrarVacina = function (vacinacao) {
            usuarioAPI.registerVacine(vacinacao).then(function (data) {
                console.log(data);
                $scope.getUsuario();
            })
        };

        $scope.setId = function(_id){
            $scope.vacinacao = {
                "paciente": _id
            }
        };

        $scope.setNomeVacina = function (vacina, _id) {
            $scope.vacinacao = {
                'paciente': _id,
                'vacina' : vacina.vacina,
                'dose' : vacina.dose
            };
        };

        $scope.setVacinaFam = function(vacina, f){
            $scope.vacinacao = {
                'paciente': f._id,
                'vacina' : vacina.vacina,
                'dose' : vacina.dose
            };
            $scope.famVacinado = f;
        };

        $scope.delete = function(id){
            usuarioAPI.delete(id).then(function (data) {
                $scope.msg = {
                    'cod': data.data.cod,
                    'msg': data.data.msg
                };
                if($rootScope.usuario._id === id) {
                    $scope.logout();
                }else {
                    $route.reload();
                }
            })
        };

        $scope.idade = function (nascimento) {

            var h = new Date();
            var dh = h.getDate();
            var mh = h.getMonth() + 1;
            var ah = h.getFullYear();

            var da = $filter('date')(nascimento, 'dd');
            var ma = $filter('date')(nascimento, 'MM');
            var aa = $filter('date')(nascimento, 'yyyy');

            var anos;
            var meses;
            var dias;

            if (ah >= aa) {
                anos = ah - aa;
            }

            if (mh > ma) {
                meses = mh - ma;
            } else if (mh < ma) {
                anos = anos - 1;
                meses = 12 - ma + mh;
            } else {
                meses = 0;
            }

            if (dh >= da) {
                dias = dh - da;
            } else {
                if(meses !== 0) {
                    meses = meses - 1;
                } else {
                    anos = anos - 1;
                    meses = 12 - ma + mh - 1;
                }
                if ((mh - 1) === 2) {
                    if ((ah % 4 === 0) && (ah % 100 !== 0) || (ah % 400 === 0)) {
                        dias = 29 - da + dh;
                    } else {
                        dias = 28 - da + dh;
                    }
                } else if ((mh - 1) === 4 || (mh - 1) === 6 || (mh - 1) === 9 || (mh - 1) === 11) {
                    dias = 30 - da + dh;
                } else {
                    dias = 31 - da + dh;
                }
            }

            return [anos, meses, dias];
        };

        $scope.exIdade = function (nascimento) {

            var vIdade = $scope.idade(nascimento);
            var ano;
            var mes;
            var dia;

            if (vIdade[0] === 1) {
                ano = vIdade[0] + ' ano, ';
            } else {
                ano = vIdade[0] + ' anos, ';
            }

            if (vIdade[1] === 1) {
                mes = vIdade[1] + ' mês, ';
            } else {
                mes = vIdade[1] + ' meses, ';
            }

            if (vIdade[2] === 1) {
                dia = vIdade[2] + ' dia.';
            } else {
                dia = vIdade[2] + ' dias.';
            }

            return ano + mes + dia;
        };

        $scope.list = function(){
            usuarioAPI.list().then(function (data) {
                $scope.usuarios = data.data;
            })
        };

        $scope.logout = function () {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('usuario');
            $location.path('/login');
        };

        $scope.reload = function () {
            $route.reload();
        };

        $scope.savepet = function (animal) {
            usuarioAPI.registerPet(animal).then(function (data) {
                $scope.getUsuario();
                //$location.path('/home');
                $scope.list();
                //$route.reload();
            })
        };

        $scope.updatepet = function (animal) {
            usuarioAPI.updatePet(animal).then(function (data) {
                $scope.getUsuario();
                //$location.path('/home');
                $scope.list();
                //$route.reload();
            })
        };

        $scope.deletepet = function (animal) {
            usuarioAPI.deletePet(animal).then(function (data) {
                $scope.getUsuario();
                //$location.path('/home');
                $scope.list();
                //$route.reload();
            })
        };

        $scope.confirmPet = function (animal) {
            $scope.ani = animal;
        };

        $scope.saveFamiliar = function (familiar) {
            usuarioAPI.registerFamiliar(familiar).then(function (data) {
                $scope.getUsuario();
                //$location.path('/home');
                $scope.list();
                //$route.reload();
            })
        };

        $scope.updateFamiliar = function (familiar) {
            usuarioAPI.updateFamiliar(familiar).then(function (data) {
                $scope.getUsuario();
                //$location.path('/home');
                $scope.list();
                //$route.reload();
            })
        };

        $scope.deleteFamiliar = function (familiar) {
            usuarioAPI.deleteFamiliar(familiar).then(function (data) {
                console.log(data);
                //$location.path('/home');
                $scope.list();
                //$route.reload();
            })
        };

        $scope.confirmFamiliar = function (familiar) {
            $scope.fam = familiar;
        };

        $scope.confirmUsu = function (usuario) {
            $scope.usu = usuario;
        };

        $scope.setVacina = function (vacina) {
            $scope.vac = vacina;
        };

        $scope.setRegVac = function(regVacina){
            $scope.v = regVacina;
        };

        $scope.setFamRegVac = function(fam, regVacina) {
            $scope.edFamVac = fam;
            $scope.va = regVacina;
        };

        $scope.updateRegistroVacina = function(regVacina){
            usuarioAPI.updateRegisterVacina(regVacina).then(function (data) {
                console.log(data);
                $scope.getUsuario();
                //$route.reload();
                $scope.list();
            })
        };

        $scope.deleteRegistroVacina = function(regVacina){
            usuarioAPI.deleteRegisterVacina(regVacina).then(function (data) {
                console.log(data);
                $scope.getUsuario();
                //$route.reload();
                $scope.list();
            })
        };

        $scope.registrarVacinaPet = function (vacinacao) {
            usuarioAPI.registerVacinePet(vacinacao).then(function (data) {
                console.log(data);
                $scope.getUsuario();
                //$location.path('/home');
                $scope.list();
                //$route.reload();
            })
        };

        $scope.updateRegistroVacinaPet = function(regVacina){
            usuarioAPI.updateRegisterVacinaPet(regVacina).then(function (data) {
                console.log(data);
                $scope.getUsuario();
                //$route.reload();
                $scope.list();
            })
        };

        $scope.deleteRegistroVacinaPet = function(regVacina){
            usuarioAPI.deleteRegisterVacinaPet(regVacina).then(function (data) {
                console.log(data);
                $scope.getUsuario();
                //$route.reload();
                $scope.list();
            })
        };

        $scope.recuperar = function(usuario){
            usuarioAPI.recuperar(usuario).then(function (data) {
                if(data.data.cod >= 355 && data.data.cod <= 358){
                    $scope.msg = {
                        'cod': data.data.cod,
                        'msg': data.data.msg
                    };
                }
            })
        };

        $scope.ativar = function(usuario){
            usuarioAPI.ativar(usuario).then(function (data) {
                if(data.data.cod >= 359 && data.data.cod <= 361){
                    $scope.msg = {
                        'cod': data.data.cod,
                        'msg': data.data.msg
                    };
                }
                $route.reload();
            })
        };

        $scope.desativar = function(usuario){
            usuarioAPI.desativar(usuario).then(function (data) {
                if(data.data.cod === 352 || data.data.cod === 353){
                    $scope.msg = {
                        'cod': data.data.cod,
                        'msg': data.data.msg
                    };
                } else if(data.data.cod === 354 && $rootScope.usuario === usuario){
                    $scope.logout();
                }
            })
        };

        $scope.setVacinaPet = function(pet){
            $scope.vacPet = {
                'pet': pet._id
            };
            $scope.pet = pet;
        };

        $scope.selFamiliar = function(familiar){
            sessionStorage.setItem('familiar', JSON.stringify(familiar));
            $location.path('/cartaoVacinaFamiliar');
        };

        $scope.selPet = function(pet){
            sessionStorage.setItem('pet', JSON.stringify(pet));
            $location.path('/cartaoVacinaPet');
        };

        $scope.mail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        $scope.re = /^[a-zA-Z0-9]\w{5,13}$/;

        $scope.list();
    }
})();