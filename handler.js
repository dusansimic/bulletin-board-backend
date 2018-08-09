module.exports = {
	/**
	 * Handle errors in api
	 * @param {Error} err Error object
	 * @param {Object} _req Request object
	 * @param {Object} res Response object
	 * @param {Function} next Callback
	 */
	async handler(err, _req, res, next) {
		if (res.headersSent) {
			return next();
		}
		if (err) {
			res.status(err.status || 500).send({
				error: true,
				message: err.message,
				stack: err.stack
			});
			return next();
		}
		if (res.status(404)) {
			res.send('404');
		}
		next();
	}
};
