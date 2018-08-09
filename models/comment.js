const mongoose = require('mongoose');

const {ObjectId} = mongoose.SchemaTypes;

const CommentSchema = new mongoose.Schema({
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
	commentTime: {
		type: Date,
		required: true,
		default: Date.now()
	},
	_threadId: {
		type: ObjectId,
		required: true
	}
}, {
	collection: 'comments'
});

module.exports = mongoose.model('Comment', CommentSchema);
