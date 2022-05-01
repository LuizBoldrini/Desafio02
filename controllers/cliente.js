module.exports = app => {
    app.get('/api/v1/user', (requisicao, resposta) => resposta.send('Isso é um GET'))

    app.post('/api/v1/user', (requisicao, resposta) => {
        console.log(requisicao.body)
        resposta.send('Isso é um POST')})

}