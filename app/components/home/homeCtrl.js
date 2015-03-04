(function() {

angular
	.module('imgwire')
	.controller('homeCtrl', homeCtrl);

function homeCtrl () { // dont forget to inject stuff if needed 

	var vm = this;

	vm.test = "homeCtrl win";

}

})();