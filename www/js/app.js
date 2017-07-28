// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services','uiGmapgoogle-maps','googlemaps.init','firebase','firebaseConfig','ngCordova',])

.config(function($ionicConfigProvider, $sceDelegateProvider,){

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

.run(function($ionicPlatform,$rootScope,$timeout,Config,Util,$http) {
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
  });


    $rootScope.notificacaoNaoLido = 0;
  function refreshNotification(){
    // let token = localStorage.getItem('token');
    $http({
      method: 'GET',
      url: `${Util.url}notificacao/auto-search/empresa_id/${localStorage.getItem('token')}`
    }).then(function successCallback(response) {
      console.log(response);
      $rootScope.notificacaoNaoLido = response.data.notificacaoNaoLido;
      // console.log(response.data.notificacao);
      if(response.data.notificacao != null){ // se n�o for vazio
        Lobibox.notify(response.data.notificacao.tipo, {
          soundPath: 'sounds/',   // The folder path where sounds are located
          sound: 'sound4',
          // img:  $rootScope.patches.pathThumbMobile + usuariomsg.fotorosto, //path to image
          // msg:  usuariomsg.primeironome + $msgFavorito ,
          icon: 'icon ion-ios-information-outline',
          title: response.data.notificacao.titulo ,
          msg: response.data.notificacao.texto ,
          size: 'normal',
          delay: Config.delayNotificacao,  //In milliseconds
          showClass: 'zoomIn',
          hideClass: 'zoomOut' ,
          // sound: $sound ,
          position: "top",
          onClick: function(){
            $state.go('menu.detalheNotificacoes', {id: response.data.notificacao.id});
          }
            //, 
            //onClick: function(){
            //    $location.path('/app/favoritosmeu');
            //    alert('Abro agora a combinacao pendente  para esse nego  id= ' + usuariomsg.idusuario);
            // } 
        });
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