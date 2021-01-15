import nodemailer from 'nodemailer' ;
import mailerConfig from '../../../config/mailer';

class Mailer {
    constructor(from, to, subject, textMessage = null, htmlModel = null) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.textMessage = textMessage;
        this.htmlModel = htmlModel;

        this.transporter = this.transport();
    }

    transport() {
        return nodemailer.createTransport(mailerConfig);
    }

    async send() {
        let info = await this.transporter.sendMail({
            from: this.from, // sender address
            to: this.to, // list of receivers
            subject: this.subject, // Subject line
            text: this.textMessage, // plain text body
            html: this.htmlModel, // html body
        }, (error)=>{
            if(error) console.error(error);
            else console.log('E-mail enviado com sucesso');
        });

        return info;
    }
}

export default Mailer;