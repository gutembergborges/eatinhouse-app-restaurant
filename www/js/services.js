angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])


.service('controleError', function($ionicPopup) {
    return {
        checkError: function(response) 
        {
            if(response.data.error&&response.data.error>0){
                var alertPopup = $ionicPopup.alert({
                    title: response.data.error_msg,
                    template: ""
                });
                return false;
            }else{
                return true;
            }
        }
    }
})

.service('loginService', function($rootScope, $location) {
    return {
        checkLogin: function() 
        {
            console.log($rootScope.entregador_id);
            if(typeof $rootScope.entregador_id === 'undefined'||$rootScope.entregador_id==null){
                return true;
            }else{
                return false;
            }
        }
    }
})
.service('sideMenuService', function($ionicSideMenuDelegate) {
    return {
        openSideMenu: function() 
        {
            console.log('open menu');
            return $ionicSideMenuDelegate.toggleLeft();
        }
    }
})

.service('Util', [function(){
    return{

        url: 'https://www.eatinhousedelivery.co.uk/api/'
    }
}])

.service('Config', [function(){
    this.timerNotificacao = 3000; // Intervalo entre as requisições
    this.delayNotificacao = 8000; // Tempo que a notificação fica disponível
    this.enabledNotification = true;
}]);