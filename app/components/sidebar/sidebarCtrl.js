(function() {

	angular
		.module('imgwire')
		.controller('sidebarCtrl', sidebarCtrl);

		function sidebarCtrl (authService, imageCloudService){
			var vm = this;
			vm.register = false;

			vm.userLoginInfo = {}



	vm.login = function(obj) {

		console.log(obj);
		vm.userLoginInfo = {};
		/*authService.loginUser(obj).then(function(res) {
			//TODO after login actions
		})
		.catch(function(err) {
			console.log(err)
		});*/
	}

	vm.signup = function(obj) {
		console.log(obj);
		
		authService.signupUser(obj).then(function(res) {
			console.log(res);
			vm.userLoginInfo = {};
			//TODO login?
		}).catch(function(err) {
			console.log(err)
	});
}

		}
})();