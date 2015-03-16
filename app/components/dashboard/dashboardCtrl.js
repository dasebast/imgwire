(function() {

angular
	.module('imgwire')
	.controller('dashCtrl', dashCtrl);

 function dashCtrl(dashService, $location, app, pictures) {
 	var vm = this;
 	vm.app = app
 	vm.pictures = pictures
 	vm.test = 'your logged in!!! yay!'
 	vm.logout = function() {
 		dashService.logMeOut().then(function() {
 			$location.path('/')
 		})
 	}

 	dashService.getData();
 }


})()