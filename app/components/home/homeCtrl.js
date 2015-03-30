
(function() {


angular
  .module('imgwire')
  .controller('HomeCtrl', HomeCtrl)

function HomeCtrl (homeService, getImgs, getTags, imageCloudService, $scope, $rootScope, $timeout) {
  var vm = this;
 
  vm.test = "homeCtrl win";
  vm.resolvePics = getImgs;
  vm.modalShowing = false;
  vm.url = '';
  vm.upvotes = 0;
  vm.noResultsMessage = "Your search returned no results. Please try a less specific search!"

  $rootScope.$on('rootScope:emit', function(event, data) {
    imageCloudService.imageCloud(data)
      .then(function(res) {
        vm.imgs = res;
      })
  });



  vm.openModal = function(url, likes, tags, id) {
      console.log(url);
      vm.id = id;
      vm.url = url;
      vm.upvotes = likes;
      $timeout(function(){
        vm.modalShowing = true;
        vm.tags = tags;
      }, 50)
      console.log(vm.modalShowing);
  };

  vm.closeModal = function() {
    vm.url = '';
    vm.modalShowing = false;
    vm.tags = [];
    console.log(vm.modalShowing);
  }

  vm.nothing = function() {
    return null;
  }

  vm.upvote = function() {
    homeService.upvote(vm.id).then(function(res){
      vm.upvotes = res;
    })
  }

  vm.downvote = function() {
    homeService.downvote(vm.id).then(function(res) {
      vm.upvotes = res;
    })
  }


  imageCloudService.imageCloud(vm.resolvePics)
    .then(function(res) {
      console.log(res);
      $rootScope.imgs = res;
      $rootScope.$emit('rootScope:emit', res);
    });

}

})();