(function() {

	angular
		.module('imgwire')
		.controller('sidebarCtrl', sidebarCtrl);

		function sidebarCtrl (authService, homeService, $rootScope, $timeout, $location){
			var vm = this;
			vm.register = false;
			vm.loggedIn = false;
			vm.searchTagObjs = [];
			vm.searchStr = '';
			vm.userLoginInfo = {};
			vm.welcomeMessage = "Hello, ";
			vm.tagArrayTitlesOnly = [];

			vm.noImgs = [{
				id: '404', 
				url: '/img/sadFace404.jpg', 
				likes: 0
			}];

			vm.imgs = homeService.getPics().then(function(imgs) {
				$rootScope.imgs = imgs;
			})



	vm.login = function(obj) {

		authService.loginUser(obj).then(function(res) {
			$rootScope.currentUser = res;
			$timeout(function() {
				vm.loggedIn = true;
			}, 50);
			vm.userLoginInfo = {};
		})
	}

	vm.signup = function(obj) {
		
		authService.signupUser(obj).then(function(res) {
			$rootScope.currentUser = res;
			$timeout(function() {
				vm.loggedIn = true;
			}, 50);
			vm.userLoginInfo = {};
		})
	}

	vm.logMeOut = function() {
		authService.logMeOut().then(function(res) {
			vm.register = false;
			vm.loggedIn = false;
			$rootScope.currentUser = {};
			$location.path('/');

		})
	}

	vm.searchByTags = function(searchStr) {
		if (vm.searchStr) {
			console.log(vm.searchStr);
			var tempTags = vm.searchStr.replace(/ +/g, ' ').split(' ');
			if (!vm.tagArrayTitlesOnly.length) {
				vm.tagArrayTitlesOnly = tempTags;
			} else {
				vm.tagArrayTitlesOnly = vm.tagArrayTitlesOnly.concat(tempTags);
			}
			//TODO get tags from DB and push to vm.tags
			homeService.tagQuery(vm.tagArrayTitlesOnly).then(function(res) {
				var tagsFromDB = res;
				console.log(tagsFromDB);
				vm.searchTagObjs = vm.tagArrayTitlesOnly;
				console.log(vm.searchTagObjs);
				vm.searchStr = '';

				homeService.searchByTags(vm.tagArrayTitlesOnly).then(function(newImgs) {
					console.log('get new imgs');
					console.log(newImgs);
					if (newImgs.length) {
						$rootScope.$emit('rootScope:emit', newImgs);
					} else {
						$rootScope.$emit('rootScope:emit', vm.noImgs);
						vm.searchTagObjs = [];
					}
				})
				
			})

		}
	}

	//TODO change tag to _id and search 'default' pics
	vm.removeTag = function(tag) {
		vm.tagArrayTitlesOnly.splice(vm.tagArrayTitlesOnly.indexOf(tag), 1);
		if (!vm.tagArrayTitlesOnly.length) {
			homeService.getPics().then(function(imgs) {
				$rootScope.$emit('rootScope:emit', imgs);
			})
		} else {
			homeService.searchByTags(vm.tagArrayTitlesOnly).then(function(newImgs) {
				$rootScope.$emit('rootScope:emit', newImgs);
			})
			
		}
	}

		}
})();