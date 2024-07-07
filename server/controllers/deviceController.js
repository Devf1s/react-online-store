const { Device, DeviceInfo } = require('../models');
const ApiError = require('../error/ApiError');

const uuid = require('uuid'); // unique name for img
const path = require('path'); // nodejs module

class DeviceController {
	async create(req, res, next) {
		try {
			let { name, price, typeId, brandId, info } = req.body;
			const { img } = req.files;

			let fileName = uuid.v4() + ".jpg";
			img.mv(path.resolve(__dirname, '..', 'static', fileName));
			const device = await Device.create({ name, price, typeId, brandId, img: fileName });
			console.log(device);
			if (info) {
				info = JSON.parse(info);
				info.forEach(el => {
					DeviceInfo.create({
						title: el.title,
						description: el.description,
						deviceId: device.id
					});
				});
			}
			return res.json(device);
		} catch (e) {
			console.log(e);
			next(ApiError.badRequest(e.message));
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params;
			const deleted = await Device.destroy({ where: { id } });
			if (!deleted) {
				return next(ApiError.badRequest('Device not found'));
			}
			return res.json({ message: 'Device deleted successfully!' });
		} catch (e) {
			console.log(e);
			return next(ApiError.internal('Internal server error'));
		}
	}

	async getAll(req, res) {
		try {
			let { typeId, brandId, page, limit } = req.query;

			page = page || 1; // default value 
			limit = limit || 9; // default value 
			let offset = page * limit - limit;

			const queryParams = {
				...(typeId && { typeId }),
				...(brandId && { brandId })
			}; // object with request params

			const devices = await Device.findAndCountAll({
				where: queryParams,
				offset,
				limit
			}); // return all events from db

			return res.json(devices);
		} catch (e) {
			console.log(e);
		}
	}

	async getOne(req, res) {
		try {
			const { id } = req.params;
			const device = await Device.findOne({
				where: { id },
				include: [{ model: DeviceInfo, as: 'info' }]
			});
			return res.json(device);
		} catch (e) {
			console.log(e);
		}
	}
}
module.exports = new DeviceController();