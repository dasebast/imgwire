(function() {

angular
	.module('imgwire')
	.config(config);

function config ($stateProvider, $urlRouterProvider) {
		
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/components/home/homeView.html',
			controller: 'HomeCtrl',
			controllerAs: 'vm',
			resolve: {
				getImgs: function(homeService) {
					return homeService.getPics();
				},
				getTags: function(homeService) {
					return homeService.getTags();
				}
			}
		})
		.state('login', {
			url: '/login',
			templateUrl: '/components/login/loginView.html',
			controller: 'loginCtrl',
			controllerAs: 'vm'
		})

		.state('signup', {
			url:'/signup',
			templateUrl: '/components/signup/signupView.html',
			controller: 'signupCtrl',
			controllerAs: 'vm'
		})
		.state('dashboard', {
			url:'/dashboard',
			templateUrl: '/components/dashboard/dashboardView.html',
			controller: 'dashCtrl',
			controllerAs: 'vm',
			resolve:  {
						app: function(signupService) {
							return signupService.getProfile()	
						}

						// pictures: function(dashService) {
						// 	return dashService.getPictures()
						// }
					}	
		})

		

	}

})();