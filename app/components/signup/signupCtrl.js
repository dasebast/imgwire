(function() {

angular
	.module('imgwire')
	.controller('signupCtrl', signupCtrl);

function signupCtrl (signupService) {
	var vm = this;

	vm.test = 'this is the signup Controller'

	signupService.getData();
}

})()