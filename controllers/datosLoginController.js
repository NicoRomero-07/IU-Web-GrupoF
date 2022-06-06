const db = require('../database/db_connection');
const pool = db.pool;
const mysql = db.mysql;

function mysqlQueryPromise(query) {
    return new Promise((resolve, reject) => {
        pool.query(query, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
}


exports.getLogin = async (req, res) => {
    const id = req.session.idUsuario;

    const forosCreados = await mysqlQueryPromise(mysql.format("SELECT * FROM foro  WHERE Propietario = ?", [id]));

    selectQuery = 'SELECT nombre, email FROM usuario WHERE idUsuario = ?';
    query = mysql.format(selectQuery, [id]);

    pool.query(query, async (error, user) => {
        if (error) {
            console.log(error);
        } else {
            res.render("profileView", {
                usuario: user,
                nombreUsuario: req.session.usuario,
                login: req.session.loggedin,
                forosCreados: forosCreados
            });
        }
    })
}