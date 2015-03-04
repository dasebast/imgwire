var Tags = require('./../models/tagModel');
var Pics = require('./../models/picModel');
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

	// get: function(req, res) {
	// 	Tags.find({}).exec().then(function(tag) {
	// 		tag.forEach(function(tagObj) {
	// 			Pics.find({}).exec().then(function(picture) {
	// 				picture.forEach(function(picObj) {
	// 					picObj.populate(tags)
						
	// 				})
				
	// 			})
	// 		})
	// 		return res.status(200).json(tag)
	// 	});
	// }

	get: function(req, res) {
		Tags.find({title: 'football'}).exec().then(function(tag) {
			tag.forEach(function(tagObj) {
				console.log(tagObj)
			})
			return res.status(200).json(tag)
		});
	}
}