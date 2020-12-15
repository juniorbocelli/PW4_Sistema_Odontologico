module.exports = {
    secret: 'MTzzBw^Kk(V?3wY', // Encriptação interna
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 8 * 60 * 60 * 1000 } // A princípio a sessão do usuário durará 8 horas
}