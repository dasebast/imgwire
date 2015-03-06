var User = require('./../models/userModel');
var Mongoose = require('mongoose');
var Passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Session = require('express-session');

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
			res.redirect('/#/dashboard')
		})
			
		});
	},

	get: function(req, res) {
		Users.find({}).exec().then(function(users) {
			return res.status(200).json(users)
		});
	},

	profile: function(req, res) {
		console.log(req.user + 'im in the server profile')
		return res.json(req.user)
	}
}