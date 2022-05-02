const moment = require('moment');
const conexao = require('../banco-de-dados/index');
const cliente = require('../banco-de-dados/Tabelas')

class task {
    adiciona(task, resposta) {
        const date = moment(task.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const taskDatada = { ...task, date }

        const dataValida = moment(date).isAfter(moment())

        const validacoes = [
            {
                nome: 'date',
                valido: dataValida,
                mensagem: 'Data precisa ser maior a data atual!'
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
                    resposta.status(201).json(task)
                }
            })
        }

    }

    lista(resposta) {
        const sql = 'SELECT Tasks. *, clientes.id FROM tasks INNER JOIN clientes ON tasks.user = clientes.id'

        conexao.query(sql, (erro, resultado) => {
            if(erro) {
                resposta.status(404).json(erro)
            } else {
                resposta.status(200).json(resultado)
            }
        })

    }

    buscarPorUser(user, resposta) {
        const sql = `SELECT Tasks.*, clientes.id FROM tasks INNER JOIN clientes ON tasks.user = clientes.id WHERE user=${user}`

        conexao.query(sql, (erro, resultado) => {
            const task = resultado[0]
            if(resultado.length == 0) {
                resposta.status(404).json(
                    [
                        {
                            mensagem: `Cliente com id:${user} não foi encontrado!`
                        }
                    ])
            }else if(erro) {
                resposta.status(500).json(erro)
            } else {
                resposta.status(200).json(task)
            }
        })
    }

    alterar(user, valores, resposta) {
        if(this.buscarPorUser){const sql = `SELECT Tasks.*, clientes.id FROM tasks INNER JOIN clientes ON tasks.user = clientes.id WHERE user=${user}`

        conexao.query(sql, (erro, resultado) => {
            const task = resultado[0]
            if(resultado.length == 0) {
                resposta.status(404).json(
                    [
                        {
                            mensagem: `Cliente com id:${user} não foi encontrado!`
                        }
                    ])
            }else if(erro) {
                resposta.status(500).json(erro)
            } else {
                resposta.status(200).json(task)
            }
        })

        }else {
            if(valores.date) {
            valores.date = moment(valores.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE Tasks SET ? WHERE user=?'

        conexao.query(sql, [valores, user], (erro, resultado) => {
            if(this.buscarPorId){

            }
            if(erro) {
                resposta.status(404).json(erro)
            } else {
                resposta.status(200).json({...valores, user})
            }
        })
        }
        
    }

    deleta(user, resposta) {
        if(this.buscarPorUser) {
            const sql = `SELECT Tasks.*, clientes.id FROM tasks INNER JOIN clientes ON tasks.user = clientes.id WHERE user=${user}`

        conexao.query(sql, (erro, resultado) => {
            const task = resultado[0]
            if(resultado.length == 0) {
                resposta.status(404).json(
                    [
                        {
                            mensagem: `Cliente com id:${user} não foi encontrado!`
                        }
                    ])
            }else if(erro) {
                resposta.status(500).json(erro)
            } else {
                resposta.status(200).json(task)
            }
        })
    }else{
          const sql = 'DELETE FROM Tasks WHERE user=?'

        conexao.query(sql, id, (erro, resultado) => {
            if(erro) {
                resposta.status(404).json(erro)
            } else {
                resposta.status(200).json(
                    [
                        {
                            mensagem: `Task ${id} foi deleta com sucesso!`
                        }
                    ])
            }
        }) 
    }

    }

}

module.exports = new task