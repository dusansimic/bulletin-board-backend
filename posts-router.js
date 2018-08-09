const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const config = require('./config');

const postsRouter = express.Router(); // eslint-disable-line new-cap

const connectToDB = async () => {
	// Very very short form for checking if username and password are specified
	// and conneting to the database
	await mongoose.connect(`mongodb://${config.dbUser && config.dbPass ? `${config.dbUser}:${config.dbPass}@` : ``}${config.dbUrl}/${config.dbName}`, {
		useNewUrlParser: true
	});

	// Dont forget to close the connection every time you open it
	// !!! AVOID STUPID BUGS !!!
};

postsRouter.use(bodyParser.json());

postsRouter.get('/', async (req, res, next) => {
	try {
		const {tags} = req.query;
		await connectToDB();

		const qObj = {};
		if (tags) {
			qObj.tags = {$all: tags.split(',')};
		}

		const result = await Post.find(qObj);

		mongoose.disconnect();

		res.send(result);
		next();
	} catch (e) {
		next(e);
	}
});

postsRouter.post('/', async (req, res, next) => {
	try {
		const {postData} = req.body;
		postData.tags = postData.tags.split(',');

		await connectToDB();

		const result = await Post.create(postData);

		mongoose.disconnect();

		res.send(result);
		next();
	} catch (e) {
		next(e);
	}
});

postsRouter.get('/:id', async (req, res, next) => {
	try {
		const {id} = req.params;

		await connectToDB();

		const result = await Post.findById(id);

		await mongoose.disconnect();

		res.send(result);
		next();
	} catch (e) {
		next(e);
	}
});

postsRouter.put('/', async (req, res, next) => {
	try {
		const {updateData, id} = req.body;

		await connectToDB();

		const result = await Post.findByIdAndUpdate(id, updateData);

		await mongoose.disconnect();

		res.send(result);
		next();
	} catch (e) {
		next(e);
	}
});

module.exports = postsRouter;
