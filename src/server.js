import app from './app';
import * as cron from 'node-cron'

// Adiciona os crons
cron.schedule('0 0 * * *', function() {
    console.log('Todos os dias às 00:00 o sistema enviará lembretes para quem tem consulta no dia.');
});

// Inicializa o servidor
app.listen(5000, function(){
    console.log("Rodando na porta 5000!");
})