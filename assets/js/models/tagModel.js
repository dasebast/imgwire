var Mongoose = require('mongoose');

var tagSchema = Mongoose.Schema({
	title: {type: String},
	tagUseage: {type: Number},
	createdAt: {type: Date, default: Date.now}
	

});

module.exports = Mongoose.model('Tags', tagSchema);

// how to handle tags
// best way to organize models to incorporate our tags.


	// activity: [
	// 		Political: {type: Boolean, default: false},
	// 		Music: {type: Boolean, default: false},
	// 		Sports: {type: Boolean, default: false},
	// 		Disasters: {type: Boolean, default: false},
	// 		Celebration: {type: Boolean, default: false},
	// ]



