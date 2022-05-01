class TabelaCliente {
    init(conexao) {
        this.conexao = conexao

        this.criarClientes()
    };

    criarClientes() {
        const sql = 'CREATE TABLE IF NOT EXISTS clientes (id int NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, CPF int NOT NULL, birthDate datetime NOT NULL, email varchar(20) NOT NULL, address varchar(50) NOT NULL, number varchar(10), complement text NOT NULL, city varchar(20) NOT NULL, state varchar(2), country varchar(10), zipCode float, PRIMARY KEY(id))'

        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela criada no banco de dados!')
            }
        })

    }

};

module.exports = new TabelaCliente



