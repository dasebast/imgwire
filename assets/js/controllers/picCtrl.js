var Pics = require('./../models/picModel');
var User = require('./../models/userModel');
var Mongoose = require('mongoose');

module.exports = {
	create: function(req, res) {
		var newPics = new Pics(req.body);
		newPics.save(function(err, response) {
			if(err) {
				return res.status(500).end();
			}
			return res.json(response);
		
		});
	},

	get: function(req, res) {
        Pics.find({}).populate('tags').populate('owner').exec().then(function(pic) {
        	pic.forEach(function(picObj) {
        		console.log(picObj);
        		for(var i = 0; i < picObj.tags.length; i++) {
        			if (picObj.tags[i].title.indexOf('football') !== -1){
        				// console.log(picObj);
        			}
        		}
        	})
            return res.status(200).json(pic)
        });
    }

  	// get: function(req, res) {
   //      Pics.findOne({title:'dogs are cool'}).populate('tags').exec().then(function(pic) {
   //      	console.log(pic)
   //          return res.status(200).json(pic)
   //      });
   //  }
}



// db.pics.find( { "tags": { "$in": [ObjectId("54f5f7ee2bb94a9c18034bd1")]}} ) 

// db.pics.find( { "tags": { "$in": [ObjectId("54f5f7ee2bb94a9c18034bd1"), ObjectId("54f5f8042bb94a9c18034bd2")]}} ) 

// db.pics.find({ "$and": [
//     {"tags": ObjectId("54f5f7ee2bb94a9c18034bd1")},
//     {"tags": ObjectId("54f5f8042bb94a9c18034bd2")},
//     {"tags": {"$size": 2}}
// ]}) 

// db.pics.find({ "$and": [
//     {"tags": ObjectId("54f5f7ee2bb94a9c18034bd1")},
//     {"tags": ObjectId("54f634a8456a5f54296fc218")},
//     {"tags": ObjectId("54f63464456a5f54296fc215")},
//     {"tags": ObjectId("54f6347e456a5f54296fc216")},
//     {"tags": {"$size": 4}}
// ]}) 

