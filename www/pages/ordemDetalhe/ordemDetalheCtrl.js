angular.module('app.controllers')
  
.controller('ordemDetalheCtrl', ['$scope', '$stateParams', '$http', '$rootScope', '$ionicPopup', '$location', 'controleError','$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $rootScope, $ionicPopup, $location, controleError,$state) {

console.log($stateParams.id);

    $scope.id = $stateParams.id;
    $scope.venda_total = 0;
    $scope.valor_frete = 0;

    const token = localStorage.getItem('token');
    const id =  $scope.id;

        $http.get('https://www.eatinhouse.com/api/restaurantepedidos/search/detalhe/pedido/'+id)
        .success(function(response){
            console.log(response);                  
            $scope.meusPedidosDetalhe = response;
            $scope.valor_total = response.data.valortotal;
            $scope.valor_frete = response.data.valorfrete;
            $scope.status_restaurante = response.data.status_restaurante;
            $scope.ordem = response.data.ordem;

            

            $scope.cep = response.data.endereco.cep;
            $scope.complemento = response.data.endereco.complemento; 
            $scope.logradouro = response.data.endereco.logradouro; 
            $scope.numero = response.data.endereco.numero;                               
            
        })

        $scope.ordemAceita = function(){            
            var msgPopup = "Order accepted";
            alteraStatus(1,$scope.id,msgPopup)
        }

        $scope.chamaEntregador = function(){
            var msgPopup = "Driver on way";
            alteraStatus(2,$scope.id,msgPopup)
        }

        function alteraStatus(status,id,msg){
            const statusAceita = status;
                $http.get('https://www.eatinhouse.com/api/restaurantepedidos/update/id/status-restaurante/'+id+'/'+statusAceita)
                .success(function(response){
                    console.log(response);                    
                }).then(function successCallback(response) {
            var alertPopup = $ionicPopup.alert({
              title: 'Success',
              template: msg
            })

            $state.go('menu.ordemLista');
            });
        }



    

}])