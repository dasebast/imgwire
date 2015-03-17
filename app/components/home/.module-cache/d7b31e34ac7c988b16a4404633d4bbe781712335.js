

module.exports = {

imageCloud: function () {

		 function getMaxOfArray(objArr) {
		 		objArr.sort(function(a, b) {
		 			return b.likes - a.likes;
		 		})
		 		//console.log('Max ' + objArr[0].likes)
		       return objArr[0].likes;
		  }

		  function getMinOfArray(objArr) {
		 		objArr.sort(function(a, b) {
		 			return a.likes - b.likes;
		 		})
		 		//console.log('Min ' + objArr[0].likes)
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

var maxWidth = 300;
var minWidth = 60;
var maxHeight = 200;
var minHeight = 40;
var overlap = 8;
var minLikes = getMinOfArray(tempImgs);
var maxLikes = getMaxOfArray(tempImgs);

var setSizes = function(imgArr) {
/* var total = 0;*/
   /* for (var i = 0; i < imgArr.length; i++) {
      total+=imgArr[i].likes;
    }*/
   // console.log(total);
    imgArr[0].w = maxWidth;
    //console.log(maxWidth);
    imgArr[0].h = maxHeight;
    imgArr[1].w = maxWidth * .62;
    imgArr[1].h = maxHeight * .62;
    imgArr[2].w = maxWidth * .62;
    imgArr[2].h = maxHeight * .62;
	maxWidth = maxWidth - ((maxWidth - minWidth)*.68);
	maxHeight = maxHeight - ((maxHeight - minHeight)*.68);
	//console.log(maxWidth);
    for (var i = 3; i < imgArr.length; i++) {
	    var percentage = (imgArr[i].likes - minLikes) / (maxLikes - minLikes);
	    var calcWidth = minWidth + (percentage * (maxWidth - minWidth));
	    var calcHeight = minHeight + (percentage * (maxHeight - minHeight));

	    imgArr[i].w = calcWidth;
	    imgArr[i].h = calcHeight;
	   // console.log(imgArr[i].likes);
	  //  console.log(i + ':  w: ' + imgArr[i].w + ' h: ' + imgArr[i].h);
	}
}

setSizes(tempImgs);

var filledImgs = [];
var bounds;

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

	function getPosition (imgObj, start, callback) {

			var x = xCenter;
			var y = yCenter;
			//console.log(x, y);
			var dy = $(canvas).height()/80/*(imgObj.h/8)*/;
			var dx = dy*(ratio);
			ratio = ratio/1.01
			var counter = 1;
			var horizontal = true;
			var reverse;
			for (var i = start; i < (start + 320); i++) {		
				//console.log('before', x, y)
				//console.log(i % 4);
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
						x = x-shiftX;
					} else {
						ctx.beginPath();
						ctx.moveTo(x, y);
						ctx.lineTo(x,y-shiftY);
						y = y-shiftY;
					}
					//console.log('after', x, y)
					//ctx.stroke();
					intervals--;

					//{x, y, w, h}
					var potentialImg = {'x': x - imgObj.w/2,
										'y': y - imgObj.h/2,
										'w': imgObj.w,
										'h': imgObj.h};
					
					var doesCollide = checkCollision(potentialImg, bounds);
							if (!doesCollide) {
						//console.log('Image fits at: (x, y) (' + potentialImg.x + ',' + potentialImg.y + ').');
						filledImgs.push(potentialImg);
						//console.log(filledImgs);
						imgObj.top = potentialImg.y;
						imgObj.left = potentialImg.x;
						//console.log(imgObj);
						callback(imgObj);
						return;
					};
					}
			}
		}

//function start		
var viewPort = {}; 
viewPort.w = window.innerWidth;
viewPort.h = window.innerHeight;
var canvas = document.getElementById('cloud');
var ctx = canvas.getContext('2d');
ctx.canvas.height = viewPort.h;
ctx.canvas.width = viewPort.w;
var topOffset = $(canvas).position().top; 
var leftOffset = $(canvas).position().left;
var xCenter =($(canvas).width()/2);
var yCenter =($(canvas).height()/2);
var ratio = ($(canvas).width()/$(canvas).height())*1.2;
var	bounds = {
			'x': leftOffset + overlap,
			'y': topOffset + overlap,
			'w': leftOffset + $(canvas).width() - overlap,
			'h': topOffset + $(canvas).height() - overlap
}
//console.log(ctx);

tempImgs[0].top = viewPort.h/2 - (tempImgs[0].h/2);
tempImgs[0].left = viewPort.w/2 - (tempImgs[0].w/2);
filledImgs.push({   'x': tempImgs[0].left,
								'y': tempImgs[0].top,
								'w': tempImgs[0].w,
								'h': tempImgs[0].h})
tempImgs[1].top = viewPort.h/2 - (tempImgs[1].h/2);
tempImgs[1].left = tempImgs[0].left + tempImgs[0].w - 15;
filledImgs.push({   'x': tempImgs[1].left,
								'y': tempImgs[1].top,
								'w': tempImgs[1].w,
								'h': tempImgs[1].h})
tempImgs[2].top = viewPort.h/2 - (tempImgs[2].h/2);
tempImgs[2].left = tempImgs[0].left + 15 - tempImgs[2].w;
filledImgs.push({   'x': tempImgs[2].left,
								'y': tempImgs[2].top,
								'w': tempImgs[2].w,
								'h': tempImgs[2].h})
/*console.log(tempImgs[0])
console.log(tempImgs[1])
console.log(tempImgs[2])*/

for (var i = 3; i < tempImgs.length; i++) {
			//attach position info to imgs
			getPosition(tempImgs[i], i, function(imgObjWithPosition) {
				tempImgs[i] = imgObjWithPosition;
			});
		}


/*var testArr = [];

for (var i = 0; i < 3; i++ ) {
	testArr.push(tempImgs[i]);
}
return testArr;*/
return tempImgs;
} //end imageCloud function

//imageCloud();



}