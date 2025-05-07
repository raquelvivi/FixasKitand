const pool = require("../config/db.js");
// constructor
const Fixass = function (fixa) {
    this.id = fixa.id;
    this.nome = fixa.nome;
    this.apelido = fixa.apelido;
    this.logradouro = fixa.logradouro;
    this.numero = fixa.numero;
    this.bairro = fixa.bairro;
    this.creditomax = fixa.creditomax;
    this.datapaga = fixa.datapaga;
};

Fixass.create = (NewFixa, result) => {
    
    pool.query("INSERT INTO fixa (nome, apelido, logradouro, numero, bairro, creditomax, datapaga) VALUES ($1, $2, $3, $4, $5, $6, $7)", 
        [NewFixa.nome, NewFixa.apelido, NewFixa.logradouro, NewFixa.numero,NewFixa.bairro, parseFloat(NewFixa.creditomax), parseInt( NewFixa.datapaga)], (err, res) => {
        
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created fixa: ", {
            id: res.insertId, ...NewFixa
        });
        result(null, { id: res.insertId, ...NewFixa });
    });
};
Fixass.findById = (id, result) => {
    console.log('findById id = ', id)
    pool.query('SELECT * FROM fixa WHERE id = $1' , [id], (err,
        res) => {
        if (err) {
            //throw error
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.rows.length) {
            console.log("fixa encontrado: ", res.rows[0]);
            result(null, res.rows[0]);
            return;
        }
        // not found aluno with the id
        console.log("fixa nao encontrado: res.length = ", res);
        result({ kind: "not_found" }, null);
    });
};
Fixass.getAll = (nome, result) => {
    let query = "SELECT * FROM fixa";
    if (nome) {
        query += " WHERE nome LIKE '%${nome}%'";
    }
    pool.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("fixa: ", res.rows);
        result(null, res);
    });
};
Fixass.updateById = (id, fixa, result) => {
    pool.query("UPDATE fixa SET nome = $1 WHERE id = $2",
        [fixa.nome, id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Aluno with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated fixa: ", { id: id, ...tutorial });
            result(null, { id: id, ...tutorial });
        }
    );
};
Fixass.remove = (id, result) => {
    pool.query("DELETE FROM fixa WHERE id = $1", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Aluno with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted fixa with id: ", id);
        result(null, res);
    });
};
Fixass.removeAll = result => {
    pool.query("DELETE FROM fixa", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} fixa`);
        result(null, res);
    });
};
module.exports = Fixass;