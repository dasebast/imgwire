var Mongoose = require('mongoose');

var userSchema = Mongoose.Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	username: {type: String, required: true, unique: true},
	firstname: {type: String},
	lastname: {type: String},
	bio: {type: String, maxlength: 140},
	avatar: {type: String}

});

module.exports = Mongoose.model('User', userSchema);