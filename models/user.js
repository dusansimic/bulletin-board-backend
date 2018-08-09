const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	creationTime: {
		type: Date,
		required: true,
		default: Date.now()
	},
	email: {
		type: String,
		required: true
	},
	displayName: {
		type: String,
		required: true,
		default: function () { // eslint-disable-line object-shorthand
			return this.username;
		}
	},
	bio: {
		type: String,
		required: false
	},
	profileImage: {
		type: Buffer,
		contentType: {
			type: String,
			required: true,
			default: 'image/png'
		},
		required: false
	}
}, {
	collection: 'users'
});

module.exports = mongoose.model('User', UserSchema);
