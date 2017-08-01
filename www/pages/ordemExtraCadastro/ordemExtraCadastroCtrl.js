 angular.module('app.controllers')


.controller('ordemExtraCadastroCtrl', ['$scope', '$stateParams', '$http', '$state','$ionicPopup','Util','$httpParamSerializerJQLike', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $state,$ionicPopup,Util,$httpParamSerializerJQLike) {
    
    //VALIDAÇÃO DOS CAMPOS DO FORMULARIO
    $scope.passos = new Array();
    $scope.passos['passo1'] = {"nome":"","telefone":"", "email":""};
    $scope.passos['passo2'] = {"numero":"","logradouro":"","complemento":"","cep":""};
    $scope.passos['passo3'] = {"referencia":""};
    $scope.passos['passo4'] = {"instrucao":""};
    $scope.passos['passo5'] = {"qtd":"","produto":"", "preco":""};

    
    $scope.formData = new Array();

    for(var validacao in $scope.passos){
      $scope.formData[validacao] = $scope.passos[validacao];
    }

    $scope.validacaoPasso = function(passo){
      var status = true;
      angular.forEach($scope.formData[passo], function(value, key) {
        if(value=="" || typeof(value) == "undefined")
          status = false;
      })
      $scope[passo] = status;
    }

    //JAQUERY PARA MONTAR O ACCORDION
     $(".set > a").on("click", function(){
    if($(this).hasClass('active')){
      $(this).removeClass("active");
      $(this).siblings('.content').slideUp(200);
      $(".set > a .situacao").removeClass("ion-minus").addClass("ion-plus");
    }else{
      $(".set > a .situacao").removeClass("ion-minus").addClass("ion-plus");
    $(this).find(".situacao").removeClass("ion-plus").addClass("ion-minus");
    $(".set > a").removeClass("active");
    $(this).addClass("active");
    $('.content').slideUp(200);
    $(this).siblings('.content').slideDown(200);
    }
    
  });

     $scope.reajusteFormData = function(formData){
      form = {};
      for( var key in formData ) {
        form = Object.assign(form, formData[key]); // Quando é um objeto, mescla os objetos
        // form = form.concat(formData[key]); // Quando é um vetor, concatena tudo
      }
      console.log(form)
      return form;
     }

     $scope.confirmaValidacao = function(){
      if($scope.passo1&&$scope.passo2&&$scope.passo3&&$scope.passo4&&$scope.passo5)
        return true;
      else
        return false;
     }

    //SALVANDO A ORDEM EXTRA

     $scope.salvarPedido = function(){
      if($scope.confirmaValidacao()){
        formulario = $scope.reajusteFormData($scope.formData);
        console.log(formulario);
        formulario.token = localStorage.getItem('token');
        $http({
              method: 'POST',
              url: `${Util.url}pedidoextra/add/`,
              // data: formulario,
              data: $httpParamSerializerJQLike({'Formulario': formulario}),
                    headers : {
                      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
              }).then(function successCallback(response) {
              var alertPopup = $ionicPopup.alert({
                title: 'Parabéns',
                template: 'Sua reunião foi cadastrada!'
              })

              // $state.go('menu.agenda');
              });       
      }else{
        $ionicPopup.alert({
          title: 'Ops',
          template: 'preencha com todas infos!'
        })
      }
    
    }

     
}])
