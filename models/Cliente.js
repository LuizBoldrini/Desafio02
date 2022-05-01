const res = require('express/lib/response');
const moment = require('moment');
const conexao = require('../banco-de-dados/index');

class cliente {
    adiciona(cliente, resposta) {
        const birthDate = moment().format('YYYY-MM-DD')
        const clienteDatado = {...cliente, birthDate}
        const dataEhValida = moment(birthDate).isSameOrBefore('2004-05-01')
        const senhaEhValida = cliente.password.length >= 6

        const validacoes = [
            {
                nome: 'birthDate',
                valido: dataEhValida,
                mensagem: 'Cliente precisa ser maior de 18 anos.'
            },
            {
                nome: 'password',
                valido: senhaEhValida,
                mensagem: 'A senha deve ser maior ou igual a 6 digitos'
            }

        ]
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            resposta.status(400).json(erros)
        }else{
             const sql = 'INSERT INTO clientes SET ?'

        conexao.query(sql, clienteDatado, (erro, resultado) => {
            if(erro){
                resposta.status(400).json(erro)
            } else {
                resposta.status(201).json(resultado)
            }
        })
        }
       
    
    }

}

module.exports = new cliente