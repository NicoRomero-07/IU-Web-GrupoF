const db = require('../database/db_connection');
const pool = db.pool;

exports.getLogin = (req,res) =>{
    const id = req.session.idUsuario;
    selectQuery = 'SELECT nombre, email FROM ?? WHERE ?? = ?';
    query = mysql.format(selectQuery,["usuario","idusuario",id]);
    let usuarioLogin;
    pool.query(query,(error, user)=>{
        if(error){
            throw error;
        } else {
            usuarioLogin=user[0];
        }
    })
}