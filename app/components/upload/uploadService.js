// 'use strict';

// var photoAlbumServices = angular.module('photoAlbumServices', ['ngResource']);

// photoAlbumServices.factory('album', ['$rootScope', '$resource',
//   function($rootScope, $resource){
//     var url = $.cloudinary.url('myphotoalbum', {format: 'json', type: 'list'});
//     //cache bust
//     url = url + "?" + Math.ceil(new Date().getTime()/1000);
//     return $resource(url, {}, {
//       photos: {method:'GET', isArray:false}
//     });
//   }]);
(function() {
angular
	.module('imgwire')
	.service('photoAlbumServices', photoAlbumServices);

		function photoAlbumServices ($q, $http, $rootScope) {
			this.uploadUrl = function(obj, title, tags) {
				var dfd = $q.defer();
				$http({
					method: 'Post',
					url: '/api/pic',
					data: {
						title: title,
						image: obj,
						owner: $rootScope.currentUser._id,
						tags: tags
					}
				})
				.then(function(response) {
					console.log(response)
					dfd.resolve(response)
				})
				.catch(function(err) {
					console.log(err + 'errror')
					dfd.reject(err);
				});
				return dfd.promise
			},

			this.uploadTags = function(tagObj){
				var dfd = $q.defer();
				console.log(tagObj);
				$http({
					method: 'POST',
					url: '/api/tags',
					data: tagObj
				})
				.then(function(response){
					console.log(response.data);
					dfd.resolve(response.data);
				})
				.catch(function(err){
					dfd.reject(err);
				});
				return dfd.promise;
			}

		}
})();