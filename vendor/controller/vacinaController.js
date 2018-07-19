(function () {
    'use strict';

    angular.module('myApp').controller('vacinaController', vacinaController);

    vacinaController.$inject = ['vacinaAPI', '$scope','$rootScope', '$location', '$route', '$filter'];

    function vacinaController(vacinaAPI, $scope, $rootScope, $location, $route, $filter) {

        $scope.vacinas = [];
        $scope.vacinasCartao = [];
        $rootScope.familiar = JSON.parse(sessionStorage.getItem('familiar'));

        $scope.list = function () {
            vacinaAPI.list().then(function (data) {
                $scope.vacinas = data.data;
            })
        };

        $scope.save = function (vacina) {
            vacinaAPI.save(vacina).then(function (data) {
                console.log(data);
                $route.reload();
            })
        };

        $scope.update = function (vac) {
            vacinaAPI.update(vac).then(function (data) {
                console.log(data);
                $route.reload();
            })
        };

        $scope.delete = function (vac) {
            vacinaAPI.delete(vac._id).then(function (data) {
                console.log(data);
                $route.reload();
            })
        };

        $scope.alerta = function (idade, vacina, p) {

            var anoi = idade[0];
            var mesi = idade[1];
            var is = false;

            if(vacina.grupoAlvo !== 'Gestante') {
                if($scope.isRegistro(vacina, p) === false) {
                    if(anoi < vacina.idadeInicialAno){
                        is = false;
                    } else if(anoi === vacina.idadeInicialAno && mesi <= vacina.idadeInicialMes){
                        is = false;
                    } else {
                        if(vacina.vacina === 'HPV'){
                            return $scope.verificaGeneroHPV(vacina, p);
                        } else {
                            return true;
                        }
                    }
                }
            }

            return is;
        };

        $scope.verificaGeneroHPV = function(vacina, p){
            var is = false;
            if(vacina.dose.indexOf('Meninos') !== -1 && p.genero === "Masculino"){
                is = true;
            } else if(vacina.dose.indexOf('Meninas') !== -1 && p.genero === "Feminino"){
                is = true;
            } else {
                return false;
            }
            return is;
        };

        $scope.exIdade = function (vacina) {

            if(vacina.idadeInicialMes === 0 && vacina.idadeFinalMes === 0 && vacina.idadeInicialAno === 0 && vacina.idadeFinalAno === 0){
                return 'Ao nascer';
            } else if(vacina.idadeInicialAno === 0 && vacina.idadeFinalAno === 0 && vacina.idadeInicialMes !== vacina.idadeFinalMes){
                return vacina.idadeInicialMes + ' à ' + vacina.idadeFinalMes + ' meses';
            } else if(vacina.idadeInicialAno === 0 && vacina.idadeFinalAno === 0 && vacina.idadeInicialMes === vacina.idadeFinalMes){
                if(vacina.idadeInicialMes === 1) {
                    return vacina.idadeInicialMes + ' mês';
                } else {
                    return vacina.idadeInicialMes + ' meses';
                }
            } else if(vacina.idadeInicialAno === 0 && vacina.idadeFinalAno !== 0 && vacina.idadeFinalMes === 0) {
                return vacina.idadeInicialMes + ' meses à ' + vacina.idadeFinalAno + ' anos';
            } else {

                if (vacina.idadeInicialAno !== vacina.idadeFinalAno) {
                    if (vacina.idadeInicialMes === 0 && vacina.idadeFinalMes === 0) {
                        return exAno(vacina.idadeInicialAno) + ' à ' + exAno(vacina.idadeFinalAno);
                    } else if(vacina.idadeInicialMes === 0 && vacina.idadeFinalMes !== 0){
                        return exAno(vacina.idadeInicialAno) + ' à ' + exAno(vacina.idadeFinalAno) + ' e ' + exMes(vacina.idadeFinalMes);
                    } else if(vacina.idadeInicialMes !== 0 && vacina.idadeFinalMes === 0){
                        return exAno(vacina.idadeInicialAno) +  ' e ' + exMes(vacina.idadeInicialMes) +  ' à ' + exAno(vacina.idadeFinalAno);
                    } else {
                        return exAno(vacina.idadeInicialAno) +  ' e ' + exMes(vacina.idadeInicialMes) +  ' à ' + exAno(vacina.idadeFinalAno) + ' e ' + exMes(vacina.idadeFinalMes);
                    }
                } else {
                    if (vacina.idadeFinalMes === 0) {
                        return exAno(vacina.idadeInicialAno);
                    } else if (vacina.idadeInicialMes === 0 && vacina.idadeFinalMes !== 0) {
                        return exAno(vacina.idadeInicialAno) + ' à ' + exAno(vacina.idadeFinalAno) + ' e ' + exMes(vacina.idadeFinalMes);
                    } else if (vacina.idadeInicialMes !== 0 && vacina.idadeFinalMes === 0) {
                        return exAno(vacina.idadeInicialAno) + ' e ' + exMes(vacina.idadeInicialMes) + ' à ' + exAno(vacina.idadeFinalAno);
                    } else if(vacina.idadeInicialMes === vacina.idadeFinalMes && vacina.idadeInicialMes !== 0){
                        return exAno(vacina.idadeInicialAno) + ' e ' + exMes(vacina.idadeInicialMes);
                    } else {
                        return exAno(vacina.idadeInicialAno) +  ' e ' + exMes(vacina.idadeInicialMes) +  ' à ' + exAno(vacina.idadeFinalAno) + ' e ' + exMes(vacina.idadeFinalMes);
                    }
                }
            }
        };

         function exAno(ano) {
            if(ano === 1){
                return ano + ' ano';
            } else {
                return ano + ' anos';
            }
        }

        function exMes(mes) {
            if(mes === 1){
                return mes + ' mes';
            } else {
                return mes + ' meses';
            }
        }

        $scope.confirmVac = function (vacina) {
            $scope.vac = vacina;
        };

         $scope.regVacina = function(vacina){

            $scope.registroVacinacao = {};

             for(var i=0; i<$rootScope.usuario.registro_vacinas.length; i++){

                 if(vacina.vacina === $rootScope.usuario.registro_vacinas[i].vacina){
                     $scope.registroVacinacao = {
                         'data' : $rootScope.usuario.registro_vacinas[i].data,
                         'local' : $rootScope.usuario.registro_vacinas[i].local,
                         'agente' : $rootScope.usuario.registro_vacinas[i].agente,
                         'rede' : $rootScope.usuario.registro_vacinas[i].rede
                     };
                 }
             }
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
                meses = meses - 1;
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

        $scope.isRegistro = function(vacina, p){

            var is = false;

            for(var i=0; i < $rootScope.usuario.registro_vacinas.length; i++){

                if(p._id === $rootScope.usuario.registro_vacinas[i].paciente) {
                    if (vacina.vacina ===  $rootScope.usuario.registro_vacinas[i].vacina && vacina.dose ===  $rootScope.usuario.registro_vacinas[i].dose) {
                        return true;
                    } else {
                        is = false;
                    }
                }
            }
            return is;
        };

        $scope.emDia = function(vacina, p) {

            var is = false;
            var age = $scope.idade(p.nascimento);

            if(age[0] > vacina.idadeFinalAno){
                is = false;
            } else if(age[0] === vacina.idadeFinalAno && age[1] > vacina.idadeFinalMes){
                is = false;
            }  else {
                return true;
            }

            return is;
        };

        $scope.list();
    }
})();