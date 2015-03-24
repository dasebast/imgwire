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
	},

	tagQuery: function(arr){
		var tempPushed = [];
			var dfd = Q.defer();
			for (var i = 0; i < arr.length; i++){
				Tags.find({"title": arr[i]})
				.exec()
				.then(function(result){
					// console.log(result);
						tempPushed = tempPushed.concat(result);	
						if(tempPushed.length === arr.length){
							console.log(tempPushed);
							dfd.resolve(tempPushed);	
						}
				})
			}
		return dfd.promise;
	}

}