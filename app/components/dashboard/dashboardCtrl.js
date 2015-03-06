(function() {

angular
	.module('imgwire')
	.controller('dashCtrl', dashCtrl);

 function dashCtrl(dashService, $location) {
 	var vm = this;
 	vm.test = 'your logged in!!! yay!'

 	vm.logout = function() {
 		dashService.logMeOut().then(function() {
 			$location.path('/')
 		})
 	}

 	dashService.getData();
 }


})()