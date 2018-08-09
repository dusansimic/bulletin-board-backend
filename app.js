const http = require('http');
const express = require('express');
const cors = require('cors');
const api = require('./api-router');
const {handler} = require('./handler');

const app = express();
const server = http.createServer(app);

if (!(process.env.IS_PROD === true)) {
	const morgan = require('morgan');
	app.use(morgan('dev'));
}
app.use(cors());
app.use('/api', api);
app.use(handler);

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', err => {
	if (err) {
		throw err;
	}
	console.log(`Listening on port ${PORT}`);
});
