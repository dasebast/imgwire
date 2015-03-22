(function() {

	angular
		.module('imgwire')
		.service('authService', authService);

	function authService($http, $q, $rootScope) {

		var currentUser = {};

		this.getCurrentUser = function() {
			return currentUser;
		};

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
			console.log(response)
			currentUser = response.data;
			$rootScope.currentUser = currentUser;
			console.log('login service response')
			dfd.resolve(response.data)
		})
		.catch(function(err) {
			console.log('error in the login service')
			dfd.reject(err);
		});
		return dfd.promise
	}

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
	}

	this.logMeOut = function() {
		var deferred = $q.defer();
		console.log('logout almost resovlved')
		$http({
			method: 'GET',
			url: '/api/logout'
		}).then(function(response) {
			currentUser = {}
			deferred.resolve(response.data);
		});
		return deferred.promise;
	}

	this.getProfile = function() {
		var deferred = $q.defer();
		console.log('getting profile')
		$http({
			method: 'GET',
			url: '/api/profile'
		}).then(function(response) {
			currentUser = response.data;
			$rootScope.currentUser = currentUser;
			console.log($rootScope.currentUser)
			deferred.resolve(response.data);
		});
		return deferred.promise;
	}


	}

})();