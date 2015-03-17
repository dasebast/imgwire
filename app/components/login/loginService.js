(function() {

angular
	.module('imgwire')
	.service('loginService', loginService)

	function loginService ($q, $http) {
		this.getData = function() {
			console.log('im in the service')
		}

		this.loginUser = function(obj) {
			var dfd = $q.defer();
			$http ({
				method: 'Post',
				url: '/api/auth',
				data: {
					email: obj.email,
					password: obj.password
				}
			})
			.then(function(response) {
				console.log('login service response')
				dfd.resolve(response)
			})
			.catch(function(err) {
				console.log('error in the login service')
				dfd.reject(err);
			});
			return dfd.promise
		}
	}
})();