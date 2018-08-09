const mongoose = require('mongoose');

const {ObjectId} = mongoose.SchemaTypes;

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	author: {
		_posterId: {
			type: ObjectId,
			required: true
		},
		posterName: {
			type: String,
			required: true
		}
	},
	postTime: {
		type: Date,
		required: true,
		default: Date.now()
	},
	tags: {
		type: [String],
		required: false
	}
}, {
	collection: 'posts'
});

module.exports = mongoose.model('Post', PostSchema);
