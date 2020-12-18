class MailConfirm {
    constructor(client) {
        this.client = client;
    }

    html() {
        return `<html>
                <head></head>
                <body>
                    <h2>Caro, <strong>${this.client.name}</strong></h2>
                    <p>Para receber informações sobre suas consultas por e-mail, é necessário confirmá-lo.</p>
                    <p>Clique <a href="http://localhost:5000/clients/mail-validate/${this.client.id}?m=${this.client.mail}&t=${this.client.token}">aqui</a> para confirmar o seu e-mail.</p>
                    <p>Obrigado!</p>
                </body>
                </html>`;
    }
}

export default MailConfirm;