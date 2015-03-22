var User = require('./../models/userModel');
var Mongoose = require('mongoose');
var Passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Session = require('express-session');
var Pics = require('./../models/picModel');

Passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(email, password, done) {
	console.log('this is not impaortabnt')
	User.findOne({email: username}).exec().then(function(user) {
		
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

module.exports = {
	create: function(req, res) {
		var newUser = new User(req.body);
		newUser.save(function(err, response) {
			if(err) {
				return res.status(500).end();
			}
			Passport.authenticate('local')(req, res, function() {
				console.log(req.user + "create function");	
				User
					.findOne({'_id': req.user._id})
					.select('_id username email')
					.exec()
					.then(function(user) {
						res.status(200).json(user);
					})
			})
			
		});
	},

	get: function(req, res) {
		Users.find({}).exec().then(function(users) {
			return res.status(200).json(users)
		});
	},

	profile: function(req, res) {
		User.findById(req.user._id)
			.select('_id username email')
			.exec()
			.then(function(results) {
				res.status(200).json(results)
			})
	},

	getUserPics: function(req, res) {
		Pics.find({ "owner": { "$all": [ req.user._id]}})
			.select('_id imageUrl upvotes tags owner')
            .populate('tags owner')
            .sort('-upvotes')
            .limit(50)
            .exec()
            .then(function(results) {
            	console.log(results)
            	res.status(200).json(results)
            })
	}

}