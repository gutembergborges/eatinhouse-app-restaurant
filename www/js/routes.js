angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('login', {
    url: '/login',
    templateUrl: 'pages/login/login.html',
    controller: 'loginCtrl'
  })

  .state('entregarParaOCliente', {
    url: '/entregar-cliente/:venda_id',
	params: {
		venda_id: ""		
},
    templateUrl: 'templates/entregarParaOCliente.html',
    controller: 'entregarParaOClienteCtrl'
  })

  .state('novaOrdem', {
    url: '/nova-ordem/:venda_id',
	params: {
		venda_id: ""		
},
    templateUrl: 'templates/novaOrdem.html',
    controller: 'novaOrdemCtrl'
  })

  .state('menu.aguardando', {
    url: '/aguardando',
    views: {
      'side-menu21': {
        templateUrl: 'templates/aguardando.html',
        controller: 'aguardandoCtrl'
      }
    }
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('retirarOrdem', {
    url: '/coletar-ordem/:venda_id',
	params: {
		venda_id: ""		
},
    templateUrl: 'templates/retirarOrdem.html',
    controller: 'retirarOrdemCtrl'
  })

  .state('entregarOrdem', {
    url: '/entregar-ordem/:venda_id',
	params: {
		venda_id: ""		
},
    templateUrl: 'templates/entregarOrdem.html',
    controller: 'entregarOrdemCtrl'
  })

  .state('cadastreSe', {
    url: '/page12',
    templateUrl: 'templates/cadastreSe.html',
    controller: 'cadastreSeCtrl'
  })

  .state('menu.minhasEntregas', {
    url: '/entregas',
    views: {
      'side-menu21': {
        templateUrl: 'templates/minhasEntregas.html',
        controller: 'minhasEntregasCtrl'
      }
    }
  })

  .state('menu.ajuda', {
    url: '/ajuda',
    views: {
      'side-menu21': {
        templateUrl: 'templates/ajuda.html',
        controller: 'ajudaCtrl'
      }
    }
  })

  .state('menu.ferramentas', {
    url: '/ferramentas',
    views: {
      'side-menu21': {
        templateUrl: 'templates/ferramentas.html',
        controller: 'ferramentasCtrl'
      }
    }
  })

  .state('menu.sugerirUmAmigo', {
    url: '/sugerir-amigo/',
    views: {
      'side-menu21': {
        templateUrl: 'templates/sugerirUmAmigo.html',
        controller: 'sugerirUmAmigoCtrl'
      }
    }
  })

    .state('menu.ordemLista', {
    url: '/ordem-lista',
    views: {
      'side-menu21': {
        templateUrl: 'pages/ordemLista/ordemLista.html',
        controller: 'ordemListaCtrl'
      }
    }
  })

    .state('menu.ordemDetalhe', {
    url: '/ordem-detalhe',
    params: {
      id: ""    
    },
    views: {
      'side-menu21': {
        templateUrl: 'pages/ordemDetalhe/ordemDetalhe.html',
        controller: 'ordemDetalheCtrl'
      }
    }
  })


$urlRouterProvider.otherwise('/login')


});