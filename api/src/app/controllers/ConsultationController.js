import { Op } from 'sequelize';

import Consultation from "../models/entities/Consultation";
import Client from "../models/entities/Client";
import Procedure from "../models/entities/Procedure";
import Tooth from "../models/entities/Tooth";

import bcrypt from 'bcryptjs';
import bcryptConfig from '../../config/bcrypt';

class ConsultationController {
	async store(req, res) {
		// Cria o token para confirmação de e-mail
		const seed = new Date().toISOString();
		const hash = bcrypt.hashSync(seed, bcryptConfig.saltRounds);
		req.body.token = hash;

		// Recentemente (07/12/2020) a equipe do express-validator adicionou um sanatizer replace(), mas aparentemente está bugado
		req.body.value = parseFloat(req.body.value.replace(/\./g, '').replace(',', '.'));

		// Retira o T necessário para o parse de data na validação
		req.body.time = req.body.time.replace('T', ' ');

		const consultation = await Consultation.create(req.body);

		return res.json(consultation)
	}
	async index(req, res) {
		const consultations = await Consultation.findAll({
			attributes: [
				'id', 'time', 'value', 'is_paid', 'is_confirmed', 'is_remember', 'token'
			],
			include: [
				{
					model: Client,
					as: 'client'
				},
				{
					model: Procedure,
					as: 'procedure'
				},
				{
					model: Tooth,
					as: 'tooth'
				}
			]
		});
		return res.json(consultations)
	}
	async update(req, res) {
		// Recentemente (07/12/2020) a equipe do express-validator adicionou um sanatizer replace(), mas aparentemente está bugado
		req.body.value = parseFloat(req.body.value.replace(/\./g, '').replace(',', '.'));

		let consultation = await Consultation.findByPk(req.params.id)
		consultation = await consultation.update(req.body)
		return res.json(consultation)
	}
	async delete(req, res) {
		let consultation = await Consultation.findByPk(req.params.id)
		consultation = await consultation.destroy(req.body)
		return res.json(consultation)
	}
	async show(req, res) {
		let consultation = await Consultation.findByPk(req.params.id, {
			attributes: [
				'id', 'time', 'value', 'is_paid', 'is_confirmed', 'is_remember', 'token'
			],
			include: [
				{
					model: Client,
					as: 'client'
				},
				{
					model: Procedure,
					as: 'procedure'
				},
				{
					model: Tooth,
					as: 'tooth'
				}
			]
		})
		return res.json(consultation)
	}

	// Parte das confirmações por e-mail
	async confirmConsultation(req, res) {
		const id = parseInt(req.params.id);
		const client = parseInt(req.query.c);
		const token = req.query.t;
		const response = req.query.r;

		// Tenta encontrar o usuário
		let consultation = await Consultation.findOne({
			where: {
				id: id,
				client_id: client,
				token: token
			}
		});

		if (consultation != null && response == 's') {
			consultation.is_confirmed = true;
			await consultation.save();

			return res.json({ message: "Sua consulta foi confirmada com sucesso!" });
		} else {
			// TODO: mudar classe e db para sabermos qauis consultas foram canceladas de fato
			return res.json({ message: "Que pena que não poderá comparecer!" });
		}
	}

	async getByday(req, res) {
		let initialDay = new Date(`${req.body.day}T00:00`);
		let finalDay = new Date(`${req.body.day}T23:59`);

		const consultations = await Consultation.findAll({
			attributes: [
				'id', 'time', 'value', 'is_paid', 'is_confirmed', 'is_remember', 'token'
			],
			where: {
				time: {
					[Op.and]: {
						[Op.lt]: finalDay,
						[Op.gt]: initialDay
					}
				}
			},
			include: [
				{
					model: Client,
					as: 'client'
				},
				{
					model: Procedure,
					as: 'procedure'
				},
				{
					model: Tooth,
					as: 'tooth'
				}
			]
		});
		return res.json(consultations)
	}
}

export default new ConsultationController();