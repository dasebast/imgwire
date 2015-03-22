(function() {

angular
	.module('imgwire')
	.service('imageCloudService', imageCloudService);


function imageCloudService ($q) {
var that = this;

var formattedImgArr = [];

	this.getImgs = function () {
		var dfd = $q.defer();
		if (formattedImgArr.length) {
			dfd.resolve(formattedImgArr);
		} else {
			dfd.reject('no images')
		}
		return dfd.promise;
	}

// imgs [{id, url, likes, tags []}]
this.imageCloud = function (imgs) {
		var dfd = $q.defer();

		 var getMaxOfArray = function(objArr) {
		 		objArr.sort(function(a, b) {
		 			return b.likes - a.likes;
		 		})
		       return objArr[0].likes;
		  }

		  var getMinOfArray = function(objArr) {
		 		objArr.sort(function(a, b) {
		 			return a.likes - b.likes;
		 		})
		       return objArr[0].likes;
		  }

var tempImgs = imgs.sort(function compare(a,b) {
		  if (a.likes > b.likes)
		     return -1;
		  if (a.likes < b.likes)
		    return 1;
		  return 0;
		}
);



var setSizes = function(imgArr) {
/* var total = 0;*/
   /* for (var i = 0; i < imgArr.length; i++) {
      total+=imgArr[i].likes;
    }*/
    imgArr[0].w = maxWidth;
    imgArr[0].h = maxHeight;
    imgArr[1].w = maxWidth * .60;
    imgArr[1].h = maxHeight * .60;
    imgArr[2].w = maxWidth * .50;
    imgArr[2].h = maxHeight * .50;
	maxWidth = maxWidth - ((maxWidth - minWidth)*.80);
	maxHeight = maxHeight - ((maxHeight - minHeight)*.80);
    for (var i = 3; i < imgArr.length; i++) {
	    var percentage = (imgArr[i].likes - minLikes) / (maxLikes - minLikes);
	    var calcWidth = minWidth + (percentage * (maxWidth - minWidth));
	    var calcHeight = minHeight + (percentage * (maxHeight - minHeight));

	    imgArr[i].w = calcWidth;
	    imgArr[i].h = calcHeight;
	}
}



var checkCollision = function (rect, bounds) {
  for (var i = 0; i < filledImgs.length; i++) {
  //boundary check
  if (rect.x < bounds.x ||
  	rect.y < bounds.y ||
  	rect.x + rect.w > bounds.x + bounds.w ||
  	rect.y + rect.h > bounds.y + bounds.h) {
  	//outside of boundary
  	return true;
  }
  //collision with other images
  if (filledImgs[i].x + overlap < rect.x + rect.w &&
      filledImgs[i].x + filledImgs[i].w - overlap  > rect.x &&
      filledImgs[i].y + overlap < rect.y + rect.h &&
      filledImgs[i].h + filledImgs[i].y - overlap > rect.y) {
      // collision detected!
      return true;
  }
  //no collision
	   
	}
	 return false;
}

	var getPosition = function (imgObj, start, callback) {

			var x = xCenter;
			var y = yCenter;
			var dy = $('#viewPort').height()/80/*(imgObj.h/8)*/;
			var dx = dy*(ratio);
			ratio = ratio/1.01
			var counter = 1;
			var horizontal = true;
			var reverse;
			for (var i = start; i < (start + 320); i++) {		
				 switch (i % 4)
				  {
		        case 0: horizontal = true;
		        		reverse = -1;
		        		break;
		        case 1: //y -= dy * counter;
		        		horizontal = false;
		        		reverse = -1;
		        		counter++;
		        		break;
		        case 2: //x += dx * counter; 
		        		horizontal = true;
		        		reverse = 1;
		        		break;
		        case 3: //y += dy * counter;
		        		counter++;
		        		horizontal = false;
		        		reverse = 1;
		        		break;
		        default: console.log('error');
		      }
		      	var intervals = 4*counter;
		      	var shiftX = (dx*(counter/intervals)*reverse);
		      	var shiftY = (dy*(counter/intervals)*reverse);
		      	while(intervals >= 0) {
		      		if (horizontal) {
		      			ctx.beginPath();
						ctx.moveTo(x, y);
						ctx.lineTo(x-shiftX,y);
						/*ctx.stroke();*/
						x = x-shiftX;
					} else {
						ctx.beginPath();
						ctx.moveTo(x, y);
						ctx.lineTo(x,y-shiftY);
						/*ctx.stroke();*/
						y = y-shiftY;
					}
					//ctx.stroke();
					intervals--;

					//{x, y, w, h}
					var potentialImg = {'x': x - imgObj.w/2,
										'y': y - imgObj.h/2,
										'w': imgObj.w,
										'h': imgObj.h};
					
					var doesCollide = checkCollision(potentialImg, bounds);
							if (!doesCollide) {
						filledImgs.push({ 'x': potentialImg.x,
															'y': potentialImg.y,
															'w': potentialImg.w,
															'h': potentialImg.h});
						imgObj.top = potentialImg.y;
						imgObj.left = potentialImg.x;
						callback(imgObj);
						return;
					};
					}
			}
		}

//function start		

var filledImgs = [];
var bounds;
var viewPort = {};
viewPort.w = $(window).width() - $('#sidebar').width();
viewPort.w = viewPort.w;
viewPort.h = $(window).height() - $('#spacer').height();
viewPort.h = viewPort.h*0.9;
var canvas = document.getElementById('cloud');
var ctx = canvas.getContext('2d');
ctx.canvas.height = viewPort.h;
ctx.canvas.width = viewPort.w;
var topOffset = $('#spacer').height() + 10;
var leftOffset = $('#sidebar').width();
var xCenter =(viewPort.w/2) + leftOffset;
var yCenter =(viewPort.h/2) + topOffset;
var ratio = viewPort.w/viewPort.h;
var	bounds = {
			'x': leftOffset,
			'y': topOffset,
			'w': leftOffset + viewPort.w,
			'h': topOffset + viewPort.h
}
var maxWidth = viewPort.w*(0.33);
var minWidth = 70;
var maxHeight = viewPort.h*(0.38);
var minHeight = 50;
var overlap = 6;
var minLikes = getMinOfArray(tempImgs);
var maxLikes = getMaxOfArray(tempImgs);
setSizes(tempImgs);


tempImgs[0].top = topOffset + viewPort.h/2 - (tempImgs[0].h/2);
tempImgs[0].left = leftOffset + viewPort.w/2 - (tempImgs[0].w/2);
filledImgs.push({   'x': tempImgs[0].left,
								'y': tempImgs[0].top,
								'w': tempImgs[0].w,
								'h': tempImgs[0].h})
tempImgs[1].top = topOffset + viewPort.h/2 - (tempImgs[1].h/2);
tempImgs[1].left = tempImgs[0].left + tempImgs[0].w - 15;
filledImgs.push({   'x': tempImgs[1].left,
								'y': tempImgs[1].top,
								'w': tempImgs[1].w,
								'h': tempImgs[1].h})
tempImgs[2].top = topOffset + viewPort.h/2 - (tempImgs[2].h/2);
tempImgs[2].left = tempImgs[0].left + 15 - tempImgs[2].w;
filledImgs.push({   'x': tempImgs[2].left,
								'y': tempImgs[2].top,
								'w': tempImgs[2].w,
								'h': tempImgs[2].h})

for (var i = 3; i < tempImgs.length; i++) {
			//attach position info to imgs
			getPosition(tempImgs[i], i, function(imgObjWithPosition) {
				tempImgs[i] = imgObjWithPosition;
			});
		}
		formattedImgArr = tempImgs;

		dfd.resolve(formattedImgArr);

return dfd.promise;
}; //end imageCloud 

};

})();