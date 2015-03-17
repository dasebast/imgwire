(function() {

angular
	.module('imgwire')
	.service('dashService', dashService)

function dashService ($http, $q) {
	this.getData = function() {
		console.log('im in the dashService')
	},

	this.logMeOut = function() {
		var deferred = $q.defer();
		console.log('logout almost resovlved')
		$http({
			method: 'GET',
			url: '/api/logout'
		}).then(function(response) {
			console.log('logout promise resolved')
			deferred.resolve(response.data);
		});
		return deferred.promise;
	},

	this.getPictures = function() {
		var dfd = $q.defer();
		console.log('going to fetch the pictures')
		$http({
			method: 'GET',
			url: '/api/pic'
		})
		.then(function(response) {
			console.log(response.data)
			dfd.resolve(response.data)
		})
		.catch(function(err) {
			console.log('error in getting the pics bro')
		})
		return dfd.promise
	}
}
})()