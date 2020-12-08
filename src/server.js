import app from './app';
import * as cron from 'node-cron'

// Adiciona os crons
cron.schedule('0 0 * * *', function() {
    console.log('Todos os dias às 00:00 o sistema enviará lembretes para quem tem consulta no dia.');
});

cron.schedule('*/5 * * * *', function() {
    console.log('De 5 em 5 minutos o sistema verifica consultas que acontecerão a 2 horas e notifica o paciente.');
});

// Inicializa o servidor
app.listen(5000, function(){
    console.log("Rodando na porta 5000!");
})