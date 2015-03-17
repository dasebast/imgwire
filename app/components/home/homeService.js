(function() {

	angular
		.module('imgwire')
		.service('homeService', homeService);

	function homeService($http, $q) {
		var apiUrl = '/api/pic';

		this.getPics = function() {
			var dfd = $q.defer();
			$http.get(apiUrl)
				.then(function(res) {
					console.log(res);
					dfd.resolve(res.data);
				});
			return dfd.promise;
		}
	}

})();