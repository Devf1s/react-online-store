const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

module.exports = function (role) {
	return function (req, res, next) {
		if (req.method === 'OPTIONS') {
			next(); 
		}
	
		try {
			const token = req.headers.authorization.split(' ')[1];
			if (!token) {
				return next(ApiError.badRequest('JWT Token does not exist')); 
			}
			
			const { role: userRole } = jwt.verify(token, process.env.SECRET_KEY);
			if (role !== userRole) {
				return next(ApiError.forbidden('You does not have access'));
			}
			next();
		} catch (e) {
			console.log(e);
			return next(ApiError.unauthorized('User is not authorized'));
		}
	}
}