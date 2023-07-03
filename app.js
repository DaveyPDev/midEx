
const express = require('express');
const ExpressError = require('./expressError');
const app = express();
const items = require('./items');
// const middleware = require('./middleWare');
const morgan = require('morgan');



app.use(express.json());
// app.use(middleware.logger);
app.use(morgan('dev'));
app.use('/items', items)

app.get('/favicon.ico', (req, res, next) => res.sendStatus(204));

// 404 handler
app.use(function (req, res) {
	return new ExpressError('Not Found', 404);
});

// generic error handler
app.use(function (err, req, res, next) {
	let status = err.status || 500;

	return res.status(status).json({
		error : {
			message : err.message,
			status  : status
		}
	});
});

module.exports = app