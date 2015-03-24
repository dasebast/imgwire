(function() {

	angular
		.module('imgwire')
		.service('homeService', homeService);

	function homeService($http, $q) {
		var apiUrl = '/api';

		this.getPics = function() {
			var dfd = $q.defer();
			$http.get(apiUrl + '/pic')
				.then(function(res) {
					var tempArr = [];
					for (var i = 0; i < res.data.length; i++){
						tempArr.push({
										//TODO get the right key names
										'id': res.data[i]._id,
										'url': res.data[i].imageUrl,
										'likes': res.data[i].upvotes
						})
					};
					//TODO replace res.data with tempArr
					dfd.resolve(res.data);
				});
			return dfd.promise;
		}

	this.getTags = function() {
		var dfd = $q.defer();
		$http.get(apiUrl + '/tags')
			.then(function(res) {
				dfd.resolve(res.data);
			})
		return dfd.promise;
	}

	this.searchByTags = function(searchTags) {
		var dfd = $q.defer();
		console.log(searchTags);

		$http({
			method: 'POST',
			url: apiUrl + '/searchTagPictures',
			data: {
				tags: searchTags
			}
		})
			.then(function(res) {
				var tempArr = [];
					for (var i = 0; i < res.data.length; i++){
						tempArr.push({
										//TODO get the right key names
										'id': res.data[i]._id,
										'url': res.data[i].imageUrl,
										'likes': res.data[i].upvotes,
										'tags': res.data[i].tags
						})
					};
				dfd.resolve(tempArr);
			})

		return dfd.promise;
	}

	this.upvote = function(id) {
		var dfd = $q.defer();
		$http({
			method: 'POST',
			url: apiUrl + '/upvote',
			data: {
				_id: id
			}
		})
			.success(function(res) {
				dfd.resolve(res.data);
			})
		return dfd.promise
	}

	this.downvote = function(id) {
		var dfd = $q.defer();
		$http({
			method: 'POST',
			url: apiUrl + '/downvote',
			data: {
				_id: id
			}
		})
			.success(function(res) {
				dfd.resolve(res.data);
			})
		return dfd.promise
	}

	this.tagQuery = function(tagArr) {
		var dfd = $q.defer();
			$http({
				method: 'POST',
				url: apiUrl + '/tagQuery',
				data: {
					title: tagArr
				}
			})
			.then(function(response) {
				console.log(response.data);
				dfd.resolve(response.data);
			})

		return dfd.promise;
	}

	}

})();