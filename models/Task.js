const moment = require('moment');
const conexao = require('../banco-de-dados/index');

class task {
    adiciona(task, resposta) {
        const date = moment(task.date, 'DD/MM/YYYY HH:MM:SS').format('YYYY-MM-DD HH:MM:SS')
        const taskDatada = { ...task, date }

        const dataValida = moment(date).isSameOrAfter('01-05-2022')

        const validacoes = [
            {
                nome: 'date',
                valido: dataValida,
                mensagem: 'Data precisa ser maior ou igual a atual'
            }
        ]
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            resposta.status(400).json(erros)
        } else {
            const sql = 'INSERT INTO tasks SET ?'

            conexao.query(sql, taskDatada, (erro, resultado) => {
                if (erro) {
                    resposta.status(400).json(erro)
                } else {
                    resposta.status(201).json(cliente)
                }
            })
        }

    }

    lista(resposta) {
        const sql = 'SELECT * FROM Tasks'

        conexao.query(sql, (erro, resultado) => {
            if(erro) {
                resposta.status(404).json(erro)
            } else {
                resposta.status(200).json(resultado)
            }
        })

    }

    buscarPorId(id, resposta) {
        const sql = `SELECT * FROM  Tasks WHERE id=${id}`

        conexao.query(sql, (erro, resultado) => {
            const task = resultado[0]
            if(erro) {
                resposta.status(404).json(erro)
            } else {
                resposta.status(200).json(task)
            }
        })
    }

}

module.exports = new task