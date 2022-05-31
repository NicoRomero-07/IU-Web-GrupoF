const db = require('../database/db_connection');
const pool = db.pool;
const mysql = db.mysql;

exports.getDatos = async(req,res) =>{
    const id = req.session.idUsuario;
    selectQuery = 'SELECT nombre, email, contrasenya FROM usuario WHERE idUsuario = ?';
    query = mysql.format(selectQuery,[id]);
    pool.query(query, async (error, user)=>{
        if(error){
            console.log(error);
        } else {
            res.render("editProfile", {
                usuario:user,
                nombreUsuario:req.session.usuario,
                login:req.session.loggedin
            });
        }
    })
}

exports.modificarDatos = (req,res) => {
    const idUsuario = req.session.idUsuario;
    const nombre = req.body.nombre;
    const email = req.body.email;
    updateQuery = 'UPDATE usuario SET nombre = ?, email = ? WHERE idUsuario = ?';
    query = mysql.format(updateQuery, [nombre, email, idUsuario]);
    pool.query(query, (error, data) =>{
        if(error) {
            console.log(error);
        } else {
            req.session.usuario = nombre;
            res.redirect('/vistaPerfil');
        }
    });
}