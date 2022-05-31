const db = require('../database/db_connection');
const pool = db.pool;

exports.buscarForo = async (req, res) => {
    
    const clave = `%${req.body.busquedaClave}%`;

    pool.query('SELECT * FROM foro WHERE Nombre like ?', '%'+[clave]+'%', async (error, results) => {

        if (error) {
            console.log(error);
        } else {
            res.render('JavaScriptResultoBuscar', { results:results,nombreUsuario:req.session.usuario, idUsuario:req.session.idUsuario});
        }
    })
}