var Tags = require('./../models/tagModel');
var Mongoose = require('mongoose');
var Q = require('q');


module.exports = {
	create: function(req, res) {
		var tempArr = req.body.title;
    var searchArr = []
    tempArr.forEach(function(item){
    	console.log(item);
    	var newTags = new Tags({title: item});
    	console.log(newTags);
    	newTags.save()
    	searchArr.push(newTags);
    	console.log("im search arr " + searchArr);
		});
		return res.json(searchArr);
	},

	get: function(req, res) {
		Tags.find({}).exec().then(function(tag) {
			return res.status(200).json(tag)
		});
	}
}