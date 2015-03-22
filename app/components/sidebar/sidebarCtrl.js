(function() {

	angular
		.module('imgwire')
		.controller('sidebarCtrl', sidebarCtrl);

		function sidebarCtrl (authService, homeService, $rootScope){
			var vm = this;
			vm.register = false;
			vm.loggedIn = false;
			vm.tags = [];
			vm.searchTags = '';
			vm.userLoginInfo = {};
			vm.message = "Hello, ";

			vm.imgs = homeService.getPics().then(function(imgs) {
				$rootScope.imgs = imgs;
			})



	vm.login = function(obj) {

		authService.loginUser(obj).then(function(res) {
			$rootScope.currentUser = res;
			vm.loggedIn = true;
			vm.userLoginInfo = {};
		})
		.catch(function(err) {
			console.log(err)
		});
	}

	vm.signup = function(obj) {
		
		authService.signupUser(obj).then(function(res) {
			$rootScope.currentUser = res;
			vm.loggedIn = true;
			vm.userLoginInfo = {};
		}).catch(function(err) {
			console.log(err)
		});
	}

	vm.logMeOut = function() {
		authService.logMeOut().then(function(res) {
			vm.register = false;
			vm.loggedIn = false;
			$rootScope.currentUser = {};
		})
	}

	vm.searchByTags = function(searchTags) {
		if (searchTags) {
			var tagArray = searchTags.split(' ');
			//TODO get tags from DB and push to vm.tags
		
			homeService.getTags(searchTags).then(function(res) {
				console.log(res);
				tagsFromDB = res;
				homeService.searchByTags(tagArray).then(function(newImgs) {
					console.log(newImgs);
					$rootScope.$emit('rootScope:emit', newImgs);
				})
				
			})

		}
	}

		}
})();