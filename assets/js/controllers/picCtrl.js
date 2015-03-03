var Pics = require('./../models/picModel');
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
        Pics.find({}).exec().then(function(pic) {
            return res.status(200).json(pic)
        });
    }
}