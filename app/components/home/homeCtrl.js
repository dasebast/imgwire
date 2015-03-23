
(function() {


angular
  .module('imgwire')
  .controller('HomeCtrl', HomeCtrl)

function HomeCtrl (homeService, getImgs, getTags, imageCloudService, $scope, $rootScope) {
  var vm = this;
 
  vm.test = "homeCtrl win";
  vm.tags = getTags;
  vm.imgs = getImgs;
  vm.modalShowing = false;

  vm.clickHandler = function(id) {
    console.log(id);
  };

  $rootScope.$on('rootScope:emit', function(event, data) {
    imageCloudService.imageCloud(data)
      .then(function(res) {
        vm.imgs = res;
        $scope.imgs = {imgs: vm.imgs};
      })
  });


  imageCloudService.imageCloud(vm.imgs)
    .then(function(res) {
      vm.imgs = res;
      $scope.clickHandler = {clickHandler: vm.clickHandler};
      $scope.imgs = {imgs: vm.imgs};
    });

  vm.tagSearch = function(id) {
    console.log(id);
  };

}

})();