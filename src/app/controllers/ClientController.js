import Client from "../models/entities/Client";

import Mailer from '../libs/mailer/Mailer';
import mailer from "../../config/mailer";

class ClientController {
  async store(req, res) {
    const client = await Client.create(req.body);
    my_mailer = new Mailer('"Bocelli" <juniorbocelli@aol.com.br>', ['<juniorbocelli@gmail.com>'], 'Teste', 'Mensagem de testes');
    mailer.send();
    return res.json(client);
  }
  async index(req, res) {
    const clients = await Client.findAll({
        attributes: [
            'id','cpf', 'name', 'gender', 'birth_date', 'mail', 'phone', 'cell', 'is_validated_mail'
        ]
    });
    return res.json(clients)
  }
  async update(req, res) {
    let client = await Client.findByPk(req.params.id)
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
            'id','cpf', 'name', 'gender', 'birth_date', 'mail', 'phone', 'cell', 'is_validated_mail'
        ]
    })
    return res.json(client);
  }

  async sendConfirmationEmail(req, res) {
    let my_mailer = new Mailer('"Bocelli" <bocelli@zohomail.com>', ['juniorbocelli@gmail.com'], 'Teste', 'Mensagem de testes');
    my_mailer.send();
    return res.json(req.body);
  }
}

export default new ClientController();