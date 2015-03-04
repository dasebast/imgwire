(function() {

angular
	.module('imgwire')
	.service('loginService', loginService)

	function loginService () {
		this.getData = function() {
			console.log('im in the service')
		}
	}
})();