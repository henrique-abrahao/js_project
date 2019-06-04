const controller = require('../controller/usuarioController');

module.exports = (app) => {

    app.post('/login', controller.login);
    app.post('/usuario', controller.cadastrarUsuario);
    app.get('/usuarioInicial', controller.usuarioInicial)
    app.get('/usuarioInicial2', controller.usuarioInicial2)
    app.get('/usuarioJogosVit', controller.usuarioJogosVit)
    app.get('/usuarioJogosDer', controller.usuarioJogosDer)
    app.get('/usuarioGeral', controller.usuarioListaGeral)
    app.get('/usuario1', controller.player1)
    app.get('/usuario2', controller.player2)
    app.post('/finalGame', controller.atualizaRank)
    app.post('/finalGame2', controller.atualizaRank2)
}