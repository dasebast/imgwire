(function() {

	angular
		.module('imgwire')
		.directive('ImgCloud', ImageCloudDirective);

		function ImageCloudDirective (reactDirective) {
			console.log('hi?')

			return reactDirective(ImageCloud);
		}

})();