
(function() {


angular
  .module('imgwire')
  .controller('HomeCtrl', HomeCtrl)

function HomeCtrl (homeService, getImgs, getTags, imageCloudService, $scope, $rootScope) {
  var vm = this;
 
  vm.test = "homeCtrl win";
  vm.tags = getTags;
  vm.imgs = getImgs;


  imageCloudService.imageCloud(vm.imgs)
    .then(function(res) {
      console.log(res);
      vm.imgs = res;
      $rootScope.imgs = vm.imgs;
      $scope.imgs = {imgs: vm.imgs};
    });

  vm.tagSearch = function(id) {
    console.log(id);
  };

}

})();