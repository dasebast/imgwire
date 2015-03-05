(function() {

angular
	.module('imgwire')
	.controller('signupCtrl', signupCtrl);

function signupCtrl (signupService, $location) {
	var vm = this;

	vm.signup = function(obj) {
		console.log('im running' + obj.username)
	signupService.signupUser(obj).then(function(res) {
		console.log(res)
		$location.path('/')
	}).catch(function(err) {
		console.log(err)
	});

}
	//signupService.getData();
}

})()