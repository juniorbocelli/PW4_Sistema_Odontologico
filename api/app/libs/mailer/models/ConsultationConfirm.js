class ConsultationConfirm {
    constructor(consultation, client) {
        this.consultation = consultation;
        this.client = client;
    }

    html() {
        return `<html>
                <head></head>
                <body>
                    <h2>Caro, <strong>${this.client.name}</strong></h2>
                    <p>Confirme sua presença na consulta abaixo:</p>
                    <p>Dia: ${this.consultation.time.toString()}</p>
                    <p>
                        <a href="http://localhost:5000/consultations/confirm-consultation/${this.consultation.id}?c=${this.client.id}&t=${this.consultation.token}&r=s">Sim</a>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="http://localhost:5000/consultations/confirm-consultation/${this.consultation.id}?c=${this.client.id}&t=${this.consultation.token}&r=n">Não</a>.
                    </p>
                    <p>Obrigado</p>
                </body>
                </html>`;
    }
}

export default ConsultationConfirm;