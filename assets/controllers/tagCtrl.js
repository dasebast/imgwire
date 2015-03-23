var Tags = require('./../models/tagModel');
var Mongoose = require('mongoose');
var Q = require('q');


module.exports = {
	create: function(req, res) {
		var tempArr = req.body.title;
    var searchArr = []
    tempArr.forEach(function(item){
			var dfd = Q.defer();
			var newTags = new Tags({title: item});
			searchArr.push(newTags);
			console.log("searcharr " + searchArr);
			console.log("new tags hi" + newTags);
			}).then(function(result){
					console.log(result);
					newTags.save(function(err, response) {
					console.log("im saving" + response);
					if(err) {
						return res.status(500).end();
					}
					return res.json(response);	
			});
    });
	},

	get: function(req, res) {
		Tags.find({}).exec().then(function(tag) {
			return res.status(200).json(tag)
		});
	}
}