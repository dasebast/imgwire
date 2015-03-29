'use strict';

/* Controllers */

var photoAlbumControllers = angular.module('photoAlbumControllers', ['angularFileUpload']);

photoAlbumControllers.controller('uploadCtrl', ['$scope', '$rootScope', '$location', '$upload','photoAlbumServices',
  /* Uploading with Angular File Upload */
  function($scope, $rootScope, $location, $upload, photoAlbumServices) {
    $scope.$watch('files', function() {
      if (!$scope.files) return;
      console.log("before for each")
      $scope.files.forEach(function(file){
        $scope.upload = $upload.upload({
          url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload",
          fields: {upload_preset: $.cloudinary.config().upload_preset, tags: 'myphotoalbum', context:'photo=' + $scope.title},
          file: file
        }).progress(function (e) {
          file.progress = Math.round((e.loaded * 100.0) / e.total);
          file.status = "Uploading... " + file.progress + "%";
          if(!$scope.$$phase) {
            $scope.$apply();
          }
        }).success(function (data, status, headers, config) {
          $rootScope.photos = $rootScope.photos || [];
          console.log('rootScope.photos')
          console.log($rootScope.photos);
          data.context = {custom: {photo: $scope.title}};
          file.result = data;
          $rootScope.photos.push(data);
          if(!$scope.$$phase) {
            $scope.$apply();
          } 
          var tagArray = $scope.tags.replace(/ +/g, ' ').split(' ');
          $scope.tagObjects = {
            title: tagArray
          };
          console.log(tagArray);
          console.log($scope.tagObjects);
          
        }).catch(function(err){
            console.log(err, 'this is the error in the file upload');
        })
        .then(function() {
          photoAlbumServices.uploadTags($scope.tagObjects).then(function(res){
            console.log(res);
            $rootScope.tagStore = $rootScope.tagStore || [];
            res.forEach(function(item){
              console.log(item._id);
              $rootScope.tagStore.push(item._id);
            })
            $rootScope.photos.forEach(function(pics) {
              console.log('tagstore');
              console.log($rootScope.tagStore);
              console.log('scope title');
              console.log($scope.title);
              photoAlbumServices.uploadUrl(pics.url, $scope.title, $rootScope.tagStore).then(function(response) {
                console.log(response + 'im the return productrtttt');
              })
            })
          /*  $scope.title = '';
            $scope.tags = '';*/
            ;            
          })
          
        });
      });
    });

    /* Modify the look and fill of the dropzone when files are being dragged over it */
    $scope.dragOverClass = function($event) {
      var items = $event.dataTransfer.items;
      var hasFile = false;
      if (items != null) {
        for (var i = 0 ; i < items.length; i++) {
          if (items[i].kind == 'file') {
            hasFile = true;
            break;
          }
        }
      } else {
        hasFile = true;
      }
      return hasFile ? "dragover" : "dragover-err";
    };
  }]);