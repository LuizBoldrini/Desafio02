const Cliente = require('../models/Cliente')

module.exports = app => {
    app.get('/api/v1/user', (requisicao, resposta) => resposta.send('Isso é um GET'))

    app.post('/api/v1/user', (requisicao, resposta) => {
        const cliente = requisicao.body
        
        Cliente.adiciona(cliente)
        resposta.send('Isso é um POST')})

}