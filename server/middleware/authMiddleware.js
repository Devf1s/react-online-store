const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS') {
		next(); // let's skip it so be it
	}

	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			return next(ApiError.badRequest('JWT Token doesn not exist'));
		}
		
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decoded; 
		next();
	} catch (e) {
		return next(ApiError.unauthorized('User is not authorized'));
	}
}