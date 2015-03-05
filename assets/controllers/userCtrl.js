var User = require('./../models/userModel');
var Mongoose = require('mongoose');

module.exports = {
	create: function(req, res) {
		console.log(req)
		var newUser = new User(req.body);
		newUser.save(function(err, response) {
			console.log(response)
			if(err) {
				return res.status(500).end();
			}
			return res.json(response);
		
		});
	},

	get: function(req, res) {
		Users.find({}).exec().then(function(users) {
			return res.status(200).json(users)
		});
	}
}