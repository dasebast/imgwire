
(function() {


angular
  .module('imgwire')
  .controller('HomeCtrl', HomeCtrl)

function HomeCtrl (homeService, getImgs, getTags, imageCloudService, $scope, $rootScope) {
  var vm = this;
 
  vm.test = "homeCtrl win";
  vm.tags = getTags;
  vm.imgs = getImgs;

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
      $scope.imgs = {imgs: vm.imgs};
    });

  vm.tagSearch = function(id) {
    console.log(id);
  };

}

})();