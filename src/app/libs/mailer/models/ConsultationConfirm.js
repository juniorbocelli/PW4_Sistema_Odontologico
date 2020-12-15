class ConsultationConfirm {
    constructor(user, consultation) {
        this.user = user;
        this.consultation = consultation;
    }

    html() {
        return `<html>
                <head></head>
                <body>
                    <h2>Caro, <strong>${this.user.name}</strong></h2>
                    <p>Confirme sua presença na consulta abaixo:</p>
                    <p>Dia: ${this.consultation.time.toString()}</p>
                    <p><a href="localhost:5000/confirm-consultation?
                    id=${this.consultation.id}&u=${this.user.id}&
                    t=${this.consultation.token}&
                    r=s">Sim</a> 
                    <a href="localhost:5000/confirm-consultation?
                    id=${this.consultation.id}&u=${this.user.id}&
                    t=${this.consultation.token}&
                    r=n">&nbsp;&nbsp;&nbsp;&nbsp;Não</a>.</p>
                    <p>Obrigado</p>
                </body>
                </html>`;
    }
}

export default ConsultationConfirm;