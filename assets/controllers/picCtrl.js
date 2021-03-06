var Pics = require('./../models/picModel');
var User = require('./../models/userModel');
var Tags = require('./../models/tagModel');
var Mongoose = require('mongoose');

module.exports = {
	create: function(req, res) {
        console.log(req.body)
		var newPics = new Pics(req.body);
		newPics.save(function(err, response) {
			if(err) {
				return res.status(500).end();
			}
			return res.json(response);
		
		});
	},

    searchByTags: function(req, res) {
    var tempArr = req.body.tags
    var searchArr = []
    console.log(tempArr)

        Tags.find({"title": { "$in": tempArr}}) //all the tags from the input array
            .select("_id")
            .exec()
            .then(function(allTheTags) {
                console.log('im in the picCtrl' + allTheTags)
                Pics.find({ "tags": { "$all": allTheTags}})
                .select('_id image upvotes tags')
                .populate('tags')
                .sort('-upvotes')
                .limit(50)
                .exec()
                .then(function(results) {
                    res.status(200).json(results)
                    })
            })


    },
    searchSingleTag: function(req, res) {
        console.log(req.body)
        Pics.find({ "tags": { "$all": [ req.body._id]}})
            .select('_id image upvotes tags owner')
            .populate('tags owner')
            .sort('-upvotes')
            .limit(50)
            .exec()
            .then(function(results) {
                console.log(results)
                res.status(200).json(results)
            })
    },

    upvotePic: function(req, res){
        Pics.update(
            { _id: req.body._id},
            { $inc: { upvotes: 1}}
        )
        .exec()
        .then(function(response){
            console.log(req.body);
            Pics.findOne({ "_id": req.body._id})
            .select("upvotes")
            .exec()
            .then(function(result){
                res.status(200).json(result);
            })
        })
    },

    downvotePic: function(req, res){
        Pics.update(
            { _id: req.body._id},
            { $inc: { upvotes: -1}}
        )
        .exec()
        .then(function(response){
            console.log(req.body);
            Pics.find({ "_id": req.body._id})
            .select("upvotes")
            .exec()
            .then(function(result){
                res.status(200).json(result);
            })
        })

    }


}
//     get2: function(req, res) {
//         console.log(req.body)
//         Pics.find()
//         .select('_id imageUrl upvotes tags')
//         .populate('tags', null, req.body, {limit:50})
//         .sort('-upvotes')
//         .exec()
//         .then(function(pics) {
//             console.log('im in the get2 function')
//             res.status(200).json(pics)
//         })
//     }

// }
    // get: function(req, res) {
    //     Pics.find({})
    //         .select('_id imageUrl upvotes tags')
    //         .populate('tags')
    //         .exec()
    //         .then(function(pics) {
    //         res.status(200).json(pics)
    //     });
    // },

// get: function(req, res) {
//         Pics.find({}).populate('tags', null, {title: {$all: ['football','basketball']}}).exec().then(function(queryResults) {
            
//             if (err) {
//                 return res.status(500).json(err);
//             }
//             else if (queryResults) {
//                 queryResults = queryRes.filter(function(queryResult) {
//                     console.log('is this working?')
//                     return queryResult.tags.length;

//                 })
                
//             }


//              console.log(queryRes);
//         });
//              console.log("it worked");
//             return res.status(200).json("mongooooooose");
//             }

    // get: function(req, res) {
 //        Pics.find({}).populate('tags').populate('owner').where('tags.title').all(['football']).exec().then(function(pic) {
 //         console.log(pic);
 //         return res.status(200).json("mongooooooose");
 //        });
 //    }

    // get: function(req, res) {
     //    Pics.find({}).populate('tags').populate('owner').exec().then(function(pic) {
     //     var query = pic;
     //     // console.log(pic);
     //     query.where('tags').all(['football']);
     //     console.log("it worked");
     //     return res.status(200).json("mongooooooose");
        //     });
        // }

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