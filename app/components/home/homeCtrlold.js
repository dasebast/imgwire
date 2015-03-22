(function() {

angular
	.module('imgwire')
	.controller('homeCtrl', homeCtrl);

function homeCtrl (homeService, getImgs, $rootScope) { // dont forget to inject stuff if needed 

	var vm = this;

	vm.test = "homeCtrl win";

	vm.imgs = {imgs: getImgs};



}

})();