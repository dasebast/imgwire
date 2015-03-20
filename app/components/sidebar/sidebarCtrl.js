(function() {

	angular
		.module('imgwire')
		.controller('sidebarCtrl', sidebarCtrl);

		function sidebarCtrl (loginService, imageCloudService){
			var vm = this;
			vm.register = false;

		}
})();