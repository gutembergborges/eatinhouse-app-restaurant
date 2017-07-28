angular.module('app.controllers')
  
.controller('ordemListaCtrl', ['$scope', '$stateParams', '$http', '$rootScope', '$ionicPopup', '$location', 'controleError', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $rootScope, $ionicPopup, $location, controleError) {


    $http.get(`http://www.eatinhousedelivery.co.uk/api/restaurantepedidos/search/list/`)
        .success(function(response){
            console.log(response);
            $scope.listaDePedidos = response;                  
            // $scope.meusPedidosDetalhe = response;
            // $scope.valor_total = response.data.valortotal;
            // $scope.valor_frete = response.data.valorfrete;
            // $scope.ordem = response.data.ordem;

            

            // $scope.cep = response.data.endereco.cep;
            // $scope.complemento = response.data.endereco.complemento; 
            // $scope.logradouro = response.data.endereco.logradouro; 
            // $scope.numero = response.data.endereco.numero;                               
            
        })

     $scope.showConfirm = function() {            

            var myPopup = $ionicPopup.show({
                template: '',
                cssClass: 'my-custom-popup',
                title: 'Order Status',
                scope: $scope,
                buttons: [
                {
                    text: 'Aceito',
                    type: `${$scope.reuniao_button}`,
                    onTap: function(e) {
                      

                        
                        // return null;
                        
                        return null;
                    }
                }
                ,
                {
                    text: `Preparação`,
                    type: `${$scope.cadastro_button}`,
                    onTap: function(e) {
                        
                  


                       return null;
                   }
               },
               {
                    text: `Pronto`,
                    type: `${$scope.reuniao_cancelada_button}`,
                    onTap: function(e) {                        
                        

                       
                        return $scope.data.myData;
                    }
                },
                {
                    text: '<i class="icon ion-close-circled"></i>',
                    type:'popclose',
                    onTap: function(e) {
                        return $scope.data.myData;
                    }
                }
            ]
        });

        

    };
    

}])