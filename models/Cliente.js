const conexao = require('../banco-de-dados/index')

class cliente {
    adiciona(cliente, resposta) {
        const cpfEhValido = clientes.cpf.length = 11
        const senhaEhValida = clientes.cpf.length >= 6
        
        const validacoes = [
            {
                nome: 'cpf',
                valido: cpfEhValida,
                mensagem: 'O cpf precisa ser válido.'
            },
               {
                    nome: 'senha',
                    valido: senhaEhValida,
                    mensagem: 'A senha deve ser maior ou igual a 6 digitos'
                },

        ] 
    }
}