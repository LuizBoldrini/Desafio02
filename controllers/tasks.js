const Task = require('../models/Task');

module.exports = app => {
    app.get('/api/v1/task', (requisicao, resposta) =>{
        Task.lista(resposta)
    })

    app.post('/api/v1/task', (requisicao, resposta) => {
        const task = requisicao.body

        Task.adiciona(task, resposta)
    } )
}