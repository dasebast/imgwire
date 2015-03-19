(function() {

angular
	.module('imgwire')
	.controller('dashCtrl', dashCtrl);

 function dashCtrl(dashService, $location, app, userPictures, signupService) {
 	var vm = this;
 	vm.app = app
 	vm.userPictures = userPictures
 	//vm.pictures = pictures
 	vm.test = 'your logged in!!! yay!'
 	vm.logout = function() {
 		signupService.logMeOut().then(function() {
 			$location.path('/')
 		})
 	};
 	vm.tagSearch = function(tagInput) {
 		//TODO make search array more robust
 		console.log(tagInput)
 		var searchArr = tagInput.split(' ')
 		var searchObj = {tags: searchArr}
 		console.log(searchObj)
 		dashService.taggedPics(searchObj).then(function(res) {
 			vm.pictures = res
 		})
 		.catch(function(err) {
 			console.log('error in the dashCtrl')
 		})

 	}

 	dashService.getData();
 }


})()