// ============================ REQUIRE ===============================
var Express = require('express');
var BodyParser = require('body-parser');
var Mongoose = require('mongoose');
var Cloudinary = require('cloudinary');
var Passport = require('passport')
var Session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var imgs = require('./imgs/imgs.js');

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

App.use(Session({
	secret: '12345imgwire',
	resave: true,
	saveUninitialized: true
}));

App.use(Passport.initialize());
App.use(Passport.session());

Passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(email, password, done) {
	console.log(email, password, done)
	User.findOne({email: email}).exec().then(function(user) {
		console.log(user)
		if(!user) {
			console.log("!user");
			return done(null, false);
		} 
		user.comparePassword(password).then(function(isMatch) {
			console.log("!match");

			if(!isMatch) {
				return done(null, false);
			}
			return done (null, user);
		});
	});
}));

Passport.serializeUser(function(user, done) {
	//input user model (mongoose)
	console.log(user)
	done(null, user);
});

Passport.deserializeUser(function(obj, done) {
	//user object (json)
	console.log(obj._id)
	done(null, obj);
});





var isAuthed = function(req, res, next) {
	if(!req.isAuthenticated()) {

		console.log(req.user + "this is the req.user is auth");
		return res.status(401).end();
	}
	return next();
}


// ============================ ENDPOINTS =============================
App.post('/api/tags', TagsController.create);
App.get('/api/tags', TagsController.get);

App.post('/api/user', UserController.create);
App.get('/api/user', UserController.get);
App.get('/api/userPics', isAuthed, UserController.getUserPics)

App.post('/api/pic', PicController.create);

App.get('/api/pic', function(req, res) {
	res.status(200).json(imgs);
});
App.post('/api/searchTagPictures', PicController.searchByTags);
App.post('/api/searchSingleTag', PicController.searchSingleTag);

App.get("/api/profile", isAuthed, UserController.profile);
App.post('/api/auth', Passport.authenticate('local'), function(req, res) {
	console.log('im in the server')
	return res.status(200).redirect('/#/dashboard');
});
App.get('/api/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



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