angular.module('app.controllers')

.controller('loginCtrl', ['$scope', '$stateParams', '$ionicPopup', '$http', '$location', '$ionicHistory', '$state','$rootScope','Util', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicPopup,$http,$location,$ionicHistory,$state,$rootScope,Util) {
  if(localStorage.getItem('email')!=''){
    $scope.email = localStorage.getItem('email');
    $scope.senha = localStorage.getItem('senha');
    $scope.lembrarinput = localStorage.getItem('lembrar');
  }
  if(localStorage.getItem('token')!=''){
    $location.path('/side-menu21/aguardando');
  }
  // console.log(localStorage.getItem('lembrar'));
  $scope.update = function(email,senha, lembrar){

    console.log(email)

    // if(lembrar)
      // lembrar = true;
    // else
      // lembrar = false;
    if(typeof(email) == "undefined" || typeof(senha) == "undefined"){
      var alertPopup = $ionicPopup.alert({
       
        title: 'Usuario ou senha invalida',
        template: 'Tente novamente'
      });
    }else{
      var data=  {
        fName:email,
        fSenha:senha,
      };
      $http.get(Util.url+'login_empresa/'+btoa(email)+'.'+btoa(senha))
        .success(function(data){
          console.log(data.token)
 if(data.token == null || data.token == 'null'){
          var alertPopup = $ionicPopup.alert({
           
            title: 'Try again',
            template: 'Invalid username and or password'
          });

}else{

          if(localStorage.getItem('count') == null){
            window.location.reload();
            localStorage.setItem('count', 1);
          }
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
  
          localStorage.setItem('token',data.token);

          
          // if(lembrar){
            localStorage.setItem('lembrar',lembrar)
            localStorage.setItem('email',email);
            localStorage.setItem('senha',senha);
          // }
          $scope.data = data;
          console.log('AQUI =>'+$scope.data.tipo_usuario);
          $ionicHistory.nextViewOptions({
              historyRoot: true
          });
          $rootScope.tipo_usuario = data.tipo_usuario;
          $rootScope.online = 1;
          $rootScope.boasVindas = data.boas_vindas;
          if(data.plano >= 0){
            $rootScope.plano = data.plano;
          }else{
            $rootScope.plano = localStorage.getItem('plano');
          }
            localStorage.setItem('plano',data.plano);
            localStorage.setItem('tipo_usuario',data.tipo_usuario);
            console.log("tiririca121")
            var token = localStorage.getItem('token');
            $http.get(Util.url+"perfilempresa/"+token)
              .success(function(response){
                console.log(response);
                $rootScope.nome_restaurante = response.data.nome;
                localStorage.setItem('nome_restaurante',response.data.nome);
                $state.go('menu.aguardando');

              })
              .error(function(err)
              {

              });



         
          
          
           // $location.path('/side-menu/index');
          // $state.go('menu.login');
          $scope.$apply();

}


        })
        .error(function(err)
        {
          localStorage.setItem('token','null');
          // console.log('www.querotransporte.acessovps.com.br'+'/api/login/'+btoa(email)+'.'+btoa(senha))
          var alertPopup = $ionicPopup.alert({
           
            title: 'Try again',
            template: 'Invalid username and or password'
          });
        });
    }
  }
  // An alert dialog
  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
     
      title: 'Invalid username and or password',
      template: 'Try again'
    });
    alertPopup.then(function(res) {
      console.log('Thank you for not eating my delicious ice cream cone');
    });
  };

  $scope.alterarSenha = function(){
    console.log('ativou');
    $state.go('esqueciMinhaSenha');
  };

}])