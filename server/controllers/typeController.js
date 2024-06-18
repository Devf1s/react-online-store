const { Type } = require('../models');
const ApiError = require('../error/ApiError');

class TypeController {
	async create(req, res) {
		try {
			const { name } = req.body;
			const type = await Type.create({ name });
			return res.json(type);
		} catch (e) {
			console.log(e);
		}
	}

	async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Type.destroy({ where: { id } });
            if (!deleted) {
                return next(ApiError.badRequest('Type not found'));
            }
            return res.json({ message: 'Type deleted successfully!' });
        } catch (e) {
            console.log(e);
            return next(ApiError.internal('Internal server error'));
        }
    }

	async getAll(req, res) {
		try {
			const types = await Type.findAll(); 
			return res.json(types);
		} catch (e) {
			console.log(e);
		}
	}
}
module.exports = new TypeController();