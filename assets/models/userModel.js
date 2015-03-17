var Mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var q = require('q');

var userSchema = Mongoose.Schema({
	email: {type: String, required: true},
	password: {type: String, required: true},
	username: {type: String, required: true},
	firstname: {type: String},
	lastname: {type: String},
	bio: {type: String, maxlength: 140},
	avatar: {type: String}

});

userSchema.pre('save', function(next) {
	var user = this;

	if(!user.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(12, function(err, salt) {
		if(err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			user.password = hash;
			return next();
		});
	});
});
userSchema.methods.comparePassword = function(pass) {
	console.log(pass)
	var dfd = q.defer();
	
	bcrypt.compare(pass, this.password, function(err, result) {
		if(err) {
			dfd.reject(err)
			console.log('panniccc', err);
		}
		else {
			dfd.resolve(result)
		}
	});
	return dfd.promise
};
module.exports = Mongoose.model('User', userSchema);