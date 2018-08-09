const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');
const config = require('./config');

const userRouter = express.Router(); // eslint-disable-line new-cap

const connectToDB = async () => {
	// Very very short form for checking if username and password are specified
	// and conneting to the database
	await mongoose.connect(`mongodb://${config.dbUser && config.dbPass ? `${config.dbUser}:${config.dbPass}@` : ``}${config.dbUrl}/${config.dbName}`, {
		useNewUrlParser: true
	});

	// Dont forget to close the connection every time you open it
	// !!! AVOID STUPID BUGS !!!
};

userRouter.use(bodyParser.json());

userRouter.get('/', async (req, res, next) => {
	try {
		const {username} = req.query;
		await connectToDB();

		const qObj = {};
		username ? qObj.username = username : null; // eslint-disable-line no-unused-expressions

		const result = await User.find(qObj);

		mongoose.disconnect();

		res.send(result);
		next();
	} catch (e) {
		next(e);
	}
});

userRouter.post('/', async (req, res, next) => {
	try {
		const {userData} = req.body;

		await connectToDB();

		const result = await User.create(userData);

		mongoose.disconnect();

		res.send(result);
		next();
	} catch (e) {
		next(e);
	}
});

userRouter.get('/:id', async (req, res, next) => {
	try {
		const {id} = req.params;

		await connectToDB();

		const result = await User.findById(id);

		mongoose.disconnect();

		res.send(result);
		next();
	} catch (e) {
		next(e);
	}
});

userRouter.put('/', async (req, res, next) => {
	try {
		const {updateData, id} = req.body;

		await connectToDB();

		// Change display name in posts and comments if it's being changed
		if (updateData.displayName) {
			await Post.updateMany({'author._posterId': id}, {'author.posterName': updateData.displayName});
			await Comment.updateMany({'author._posterId': id}, {'author.posterName': updateData.displayName});
		}

		const result = await User.findByIdAndUpdate(id, updateData);

		mongoose.disconnect();

		res.send(result);
		next();
	} catch (e) {
		next(e);
	}
});

module.exports = userRouter;
