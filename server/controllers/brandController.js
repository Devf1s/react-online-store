const { Brand } = require('../models');
const ApiError = require('../error/ApiError');

class BrandController {
	async create(req, res) {
		try {
			const { name } = req.body;
			const brand = await Brand.create({ name });
			return res.json(brand);
		} catch (e) {
			console.log(e);
		}
	}

	async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Brand.destroy({ where: { id } });
            if (!deleted) {
                return next(ApiError.badRequest('Brand not found'));
            }
            return res.json({ message: 'Brand deleted successfully!' });
        } catch (e) {
            console.log(e);
            return next(ApiError.internal('Internal server error'));
        }
    }

	async getAll(req, res) {
		try {
			const brands = await Brand.findAll(); 
			return res.json(brands);
		} catch (e) {
			console.log(e);
		}
	}
}
module.exports = new BrandController();