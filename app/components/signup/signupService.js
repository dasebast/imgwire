(function() {

angular
	.module('imgwire')
	.service('signupService', signupService);

function signupService() {
	this.getData = function() {
		console.log('im in ther signup service')
	}
}

})()