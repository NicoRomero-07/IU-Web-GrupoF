const db = require('../database/db_connection');
const pool = db.pool;
const mysql = db.mysql;

// Controlador del apartado trending
exports.trending = async(req, res)=>{
    if(typeof req.session.loggedin != "undefined"){
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
                    id: req.session.idUsuario,
                    foros:data
                });
            }
    });
    }else{
        res.render('index',{
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
};