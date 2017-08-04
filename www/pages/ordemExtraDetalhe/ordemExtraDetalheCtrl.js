angular.module('app.controllers')
  
.controller('ordemExtraDetalheCtrl', ['$scope', '$stateParams', '$http', '$rootScope', '$ionicPopup', '$location', 'controleError','$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $rootScope, $ionicPopup, $location, controleError,$state) {

console.log($stateParams.id);

    $scope.id = $stateParams.id;
   
    const token = localStorage.getItem('token');
    const id =  $scope.id;

        $http.get(`http://www.eatinhousedelivery.co.uk/api/pedidoextra/detalhe/pedido/${id}`)
        .success(function(response){
            console.log(response.data);                  
            $scope.ordem = response.data.id;
            $scope.qtd_produto = response.data.qtd;
            $scope.nome_produto = response.data.produto;
            // $scope.valor_frete = response.data.valorfrete;
            // $scope.status_restaurante = response.data.status_restaurante;
            

            

            $scope.cep = response.data.cep;
            $scope.complemento = response.data.complemento; 
            $scope.logradouro = response.data.logradouro; 
            $scope.numero = response.data.numero;                               
            
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
                $http.get(`http://www.eatinhousedelivery.co.uk/api/restaurantepedidos/update/id/status-restaurante/${id}/${statusAceita}`)
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