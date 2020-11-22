var express = require('express');
var consign = require('consign');

var app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views');

consign()
    .include('src/routes')
    .then('src/models')
    .then('src/libs')
    .then('src/config')
    .then('src/controllers')
    .into(app);

module.exports = app;

app.listen(8080, function(){
    console.log("Rodando na porta 8080");
});