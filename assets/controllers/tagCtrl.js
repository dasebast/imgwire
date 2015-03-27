var Tags = require('./../models/tagModel');
var Mongoose = require('mongoose');
var Q = require('q');

module.exports = {
	create: function(req, res) {
		console.log(req.body.title)
	var tempArr = req.body.title
    var searchArr = [];
   var dfd = Q.defer();
    tempArr.forEach(function(item) {
    	Tags.findOne({"title": item})
    		.exec()
    		.then(function(result) {
    			console.log('the results')
    			console.log(result)
    			if(result === null) {
    				console.log('im in the newtags stuff')
    				var newTags = new Tags({title: item});
    				newTags.save()
    				searchArr.push(newTags);
    				console.log(searchArr)
    				
    			}
    			if(result) {
    				console.log('im in the else if')
    				//console.log(result)
    				searchArr.push(result)
    				console.log(searchArr)
    				//dfd.resolve(searchArr)
    			}
    			
    		})
    		//TODO take this timeout OUT
    		setTimeout(function() {dfd.resolve(searchArr)}, 1000)

		})
    	return dfd.promise
		//return res.status(200).json(searchArr)
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