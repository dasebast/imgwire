
(function() {


angular
  .module('imgwire')
  .controller('HomeCtrl', HomeCtrl)

function HomeCtrl (homeService, $rootScope, getImgs, imageCloudService, $scope) {
  var vm = this;

  vm.test = "homeCtrl win";

  vm.imgs = getImgs;

  imageCloudService.imageCloud(vm.imgs)
    .then(function(res) {
      console.log(res);
      vm.imgs = res;
      $scope.imgs = {imgs: vm.imgs};
    	console.log($scope.imgs);
    });





}

})();