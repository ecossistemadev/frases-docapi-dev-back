function routes(app) {
    app.use('/frase', require('./routes/frases.js'));
    return;
}

module.exports = routes;