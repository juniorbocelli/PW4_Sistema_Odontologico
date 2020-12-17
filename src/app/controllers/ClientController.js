import Client from "../models/entities/Client";

import Mailer from '../libs/mailer/Mailer';
import MailConfirm from '../libs/mailer/models/MailConfirm';
import mailerConfig from "../../config/mailer";

import bcrypt from 'bcryptjs';
import bcryptConfig from '../../config/bcrypt';

class ClientController {
	async store(req, res) {
		// Cria o token para confirmação de e-mail
		const seed = new Date().toISOString();
		const hash = bcrypt.hashSync(seed, bcryptConfig.saltRounds);
		req.body.token = hash;

		const client = await Client.create(req.body);


		// Faz envio de e-mail para confirmação
		let myHtmlMail = new MailConfirm(client).html();
		let my_mailer = new Mailer(`"Escritório Odontológico" <${mailerConfig.auth.user}>`, [`${client.mail}`], 'Confime seu E-mail', null, myHtmlMail);
		my_mailer.send();

		return res.json(client);
	}
	async index(req, res) {
		const clients = await Client.findAll({
			attributes: [
				'id', 'cpf', 'name', 'gender', 'birth_date', 'mail', 'phone', 'cell', 'is_validated_mail', 'token'
			]
		});
		return res.json(clients)
	}
	async update(req, res) {
		let client = await Client.findByPk(req.params.id);

		// Verifica se houve mudança no e-mail para gerar token
		if(req.body.mail !== client.mail) {
			// Cria o token para confirmação de e-mail
			const seed = new Date().toISOString();
			const hash = bcrypt.hashSync(seed, bcryptConfig.saltRounds);
			req.body.token = hash;
			req.body.is_validated_mail = false;

			// Faz envio de e-mail para confirmação
			myHtmlMail = new MailConfirm(client).html();
			let my_mailer = new Mailer(`"Escritório Odontológico" <${mailerConfig.auth.user}>`, [`${client.mail}`], 'Confime seu E-mail', htmlModel = myHtmlMail);
			my_mailer.send();
		}
		client = await client.update(req.body)
		return res.json(client);
	}
	async delete(req, res) {
		let client = await Client.findByPk(req.params.id)
		cleint = await cleint.destroy(req.body)
		return res.json(client);
	}
	async show(req, res) {
		let client = await Client.findByPk(req.params.id, {
			attributes: [
				'id', 'cpf', 'name', 'gender', 'birth_date', 'mail', 'phone', 'cell', 'is_validated_mail', 'token'
			]
		})
		return res.json(client);
	}
}

export default new ClientController();