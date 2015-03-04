var Tags = require('./../models/tagModel');
var Mongoose = require('mongoose');

module.exports = {
	create: function(req, res) {
		var newTags = new Tags(req.body);
		newTags.save(function(err, response) {
			if(err) {
				return res.status(500).end();
			}
			return res.json(response);
		
		});
	},

	get: function(req, res) {
		Tags.find({}).exec().then(function(tag) {
			return res.status(200).json(tag)
		});
	}
}