const db = require('../database/db_connection');
const pool = db.pool;
const mysql = db.mysql;

exports.buscarForo = async (req, res) => {
    
    const clave = `%${req.body.busquedaClave}%`;
    let selectQueryAutor = 'SELECT u.idUsuario, u.nombre, u.email FROM ?? mf JOIN ?? f ON f.idForo = mf.foro JOIN ?? u ON u.idUsuario = f.propietario GROUP BY u.idUsuario ORDER BY count(mf.idMensaje_foro) DESC';
        let queryAutor = mysql.format(selectQueryAutor,["mensaje_foro","foro","usuario"]);
        pool.query(queryAutor,(err,dataAutores) => {
            if(err){
                console.error(err);
                throw error;
            }else{
                pool.query('SELECT * FROM foro WHERE Nombre like ?', '%'+[clave]+'%', async (error, results) => {

                    if (error) {
                        console.log(error);
                    } else {
                        res.render('JavaScriptResultoBuscar', { results:results,nombreUsuario:req.session.usuario, idUsuario:req.session.idUsuario, autores:dataAutores});
                    }
                });
            }
        });
}