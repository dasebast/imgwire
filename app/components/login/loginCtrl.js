(function() {

angular
	.module('imgwire')
	.controller('loginCtrl', loginCtrl);

function loginCtrl(loginService) {
	var vm = this;

	vm.test = 'this is the loginCtrl'

	loginService.getData()
}


})()