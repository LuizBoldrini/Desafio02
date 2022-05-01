const Sequelize = require('sequelize')

class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarClientes()
        this.criarTask()
    };

    colunas = {

    }


    criarClientes() {
        const sql = 'CREATE TABLE IF NOT EXISTS clientes (id int NOT NULL AUTO_INCREMENT, name varchar(100) NOT NULL, cpf varchar(14) NOT NULL, birthDate datetime NOT NULL, email varchar(100) NOT NULL,password varchar(20) NOT NULL, address varchar(50) NOT NULL, number varchar(10), complement text NOT NULL, city varchar(30) NOT NULL, state varchar(2) NOT NULL, country varchar(15), zipCode varchar(9), PRIMARY KEY(id))'

        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela criada no banco de dados!')
            }
        })

    }

    criarTask() {
        const sql = `CREATE TABLE IF NOT EXISTS Tasks ( description varchar(200) NOT NULL, date datetime NOT NULL, id int,CONSTRAINT fk_UserTask FOREIGN KEY (id) REFERENCES Clientes (id))`

        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela criada no banco de dados!')
            }
        })
    }



};

module.exports = new Tabelas



