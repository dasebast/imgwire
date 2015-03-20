(function() {

angular
	.module('imgwire')
	.service('dashService', dashService)

function dashService ($http, $q) {
	this.getData = function() {
		console.log('im in the dashService')
	},

	this.getPictures = function() {
		var dfd = $q.defer();
		console.log('going to fetch the pictures')
		$http({
			method: 'GET',
			url: '/api/userPics'
		})
		.then(function(response) {
			console.log(response.data)
			dfd.resolve(response.data)
		})
		.catch(function(err) {
			console.log('error in getting the pics bro')
		})
		return dfd.promise
	},
	this.taggedPics = function(tagInput) {
		console.log(tagInput)
		var dfd = $q.defer();
		console.log('im in the dashservice req.body')
		$http({
			method: 'POST',
			url: '/api/searchTagPictures',
			data: tagInput
				
			
		})
		.then(function(response) {
			console.log(response.data)
			dfd.resolve(response.data)
		})
		.catch(function(err) {
			console.log('error in getting tagged pics')
		})
		return dfd.promise
	}
}
})()