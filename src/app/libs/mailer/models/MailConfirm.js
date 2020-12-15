class MailConfirm {
    constructor(user) {
        this.user = user;
    }

    html() {
        return `<html>
                <head></head>
                <body>
                    <h2>Caro, <strong>${this.user.name}</strong></h2>
                    <p>Para receber informações sobre suas consultas por e-mail, é necessário confirmá-lo.</p>
                    <p>Clique <a href="localhost:5000/confirm-email?
                    id=${this.user.id}&m=${this.user.email}&
                    t=${this.user.token}">aqui</a> para confirmar o seu e-mail.</p>
                    <p>Obrigado</p>
                </body>
                </html>`;
    }
}

export default MailConfirm;