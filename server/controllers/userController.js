const ApiError = require('../error/ApiError');
const { User, Basket } = require('../models');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // JSON Web Token for transmission to client
const { validationResult } = require('express-validator');

const jwtTokenErrorMessage = 'SECRET_KEY is not defined in the .env!';

const generateJwt = (id, email, role, next) => {
	if (!process.env.SECRET_KEY) {
		return next(ApiError.badRequest(jwtTokenErrorMessage));
	}

	return jwt.sign(
		{ id, email, role },
		process.env.SECRET_KEY,
		{ expiresIn: '24h' }
	);
}

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const errorMessages = errors.errors.map(error => error.msg);
				return next(ApiError.badRequest(errorMessages));
			}

			const { email, password, role } = req.body;
			if (!email || !password) {
				return next(ApiError.badRequest('Uncorrect email or password!'));
			}
			
			const candidate = await User.findOne({ where: { email } });
			if (candidate) {
				return next(ApiError.duplicate('User with such email already exists!'));
			}
			
			const hashPassword = bcrypt.hashSync(password, 7);
			const user = await User.create({ email, password: hashPassword, role });
			const basket = await Basket.create({ userId: user.id });
			const token = generateJwt(user.id, user.email, user.role);
			return res.json({ token });
		} catch (e) {
			console.log(e);
			return next(ApiError.badRequest('Registration error'));
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ where: { email } });
			if (!user) {
				return next(ApiError.internal('User not found'));
			}
			
			let comparePassword = bcrypt.compareSync(password, user.password);
			if (!comparePassword) {
				return next(ApiError.badRequest('Incorrect password'));
			}
			
			const token = generateJwt(user.id, user.email, user.role);
			return res.json({ token });
		} catch (e) {
			console.log(e);
			return next(ApiError.badRequest('Login error'));
		}
	}

	async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await User.destroy({ where: { id } });
            if (!deleted) {
                return next(ApiError.badRequest('User not found'));
            }
            return res.json({ message: 'User deleted successfully!' });
        } catch (e) {
            console.log(e);
            return next(ApiError.internal('Internal server error'));
        }
    }

	async getUsers(req, res) {
		try {
			const users = await User.findAll();
			res.json(users);
		} catch (e) {
			console.log(e);
		}
	}

	async check(req, res) {
		try {
			const { id, email, role } = req.user;
			const token = generateJwt(id, email, role);
			return res.json({ token });
		} catch (e) {
			console.log(e);
		}
	}
}
module.exports = new UserController();