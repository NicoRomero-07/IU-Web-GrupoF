const db = require('../database/db_connection');
const pool = db.pool;
const mysql = db.mysql;

exports.getLogin = async(req,res) =>{
    const id = req.session.idUsuario;
    selectQuery = 'SELECT nombre, email FROM usuario WHERE idUsuario = ?';
    query = mysql.format(selectQuery,[id]);
    pool.query(query, async (error, user)=>{
        if(error){
            console.log(error);
        } else {
            res.render("profileView", {
                usuario:user,
                nombreUsuario:req.session.usuario,
                login:req.session.loggedin
            });
        }
    })
}