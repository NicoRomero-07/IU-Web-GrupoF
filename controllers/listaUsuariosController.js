const db = require('../database/db_connection');
const pool = db.pool;
const mysql = db.mysql;

// Controlador del apartado trending
exports.listaUsuarios = async(req, res)=>{
    if(typeof req.session.loggedin != "undefined"){
        let selectQuery = 'SELECT u.nombre,m.contenido,min(m.fechaEmision) fechaEmision ' +
        'FROM usuario u ' +
        'LEFT JOIN mensaje_privado m ON m.emisor = u.idUsuario ' +
        'WHERE m.fechaEmision IN (SELECT max(t.fechaEmision) ' +
                                'FROM mensaje_privado t ' +
                                'WHERE t.receptor = ? ' +
                                'GROUP BY t.emisor) ' +
        'OR m.fechaEmision IS NULL ' +
        'GROUP BY u.nombre ' +
        'ORDER BY count(m.idMensaje) DESC;';
        let query = mysql.format(selectQuery,[req.session.idUsuario]);
        pool.query(query,(err,data) => {
            if(err){
                console.error(err);
                throw error;
            }else{
                res.render('listaUsuarios',{
                    login:true,
                    id: req.session.idUsuario,
                    usuarios:data
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