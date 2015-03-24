(function() {

	angular
		.module('imgwire')
		.controller('sidebarCtrl', sidebarCtrl);

		function sidebarCtrl (authService, homeService, $rootScope){
			var vm = this;
			vm.register = false;
			vm.loggedIn = false;
			vm.searchTags = [];
			vm.searchStr = '';
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
		if (vm.searchStr) {
			console.log(vm.searchStr);
			var tagArray = vm.searchStr.replace(/ +/g, ' ').split(' ');
			//TODO get tags from DB and push to vm.tags
			homeService.getTags(vm.searchTags).then(function(res) {
				var tagsFromDB = res;
				console.log(tagsFromDB);
				vm.searchTags = tagArray;
				console.log(vm.searchTags);
				vm.searchStr = '';
				
				homeService.searchByTags(tagArray).then(function(newImgs) {
					$rootScope.$emit('rootScope:emit', newImgs);
				})
				
			})

		}
	}

	//TODO change tag to _id and search 'default' pics
	vm.removeTag = function(tag) {
		vm.searchTags.splice(vm.searchTags.indexOf(tag), 1);
		homeService.getPics().then(function(newImgs) {
			$rootScope.$emit('rootScope:emit', newImgs);
		})
	}

		}
})();