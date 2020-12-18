import Procedure from "../models/entities/Procedure";

class ProcedureController {
	async store(req, res) {
		// Recentemente (07/12/2020) a equipe do express-validator adicionou um sanatizer replace(), mas aparentemente está bugado
		req.body.price = parseFloat(req.body.price.replace(/\./g, '').replace(',', '.'));

		const procedure = await Procedure.create(req.body);
		return res.json(procedure)
	}
	async index(req, res) {
		const procedures = await Procedure.findAll({
			attributes: [
				'id', 'name', 'is_dental', 'price'
			]
		});
		return res.json(procedures)
	}
	async update(req, res) {
		let procedure = await Procedure.findByPk(req.params.id)
		procedure = await procedure.update(req.body)
		return res.json(procedure)
	}
	async delete(req, res) {
		let procedure = await Procedure.findByPk(req.params.id)
		procedure = await procedure.destroy(req.body)
		return res.json(procedure)
	}
	async show(req, res) {
		let procedure = await Procedure.findByPk(req.params.id, {
			attributes: [
				'id', 'name', 'is_dental', 'price'
			]
		})
		return res.json(procedure)
	}
}

export default new ProcedureController();