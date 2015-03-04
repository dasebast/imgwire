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

	// get: function(req, res) {
 //        Pics.find({}).populate('tags').populate('owner').where('tags.title').all(['football']).exec().then(function(pic) {
 //        	console.log(pic);
 //        	return res.status(200).json("mongooooooose");
 //        });
 //    }

    	get: function(req, res) {
        Pics.find({}).populate('tags', null, {title: {$all: ['football','basketball']}}).exec().then(function(queryResults) {
        	
        	if (err) {
        		return res.status(500).json(err);
        	}
        	else if (queryResults) {
        		queryResults = queryRes.filter(function(queryResult) {
        			console.log('is this working?')
        			return queryResult.tags.length;

        		})
        		
        	}


        	// console.log(queryRes);
        });
        	// console.log("it worked");
        	return res.status(200).json("mongooooooose");
    	    }
	    

    	// get: function(req, res) {
     //    Pics.find({}).populate('tags').populate('owner').exec().then(function(pic) {
     //    	var query = pic;
     //    	// console.log(pic);
     //    	query.where('tags').all(['football']);
     //    	console.log("it worked");
     //    	return res.status(200).json("mongooooooose");
    	//     });
	    // }

}


	// get: function(req, res) {
 //        Pics.find({}).populate('tags').populate('owner').exec().then(function(pic) {
 //        	pic.forEach(function(picObj) {
 //        		console.log(picObj);
 //        		for(var i = 0; i < picObj.tags.length; i++) {
 //        			if (picObj.tags[i].title.indexOf('football') !== -1){
 //        				// console.log(picObj);
 //        			}
 //        		}
 //        	})
 //            return res.status(200).json(pic)
 //        });
 //    }

  	// get: function(req, res) {
   //      Pics.findOne({title:'dogs are cool'}).populate('tags').exec().then(function(pic) {
   //      	console.log(pic)
   //          return res.status(200).json(pic)
   //      });
   //  }



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


// ======   Mongo queries that work
// single
// db.pics.find({ "tags": { "$all": [ ObjectId("54f5f7ee2bb94a9c18034bd1") ]}})
// multi
// db.pics.find({ "tags": { "$all": [ ObjectId("54f5f7ee2bb94a9c18034bd1"), ObjectId("54f5f8042bb94a9c18034bd2") ]}})

//====================

//mongoose
// query.where('tags').all(['ObjectId("54f5f7ee2bb94a9c18034bd1")', 'ObjectId("54f5f8042bb94a9c18034bd2")']) 