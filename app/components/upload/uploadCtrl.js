'use strict';

/* Controllers */

var photoAlbumControllers = angular.module('photoAlbumControllers', ['angularFileUpload']);

photoAlbumControllers.controller('photoUploadCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$upload',
  /* Uploading with Angular File Upload */
  function($scope, $rootScope, $routeParams, $location, $upload) {
    $scope.$watch('files', function() {
      if (!$scope.files) return;
      $scope.files.forEach(function(file){
        $scope.upload = $upload.upload({
          url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload",
          data: {upload_preset: $.cloudinary.config().upload_preset, tags: 'myphotoalbum', context:'photo=' + $scope.title},
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
          if(!$scope.$$phase) {
            $scope.$apply();
          }
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