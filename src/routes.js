function routes(app) {
    app.use('/frase', require('./routes/frase.js'));
    return;
}

module.exports = routes;