const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const conexao = require('./banco-de-dados/index')
const Tabelas = require('./banco-de-dados/Tabelas')

conexao.connect(erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log("Conectado ao banco de dados")

        Tabelas.init(conexao)
    }
})

app.listen(config.get('api.porta'), () => console.log('O servidor está funcionando!'));

app.get('/', (requisicao, resposta) => resposta.send('Tudo certo aqui!'))
