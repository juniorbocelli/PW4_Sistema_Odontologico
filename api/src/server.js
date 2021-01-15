import app from './app';
import * as cron from 'node-cron';
import { Op } from 'sequelize';

import Mailer from './app/libs/mailer/Mailer';
import ConsultationConfirm from './app/libs/mailer/models/ConsultationConfirm';
import mailerConfig from "./config/mailer";

import Consultation from './app/models/entities/Consultation';
import Client from './app/models/entities/Client';

// Adiciona os crons
cron.schedule('0 0 * * *', async function() {
    console.log('Todos os dias às 00:00 o sistema enviará lembretes para quem tem consulta no dia.');

    // Pega a data atual e soma 24 horas (1 dia)
    let date = new Date();
    date.setDate(date.getDate() + 1);

    let consultationsList = await Consultation.findAll({
        where: {
            time: {
                [Op.and]: {
                    [Op.lt]: date,
                    [Op.gt]: new Date()
                }
            }
        }
    });

    consultationsList.forEach(async (consultation) => {
        const client = await Client.findByPk(consultation.client_id);

		// Faz envio de e-mail para confirmação
		let myHtmlMail = new ConsultationConfirm(consultation, client).html();
		let my_mailer = new Mailer(`"Escritório Odontológico" <${mailerConfig.auth.user}>`, [`${client.mail}`], 'Confime sua presença', null, myHtmlMail);
		my_mailer.send();
    });
});

cron.schedule('*/5 * * * *', async function() {
    console.log('De 5 em 5 minutos o sistema verifica consultas que acontecerão a 2 horas e notifica o paciente.');

    // Pega a data atual e soma 24 horas (1 dia)
    let date = new Date();
    date.setHours(date.getHours() + 2);

    let consultationsList = await Consultation.findAll({
        where: {
            time: {
                [Op.and]: {
                    [Op.lt]: date,
                    [Op.gt]: new Date()
                }
            },
            is_remember: false
        }
    });

    consultationsList.forEach(async (consultation) => {
        const client = await Client.findByPk(consultation.client_id);

		// Faz envio de e-mail para confirmação
		let my_mailer = new Mailer(`"Escritório Odontológico" <${mailerConfig.auth.user}>`, [`${client.mail}`], 'Não se esqueça do consulta', `Não se esqueça da sua consulta ${consultation.time.toString()}`, null);
        my_mailer.send();
        
        consultation.is_remember = true;
        await consultation.save();
    });
});

// Inicializa o servidor
app.listen(5000, function(){
    console.log("Rodando na porta 5000!");
})