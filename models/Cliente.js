const moment = require('moment');
const conexao = require('../banco-de-dados/index');

class cliente {
    adiciona(cliente, resposta) {
        const birthDate = moment().format('YYYY-MM-DD')
        const clienteDatado = {...cliente, birthDate}
        // const cpfEhValido = cliente.cpf.length = 11
        // const senhaEhValida = cliente.cpf.length >= 6

        // const validacoes = [
        //     {
        //         nome: 'cpf',
        //         valido: cpfEhValida,
        //         mensagem: 'O cpf precisa ser válido.'
        //     },
        //     {
        //         nome: 'senha',
        //         valido: senhaEhValida,
        //         mensagem: 'A senha deve ser maior ou igual a 6 digitos'
        //     }

        // ]
        const sql = 'INSERT INTO clientes SET ?'

        conexao.query(sql, clienteDatado, (erro, resultado) => {
            if(erro){
                console.log(erro)
            } else {
                console.log(resultado)
            }
        })
    
    }

}

module.exports = new cliente