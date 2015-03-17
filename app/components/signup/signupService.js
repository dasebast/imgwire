(function() {

angular
	.module('imgwire')
	.service('signupService', signupService);

function signupService($q, $http) {

	this.signupUser = function(obj) {
		var dfd = $q.defer();
		$http ({
			method: 'Post',
			url: '/api/user',
			data: {
				username: obj.username,
				password: obj.password,
				email: obj.email
			}
		})
		.then(function(response) {
			console.log(response + "sign up response")
			dfd.resolve(response.data)
		})
		.catch(function(err) {
			console.log('error in the signup service');
			dfd.reject(err);
		})
		return dfd.promise
	},

	this.getProfile = function() {
		var deferred = $q.defer();
		console.log('getting profile')
		$http({
			method: 'GET',
			url: '/api/profile'
		}).then(function(response) {
			console.log(response.data)
			deferred.resolve(response.data);
		});
		return deferred.promise;
	};

	this.getData = function() {
		console.log('im in ther signup service')
	};
}

})()