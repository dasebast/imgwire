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
          data.context = {custom: {photo: $scope.title}};
          file.result = data;
          $rootScope.photos.push(data);
          console.log($rootScope.photos[0].url)
          if(!$scope.$$phase) {
            $scope.$apply();
          } 
          var tagArray = $scope.tags.replace(/ +/g, ' ').split(' ');
          var tagObjects = {
            title: tagArray
          };
          console.log(tagArray);
          console.log(tagObjects);
          photoAlbumServices.uploadTags(tagObjects).then(function(res){
            console.log(res);
            $rootScope.tagStore = [];
            res.forEach(function(item){
              console.log(item._id);
              $rootScope.tagStore.push(item._id);
            })
            console.log($rootScope.tagStore);
            photoAlbumServices.uploadUrl($rootScope.photos[0].url, $scope.title, $rootScope.tagStore).then(function(response) {
              $scope.title = '';
              $scope.tags = '';
              console.log(response + 'im the return productrtttt');
            });            
          })
        }).catch(function(err){
            console.log(err, 'this is the error in the file upload');
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