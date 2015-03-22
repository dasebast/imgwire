(function() {

angular
	.module('imgwire')
	.controller('loginCtrl', loginCtrl);

function loginCtrl(loginService, $location) {
	var vm = this;

	vm.test = 'this is the loginCtrl'
/*	vm.login = function(obj) {
		loginService.loginUser(obj).then(function(res) {
			console.log('promise has returned')
			$location.path('/dashboard')
		})
		.catch(function(err) {
			console.log(err)
		});
	}*/
	
}


})()