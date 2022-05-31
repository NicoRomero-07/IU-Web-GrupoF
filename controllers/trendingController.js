const db = require('../database/db_connection');
const pool = db.pool;
const mysql = db.mysql;

// Controlador del apartado trending
exports.trending = async(req, res)=>{
    if(typeof req.session.loggedin != "undefined"){
        let selectQueryAutor = 'SELECT u.idUsuario, u.nombre, u.email FROM ?? mf JOIN ?? f ON f.idForo = mf.foro JOIN ?? u ON u.idUsuario = f.propietario GROUP BY u.idUsuario ORDER BY count(mf.idMensaje_foro) DESC';
        let queryAutor = mysql.format(selectQueryAutor,["mensaje_foro","foro","usuario"]);
        pool.query(queryAutor,(err,dataAutores) => {
            if(err){
                console.error(err);
                throw error;
            }else{
                let selectQuery = 'SELECT f.idForo,f.propietario,f.nombre,f.descripcion,count(m.idMensaje_foro) mensajes FROM bocaillo.foro f' + 
                ' left join mensaje_foro m ON f.idForo = m.foro group by f.idForo ORDER BY COUNT(m.idMensaje_foro) DESC';
                let query = mysql.format(selectQuery,["foro"]);
                pool.query(query,(err,data) => {
                    if(err){
                        console.error(err);
                        throw error;
                    }else{
                        res.render('trending',{
                            login:true,
                            idUsuario: req.session.idUsuario,
                            nombreUsuario: req.session.usuario,
                            foros:data,
                            autores:dataAutores,
                        });
                    }
                });
            }
        });

    } else{
        res.render('index',{
            login: false,
            name: 'Debe iniciar sesión'
        })
    }

};