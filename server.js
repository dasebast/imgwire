// ============================ REQUIRE ===============================
var Express = require('express');
var BodyParser = require('body-parser');
var Mongoose = require('mongoose');
var Cloudinary = require('cloudinary');
var	Env = require('./env.js');
var Port = 8888;


var App = Express();

var User = require('./assets/models/userModel');
var Tags = require('./assets/models/tagModel');
var Pics = require('./assets/models/picModel');


// ============================ CONFIG ===========================
Cloudinary.config({ 
  cloud_name: Env.cloudinaryName, 
  api_key: Env.cloudinaryApiKey,
  api_secret: Env.cloudinaryApiSecret 
});



// ============================ CONTROLLERS ===========================
var TagsController = require('./assets/controllers/tagCtrl');
var UserController = require('./assets/controllers/userCtrl');
var PicController = require('./assets/controllers/picCtrl');


// ============================ MIDDLEWARE ============================
App.use(Express.static(__dirname + '/app'));
App.use(BodyParser.json());




// ============================ AUTHENTICATION ========================



// ============================ ENDPOINTS =============================
App.post('/api/tags', TagsController.create);
App.get('/api/tags', TagsController.get);

App.post('/api/user', UserController.create);
App.get('/api/user', UserController.get);

App.post('/api/pic', PicController.create);
App.get('/api/pic', PicController.get);



App.post('/api/pictest', function(req, res) {

	// Cloudinary.uploader.upload("./app/img/dog.jpg", function(result) { 
 // 	 console.log(result) 
 // 	 res.status(200).json(result);
	// });

	Cloudinary.uploader.upload("./app/img/dog.jpg", function(result) { 
		console.log(result)
 	 res.status(200).json(result);
	},
 	 {public_id: "test_eager6",
 		
 			effect: "sepia"
 		}

	);
 	 



});






// ============================ CONNECTIONS ===========================
Mongoose.connect('mongodb://localhost:27017/imgwire');

App.listen(Port, function() {
	console.log('listening to ' + Port)
});