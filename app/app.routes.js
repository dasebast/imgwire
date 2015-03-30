(function() {

angular
	.module('imgwire')
	.config(config)
	.run(run);

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
					return homeService.searchByTags();
				},
				getTags: function(homeService) {
					return homeService.getTags();
				}
			}
		})
/*		.state('login', {
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
						},

						userPictures: function(dashService) {
						 	return dashService.getPictures()
						}
					}	
		})*/
		.state('upload', {
			url: '/upload',
			templateUrl: '/components/upload/uploadView.html',
			controller: 'uploadCtrl'
		})

		

	}

	function run ($rootScope) {
		$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){ 
    console.log(error);
});
	}

})();