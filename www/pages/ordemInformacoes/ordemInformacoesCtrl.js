angular.module('app.controllers')
  
.controller('ordemInformacoesCtrl', ['$scope', '$stateParams', '$http', '$rootScope', '$ionicPopup', '$location', 'controleError','$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $rootScope, $ionicPopup, $location, controleError,$state) {

console.log($stateParams.id);

    $scope.id = $stateParams.id;    

    const token = localStorage.getItem('token');
    const id =  $scope.id;

        $http.get(`http://www.eatinhousedelivery.co.uk/api/restaurantepedidos/search/detalhe/pedido/${id}`)
        .success(function(response){
            console.log(response);                  
            $scope.meusPedidosDetalhe = response; 

            $scope.nome = response.data.informacoes_cliente.nome;
            $scope.email = response.data.informacoes_cliente.email;   
            $scope.telefone = response.data.informacoes_cliente.telefone;               

            $scope.cep = response.data.endereco.cep;
            $scope.complemento = response.data.endereco.complemento; 
            $scope.logradouro = response.data.endereco.logradouro; 
            $scope.numero = response.data.endereco.numero;

            if(response.data.entregador == 'The order was not accepted'){
                $scope.entregador = 0;
                $scope.mensagem = 'The order was not accepted';
            }
            else{
                $scope.entregador = 1;
                $scope.nome_entreagdor =  response.data.entregador.nome;
                $scope.telefone_entreagdor =  response.data.entregador.telefone;
            }

                                   
            
        })

        $scope.ordemCancelada = function(){
            var msgPopup = "Order canceled";
            alteraStatus(4,$scope.id,msgPopup)
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