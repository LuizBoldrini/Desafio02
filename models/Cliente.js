const moment = require('moment');
const conexao = require('../banco-de-dados/index');

class cliente {
    adiciona(cliente, resposta) {
        const birthDate = moment(cliente.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
        const clienteDatado = { ...cliente, birthDate }

        const dataValida = moment(birthDate).isSameOrBefore('01-05-2004')
        const senhaValida = cliente.password.length >= 6
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email)
        const cpfValido = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cliente.cpf)
        const zipCodeValido = /^[0-9]{5}-[0-9]{3}$/.test(cliente.zipCode)


        const validacoes = [
            {
                nome: 'birthDate',
                valido: dataValida,
                mensagem: 'Cliente precisa ser maior de 18 anos.'
            },
            {
                nome: 'password',
                valido: senhaValida,
                mensagem: 'A senha deve ser maior ou igual a 6 digitos'
            },
            {
                nome: 'email',
                valido: emailValido,
                mensagem: 'O email não foi digitado corretamente!'
            },
            {
                nome: 'cpf',
                valido: cpfValido,
                mensagem: 'O CPF não foi digitado corretamente!'
            },
            {
                nome: 'zipCode',
                valido: zipCodeValido,
                mensagem: 'O zipCode não foi digitado da forma correta!'
            }

        ]
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            resposta.status(400).json(erros)
        } else {
            const sql = 'INSERT INTO clientes SET ?'

            conexao.query(sql, clienteDatado, (erro, resultado) => {
                if (erro) {
                    resposta.status(400).json(erro)
                } else {
                    resposta.status(201).json(cliente)
                }
            })
        }


    }

    lista(resposta) {
        const sql = 'SELECT * FROM Clientes'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
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
            if (erro) {
                resposta.status(404).json(erro)
            } else {
                resposta.status(200).json(cliente)
            }
        })
    }
    alterar(id, valores, resposta) {
        if (valores.birthDate) {
            valores.birthDate = moment(valores.birthDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
        }
        const sql = 'UPDATE Clientes SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                resposta.status(404).json(erro)
            } else {
                resposta.status(200).json({ ...valores, id })
            }

        })
    }
    deleta(id, resposta) {
        const sql = 'DELETE FROM Clientes WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                resposta.status(404).json(erro)
            } else {
                resposta.status(200).json({ id })
            }
        })
    }
}

module.exports = new cliente