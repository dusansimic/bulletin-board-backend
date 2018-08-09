const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Comment = require('./models/comment');
const config = require('./config');

const commentsRouter = express.Router(); // eslint-disable-line new-cap

const connectToDB = async () => {
	// Very very short form for checking if username and password are specified
	// and conneting to the database
	await mongoose.connect(`mongodb://${config.dbUser && config.dbPass ? `${config.dbUser}:${config.dbPass}@` : ``}${config.dbUrl}/${config.dbName}`, {
		useNewUrlParser: true
	});

	// Dont forget to close the connection every time you open it
	// !!! AVOID STUPID BUGS !!!
};

commentsRouter.use(bodyParser.json());

commentsRouter.get('/', async (_req, res, next) => {
	try {
		await connectToDB();

		const result = await Comment.find({});

		mongoose.disconnect();

		res.send(result);
		next();
	} catch (e) {
		next(e);
	}
});

commentsRouter.post('/', async (req, res, next) => {
	try {
		const {commentData} = req.body;

		await connectToDB();

		const results = Comment.create(commentData);

		mongoose.disconnect();

		res.send(results);
		next();
	} catch (e) {
		next(e);
	}
});

commentsRouter.get('/:id', async (req, res, next) => {
	try {
		const {id} = req.params;

		await connectToDB();

		const results = await Comment.findById(id);

		mongoose.disconnect();

		res.send(results);
		next();
	} catch (e) {
		next(e);
	}
});

commentsRouter.put('/', async (req, res, next) => {
	try {
		const {updateData, id} = req.body;

		if (updateData.posterName) {
			delete updateData.posterName;
		}
		if (updateData._posterId) {
			delete updateData._posterId;
		}
		if (!updateData) {
			return next(new Error('Sending empty updates not allowed!'));
		}

		await connectToDB();

		const result = await Comment.findByIdAndUpdate(id, updateData);

		await mongoose.disconnect();

		res.send(result);
		next();
	} catch (e) {
		next(e);
	}
});

module.exports = commentsRouter;
