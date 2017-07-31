angular.module('app.controllers', [])
  
// .controller('loginCtrl', ['$scope', '$stateParams', '$http', '$rootScope', '$ionicPopup', '$location', 'controleError', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
// function ($scope, $stateParams, $http, $rootScope, $ionicPopup, $location, controleError) {
//     if($rootScope.entregador_id&&$rootScope.entregador_id!=''){
//         $location.path('/menu/aguardando');
//     }
//     $scope.acessoLogin = function(usuario, senha){
//         $http({
//             method: 'GET',
//             url: 'https://www.eatinhousedelivery.co.uk/api-driver/?acao=login-entregador&email='+usuario+'&senha='+senha
//         }).then(function successCallback(response) {
//             // this callback will be called asynchronously
//             // when the response is available
//             if(controleError.checkError(response)){
//                 $rootScope.entregador_id = response.data.id;
//                 $rootScope.nome_entregador = response.data.nome;
                
//                 $location.path('/menu/aguardando');
//             }
//           }, function errorCallback(response) {
//             // called asynchronously if an error occurs
//             // or server returns response with an error status.
//           });
//     }

// }])
   
.controller('entregarParaOClienteCtrl', ['$scope', '$stateParams', 'controleError', '$http', '$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, controleError, $http, $location) {

    // $stateParams.venda_id = 233;
    
    $http({
        method: 'GET',
        url: 'https://www.eatinhousedelivery.co.uk/api-driver/?acao=pedido-completo&id='+$stateParams.venda_id
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        if(controleError.checkError(response)){
           console.log(response);
           $scope.data = response.data;
        }else{
            $location.path('/menu/aguardando');
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
      
    $scope.realizarEntrega = function(){
        $http({
            method: 'GET',
            url: 'https://www.eatinhousedelivery.co.uk/api-driver/?acao=atualizar-status-pedido&id='+$stateParams.venda_id+'&status=2'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            if(controleError.checkError(response)){
               $location.path('/entregar-ordem/'+$stateParams.venda_id);
            }
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
    }
    
    
    $scope.cancelarOrdem = function(){
        $http({
            method: 'GET',
            url: 'https://www.eatinhousedelivery.co.uk/api-driver/?acao=atualizar-status-pedido&id='+$stateParams.venda_id+'&status=4'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            if(controleError.checkError(response)){
               $location.path('/menu/aguardando');
            }
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
    }

}])
   
.controller('novaOrdemCtrl', ['$scope', '$http', '$stateParams', '$location', 'controleError', 'uiGmapGoogleMapApi', 'uiGmapIsReady', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, $location, controleError, uiGmapGoogleMapApi, uiGmapIsReady) {
    
    // $scope.venda_id = $stateParams.venda_id;
    // $scope.venda_id = 254;
    
    // ID da venda
    // $stateParams.venda_id
    $http({
        method: 'GET',
        url: 'https://www.eatinhousedelivery.co.uk/api-driver/?acao=pedido-completo&id='+$scope.venda_id
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        if(controleError.checkError(response)){
            
            $scope.data = response.data;
           
            // uiGmapGoogleMapApi is a promise.
            // The "then" callback function provides the google.maps object.
            uiGmapGoogleMapApi.then(function(maps){
                // Configuration needed to display the road-map with traffic
                // Displaying Ile-de-france (Paris neighbourhood)
                
                $scope.map = {
                    center: {
                      latitude: response.data.Empresa.lat,
                      longitude: response.data.Empresa.lng
                    },
                    zoom: 13,
                    options: {
                        mapTypeId: google.maps.MapTypeId.ROADMAP, 
                        streetViewControl: false,
                        mapTypeControl: false,
                        scaleControl: false,
                        rotateControl: false,
                        zoomControl: false
                    }, 
                    showTraficLayer:true
                };
                
            });
            uiGmapIsReady.promise(1).then(function(instances) {
                instances.forEach(function(inst) {
                    var map = inst.map;
                    var uuid = map.uiGmap_id;
                    var mapInstanceNumber = inst.instance; // Starts at 1.

                    var directionsService = new google.maps.DirectionsService();
                    var directionsDisplay = new google.maps.DirectionsRenderer();
                    
                    var request = {
                        origin: response.data.Empresa.lat+", "+response.data.Empresa.lng,
                        destination: response.data.lat+", "+response.data.lng,
                        travelMode: google.maps.TravelMode['DRIVING'],
                        optimizeWaypoints: true
                    };
                    
                    directionsService.route(request, function (response, status) {
                        if (status === google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setMap(null);
                            directionsDisplay.setMap(map);
                            directionsDisplay.setDirections(response);
    
                        } else {
                            console.log('Directions request failed due to ' + status);
                        }
                    });
                    
                    // directionsDisplay.setMap(map);
                    
                });
            });
            
        }else{
            $location.path('/aguardando');
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
      
      // Play audio
    //
    $scope.played = 0;
    var my_media;
        
    // // Play the audio file at url
    // my_media = new Media('http://www.eatinhousedelivery.com/audio/song.mp3',
    //     // success callback
    //     function () {
    //         console.log("playAudio():Audio Success");
    //     },
    //     // error callback
    //     function (err) {
    //         console.log("playAudio():Audio Error: " + err);
    //     },
    //     // loop callback
    //     function (status) {
    //         // if(status === Media.MEDIA_STOPPED) {
    //         //     my_media.seekTo(0);
    //         //     if($scope.played < 1)
    //         //       my_media.play();

    //         //     $scope.played++;
    //         // }
    //     }
    // );

    // // Play audio
    // my_media.play({ numberOfLoops: 1 });

    // my_media.status.subscribe((status) => {
    //   if(status === Media.MEDIA_STOPPED) my_media.play();
    // });
    
      
    $scope.aceitarEntrega = function(){
        $http({
            method: 'GET',
            url: 'https://www.eatinhousedelivery.co.uk/api-driver/?acao=atualizar-status-pedido&id='+$stateParams.venda_id+'&status=1'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            if(controleError.checkError(response)){
               $location.path('/coletar-ordem/'+$stateParams.venda_id);
               $scope.played = 100;
               my_media.stop();
            }
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
    }
    $scope.cancelarOrdem = function(){
        $http({
            method: 'GET',
            url: 'https://www.eatinhousedelivery.co.uk/api-driver/?acao=atualizar-status-pedido&id='+$stateParams.venda_id+'&status=4'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            if(controleError.checkError(response)){
               $location.path('/coletar-ordem/'+$stateParams.venda_id);
               $scope.played = 100;
               my_media.stop();
            }
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
    }
}])
   
.controller('aguardandoCtrl', ['$scope', '$stateParams', '$http', '$rootScope', '$ionicPopup', '$location', 'sideMenuService', 'controleError', 'loginService', '$cordovaGeolocation', '$cordovaMedia', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $rootScope, $ionicPopup, $location, sideMenuService, controleError, loginService, $cordovaGeolocation, $cordovaMedia) {
    
    // $rootScope.online = $rootScope.online&&$rootScope.online!=''?$rootScope.online:0;
    
    $scope.lat = "-19.9178164";
    $scope.lng = "-44.1003978";
    
    // if(loginService.checkLogin()){
    //     $location.path('/login');
    // }

    var options = {timeout: 10000, enableHighAccuracy: true};
     
    $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
        $scope.lat = position.coords.latitude;
        $scope.lng = position.coords.longitude;
        console.log(position);
      }, function(error){
        console.log("Could not get location. Error:");
        console.log(error);
    });

    $scope.openSideMenu = function(){
        // sideMenuService.openSideMenu();
    };
    $scope.changeOnline = function(){
        if($rootScope.online===0){
            $rootScope.online = 1;
        }else{
            $rootScope.online = 0;
        }
        console.log($rootScope.online);
    };
    $scope.online = $rootScope.online;
    $scope.ultima_atualizacao = "...";
    
    $scope.checkPedido = function(){
        if($rootScope.online==1){
            $http({
                method: 'GET',
                url: 'https://www.eatinhousedelivery.co.uk/api-driver/?acao=pedido-pendente&entregador_id='+$rootScope.entregador_id
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                if(controleError.checkError(response)){
                    
                    var data = new Date();          
                    var hora = data.getHours();
                    hora = hora<10?"0"+hora:hora;   
                    var minuto = data.getMinutes();
                    minuto = minuto<10?"0"+minuto:minuto;
                    $scope.ultima_atualizacao = hora+":"+minuto;
                    
                    if(response.data.venda_id&&response.data.venda_id!=''&&response.data.venda_id!=undefined){
                        $rootScope.venda_id = response.data.venda_id;
                        $location.path('/nova-ordem/'+response.data.venda_id);
                    }else{
                        setTimeout(function(){ $scope.checkPedido(); }, 5000);
                    }
                }
              }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
        }else{
            setTimeout(function(){ $scope.checkPedido(); }, 5000);
        }
    }
    
    $scope.checkPedido();

}])
   
.controller('menuCtrl', ['$scope', '$stateParams', '$rootScope', '$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $location) {
    
    $scope.nome_entregador = localStorage.getItem('nome');

    $scope.logout = function(){
        $rootScope.entregador_id = null;
        $location.path('/login')
    }
}])
   
.controller('retirarOrdemCtrl', ['$scope', '$stateParams', '$http', 'controleError', '$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, controleError, $location) {
    
    // ID da venda
    // $stateParams.venda_id = 233;
    
    $scope.checkItems = { };
    
    $scope.print = function() {
        console.log($scope.checkItems);
    }
    
    $scope.save = function() {
        var array = [];
        for(i in $scope.checkItems) {
            if($scope.checkItems[i] == true) {
                array.push(i);
            }
        }
        return array;
    }
    
    $http({
        method: 'GET',
        url: 'https://www.eatinhousedelivery.co.uk/api-driver/?acao=pedido-completo&id='+$stateParams.venda_id
    }).then(function successCallback(response) {
        if(controleError.checkError(response)){
           console.log(response);
           $scope.data = response.data;
        }else{
            $location.path('/menu/aguardando');
        }
      });
      
    $scope.coletarOrdem = function(){
        var retorno = $scope.save();
        
        $http({
            method: 'GET',
            url: 'https://www.eatinhousedelivery.co.uk/api-driver/?acao=coletar-pedido&id='+$stateParams.venda_id+'&coletado='+retorno.toString()
        }).then(function successCallback(response) {
            if(controleError.checkError(response)){
                $location.path('/entregar-cliente/'+$stateParams.venda_id);
            }else{
                $location.path('/menu/aguardando');
            }
        });
        
    }
    
    
    
    $scope.cancelarOrdem = function(){
        $http({
            method: 'GET',
            url: 'https://www.eatinhousedelivery.co.uk/api-driver/?acao=atualizar-status-pedido&id='+$stateParams.venda_id+'&status=4'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            if(controleError.checkError(response)){
               $location.path('/menu/aguardando');
            }
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
    }

}])
   
.controller('entregarOrdemCtrl', ['$scope', '$stateParams', '$http', 'controleError', '$location', '$ionicPopup', '$state', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, controleError, $location, $ionicPopup, $state, $rootScope) {
    
    // ID da venda
    // $stateParams.venda_id = 254;
    // $rootScope.entregador_id = 25;
    // console.log($stateParams.venda_id);
    
    $scope.checkItems = { };
    
    $scope.print = function() {
        console.log($scope.checkItems);
    }
    
    $scope.save = function() {
        var array = [];
        for(i in $scope.checkItems) {
            if($scope.checkItems[i] == true) {
                array.push(i);
            }
        }
        return array;
    }
    
    $http({
        method: 'GET',
        url: 'https://www.eatinhousedelivery.co.uk/api-driver/?acao=pedido-completo&id='+$stateParams.venda_id
    }).then(function successCallback(response) {
        if(controleError.checkError(response)){
            console.log(response);
            $scope.data = response.data;
        }else{
            $location.path('/menu/aguardando');
        }
      });
      
    $scope.entregarOrdem = function(){
        var retorno = $scope.save();
        
        $http({
            method: 'GET',
            url: 'https://www.eatinhousedelivery.co.uk/api-driver/?acao=entregar-pedido&venda_id='+$stateParams.venda_id+'&entregue='+retorno.toString()
        }).then(function successCallback(response) {
            if(controleError.checkError(response)){
                $location.path('/menu/aguardando');
                var alertPopup = $ionicPopup.alert({
                    title: "Order delivered!",
                    template: ""
                });
            }else{
                $location.path('/menu/aguardando');
            }
        });
        
    }
    
    
    $scope.cancelarOrdem = function(){
        $http({
            method: 'GET',
            url: 'https://www.eatinhousedelivery.co.uk/api-driver/?acao=atualizar-status-pedido&id='+$stateParams.venda_id+'&status=4'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            if(controleError.checkError(response)){
              $location.path('/menu/aguardando');
            //   $state.go('/aguardando')
            //   console.log('redirect');
            }
            
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        
    }

}])
   
.controller('cadastreSeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('minhasEntregasCtrl', ['$scope', '$stateParams', '$rootScope', '$http', 'controleError', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $http, controleError) {
    
    // $rootScope.usuario_id = 22;
    
    $http({
        method: 'GET',
        url: 'https://www.eatinhousedelivery.co.uk/api-driver/?acao=lista-pedido&entregador_id='+$rootScope.entregador_id
    }).then(function successCallback(response) {
        if(controleError.checkError(response)){
           console.log(response);
           $scope.data = response.data;
        }else{
            $location.path('/menu/aguardando');
        }
      });
}])
   
.controller('ajudaCtrl', ['$scope', '$stateParams', '$http', '$location', 'controleError', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $location, controleError) {
    $http({
        method: 'GET',
        url: 'https://www.eatinhousedelivery.co.uk/api-driver/?acao=lista-ajuda'
    }).then(function successCallback(response) {
        if(controleError.checkError(response)){
           console.log(response);
           $scope.data = response.data;
           console.log($scope.data);
        }else{
            $location.path('/aguardando');
        }
      });

}])
   
.controller('ferramentasCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('sugerirUmAmigoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 