const res = require('express/lib/response');
const moment = require('moment');
const conexao = require('../banco-de-dados/index');

class cliente {
    adiciona(cliente, resposta) {
        const birthDate = moment(cliente.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
        const clienteDatado = {...cliente, birthDate}

        const dataEhValida = moment(birthDate).isSameOrBefore('01-05-2004')
        const senhaEhValida = cliente.password.length >= 6

        // const emaiEhValido = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i
        // const emailFormatado = emaiEhValido.exec(cliente.email);

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
            } //,
            // {
            //     nome: 'email',
            //     valido: emaiEhValido,
            //     mensagem: 'O email precisa ser válido!'
            // }

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

    lista(resposta) {
        const sql = 'SELECT * FROM Clientes'

        conexao.query(sql, (erro, resultados) =>{
            if(erro){
                resposta.status(404).json(erro)
            } else {
                resposta.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, resposta) {
        const sql = `SELECT * FROM Clientes WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const cliente = resultados[0]
            if(erro) {
                resposta.status(404).json(erro)
            } else {
                resposta.status(200).json(cliente)
            }
        })
    }

}

module.exports = new cliente