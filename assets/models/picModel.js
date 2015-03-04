var Mongoose = require('mongoose');
var User = require('./userModel');
var Tags = require('./tagModel');

var picSchema = Mongoose.Schema({
	title: {type: String, required: true},
	image: {type: String, required: true},
	description: {type: String},
	dateUploaded: {type: Date, default: Date.now},
	active: {type: Boolean, default: true},
	owner: {type: Mongoose.Schema.Types.ObjectId, ref: 'Users'},
	tags: [{type: Mongoose.Schema.Types.ObjectId, ref: 'Tags'}]

});

module.exports = Mongoose.model('Pics', picSchema);

// add view count
// add rating
// add upvotes
// add source
