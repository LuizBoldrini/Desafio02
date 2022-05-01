const Cliente = require('../models/Cliente')

module.exports = app => {
    app.get('/api/v1/user', (requisicao, resposta) => {
        Cliente.lista(resposta)
    });

    app.get('/api/v1/user/:id', (requisicao, resposta) => {
        const id = parseInt(requisicao.params.id)
        Cliente.buscaPorId(id, resposta)
    })

    app.post('/api/v1/user', (requisicao, resposta) => {
        const cliente = requisicao.body
        
        Cliente.adiciona(cliente, resposta)

    })
}