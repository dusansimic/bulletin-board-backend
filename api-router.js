const express = require('express');
const userRouter = require('./user-router');
const postsRouter = require('./posts-router');
const commentsRouter = require('./comments-router');

const apiRouter = express.Router(); // eslint-disable-line new-cap

apiRouter.get('/', async (_req, res, next) => {
	res.send('Api up and running!');
	next();
});

apiRouter.use('/user', userRouter);
apiRouter.use('/posts', postsRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;
