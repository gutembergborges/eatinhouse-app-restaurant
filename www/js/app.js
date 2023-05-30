// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services','uiGmapgoogle-maps','googlemaps.init','firebase','firebaseConfig','ngCordova',])

.config(function($ionicConfigProvider, $sceDelegateProvider){

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

.run(function($ionicPlatform,$rootScope,$timeout,Config,Util,$http,$state, $ionicPopup, $ionicHistory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }



    $ionicPlatform.registerBackButtonAction(function(e) {
     e.preventDefault();
     function showConfirm() {
      var confirmPopup = $ionicPopup.show({
       title : 'Exit?',
       template : 'Are you sure you want to exit?',
       buttons : [{
        text : 'Cancel',
        type : 'button-royal button-outline',
       }, {
        text : 'Ok',
        type : 'button-royal',
        onTap : function() {
         ionic.Platform.exitApp();
        }
       }]
      });
     };

     // Is there a page to go back to?
     if ($ionicHistory.backView()) {
      // Go back in history
      $ionicHistory.backView().go();
     } else {
      // This is the last page: Show confirmation popup
      showConfirm();
     }

     return false;
    }, 101);

  });

  document.addEventListener('deviceready', function () {
    // cordova.plugins.backgroundMode is now available
    cordova.plugins.backgroundMode.setEnabled(true);
  }, false);

  if(localStorage.getItem('nome_restaurante')!=''){
    $rootScope.nome_restaurante = localStorage.getItem('nome_restaurante');
    
  }
    $rootScope.notificacaoNaoLido = 0;
  function refreshNotification(){
    // let token = localStorage.getItem('token');
    $http({
      method: 'GET',
      url: Util.url+'notificacao/auto-search/empresa_id/'+localStorage.getItem('token')
    }).then(function successCallback(response) {



      // console.log(response);
      $rootScope.notificacaoNaoLida = response.data.notificacaoNaoLida;
      $rootScope.ordensAceitas = response.data.ordensAceitas;
      $rootScope.ordensDespachadas = response.data.ordensDespachadas;
      $rootScope.ordensCanceladas = response.data.ordensCanceladas;
      // console.log(response.data.notificacao);
      if(response.data.notificacao != null){ // se n�o for vazio
        Lobibox.notify(response.data.notificacao.tipo, {
          soundPath: 'sounds/',   // The folder path where sounds are located
          sound: 'sound4',
          // img:  $rootScope.patches.pathThumbMobile + usuariomsg.fotorosto, //path to image
          // msg:  usuariomsg.primeironome + $msgFavorito ,
          icon: 'icon ion-ios-information-outline',
          title: response.data.notificacao.msg ,
          msg: response.data.notificacao.texto ,
          size: 'normal',
          delay: Config.delayNotificacao,  //In milliseconds
          showClass: 'zoomIn',
          hideClass: 'zoomOut' ,
          // sound: $sound ,
          position: "top",
          onClick: function(){
            $state.go('menu.ordemDetalhe', {id: response.data.ordem.id});
          }
            //, 
            //onClick: function(){
            //    $location.path('/app/favoritosmeu');
            //    alert('Abro agora a combinacao pendente  para esse nego  id= ' + usuariomsg.idusuario);
            // } 
        });

            // Play audio
    var my_media;
        
    // // Play the audio file at url
    my_media = new Media('https://www.eatinhouse.com/audio/song.mp3',
        // success callback
        function () {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        },
        // loop callback
        function (status) {
            // if(status === Media.MEDIA_STOPPED) {
            //     my_media.seekTo(0);
            //     if($scope.played < 1)
            //       my_media.play();

            //     $scope.played++;
            // }
        }
    );

    // // Play audio
    my_media.play({ numberOfLoops: 6 });


    $rootScope.$on('$stateChangeStart', function (e) {
      my_media.stop();
    });
    // my_media.status.subscribe((status) => {
    //   if(status === Media.MEDIA_STOPPED) my_media.play();
    // });

      }
    });
  }
  function recursiveNotification(){
    $timeout(function() {
      // console.log('entrou');
      if(Config.enabledNotification){
        // console.log('rodou');
        refreshNotification();
      }
      recursiveNotification();
    }, Config.timerNotificacao);
  }

  recursiveNotification();
  refreshNotification();

})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });
      
      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});