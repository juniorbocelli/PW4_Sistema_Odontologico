import Tooth from "../models/entities/Tooth";

class ToothController {
	async store(req, res) {
		const tooth = await Tooth.create(req.body);
		return res.json(tooth)
	}
	async index(req, res) {
		const teeth = await Tooth.findAll({
			attributes: [
				'code', 'name'
			]
		});
		return res.json(teeth)
	}
	async update(req, res) {
		let tooth = await Tooth.findByPk(req.params.code)
		tooth = await tooth.update(req.body)
		return res.json(tooth)
	}
	async delete(req, res) {
		let tooth = await Tooth.findByPk(req.params.code)
		tooth = await tooth.destroy(req.body)
		return res.json(tooth)
	}
	async show(req, res) {
		let tooth = await Tooth.findByPk(req.params.code, {
			attributes: [
				'code', 'name'
			]
		})
		return res.json(tooth)
	}
}

export default new ToothController();