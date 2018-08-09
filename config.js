module.exports = {
	dbUrl: process.env.DB_URL || 'localhost:27017',
	dbName: process.env.DB_NAME || 'bulletinboard',
	dbUser: process.env.DB_USER,
	dbPass: process.env.DB_PASS
};
