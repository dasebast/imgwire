(function() {

angular
	.module('imgwire')
	.config(config)

function config ($stateProvider, $urlRouterProvider) {
		
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/components/home/homeView.html',
			controller: 'homeCtrl',
			controllerAs: 'vm'
		})
		//.state
	}

})();