const db = require('../database/db_connection');
const pool = db.pool;
const mysql = db.mysql;

// Controlador del apartado trending
exports.listaUsuarios = async(req, res)=>{
    if(typeof req.session.loggedin != "undefined"){
        let selectQuery = 'SELECT u.nombre,u.idUsuario,max(m.contenido) contenido,max(m.fechaEmision) fechaEmision ' +
        'FROM bocaillo.usuario u ' +
        'LEFT JOIN bocaillo.mensaje_privado m ON (m.emisor = u.idUsuario or m.receptor = u.idUsuario) ' +
        'WHERE (m.fechaEmision IN (SELECT max(t.fechaEmision) ' +
                                'FROM bocaillo.mensaje_privado t ' +
                                'WHERE t.receptor = ? ' +
                                'OR t.emisor = ? ' +
                                'GROUP BY t.emisor,t.receptor) ' +
		'or m.fechaEmision IS NULL) ' +
        'and u.idUsuario != ? ' +
        'GROUP BY u.nombre ' +
        'ORDER BY count(m.idMensaje) DESC';
        let query = mysql.format(selectQuery,[req.session.idUsuario,req.session.idUsuario,req.session.idUsuario]);
        pool.query(query,(err,data) => {
            if(err){
                console.error(err);
                throw error;
            }else{
                res.render('listaUsuarios',{
                    login:true,
                    idUsuario: req.session.idUsuario,
                    usuarios:data,
                    nombreUsuario:req.session.usuario
                });
            }
    });
    }else{
        res.render('index',{
            login: false,
            name: 'Por favor, inicie sesión'
        })
    }
};

exports.listaUsuariosFiltrada = async(req, res)=>{
    if(typeof req.session.loggedin != "undefined"){
        if(req.body.busquedaClave != ""){
            let filtro = '%' + req.body.busquedaClave + '%';
            let selectQuery = 'SELECT u.nombre,u.idUsuario,max(m.contenido) contenido,max(m.fechaEmision) fechaEmision ' +
            'FROM bocaillo.usuario u ' +
            'LEFT JOIN bocaillo.mensaje_privado m ON (m.emisor = u.idUsuario or m.receptor = u.idUsuario) ' +
            'WHERE (m.fechaEmision IN (SELECT max(t.fechaEmision) ' +
                                    'FROM bocaillo.mensaje_privado t ' +
                                    'WHERE t.receptor = ? ' +
                                    'OR t.emisor = ? ' +
                                    'GROUP BY t.emisor,t.receptor) ' +
            'or m.fechaEmision IS NULL) ' +
            'and u.idUsuario != ? ' +
            'and u.nombre like ?' +
            'GROUP BY u.nombre ' +
            'ORDER BY count(m.idMensaje) DESC';
            let query = mysql.format(selectQuery,[req.session.idUsuario,req.session.idUsuario,req.session.idUsuario,filtro]);
            pool.query(query,(err,data) => {
                    if(err){
                        console.error(err);
                        throw error;
                    }else{
                        res.render('listaUsuarios',{
                            login:true,
                            idUsuario: req.session.idUsuario,
                            usuarios:data,
                            nombreUsuario:req.session.usuario
                        });
                    }
                });
        }else{
            let selectQuery = 'SELECT u.nombre,u.idUsuario,max(m.contenido) contenido,max(m.fechaEmision) fechaEmision ' +
            'FROM bocaillo.usuario u ' +
            'LEFT JOIN bocaillo.mensaje_privado m ON (m.emisor = u.idUsuario or m.receptor = u.idUsuario) ' +
            'WHERE (m.fechaEmision IN (SELECT max(t.fechaEmision) ' +
                                    'FROM bocaillo.mensaje_privado t ' +
                                    'WHERE t.receptor = ? ' +
                                    'OR t.emisor = ? ' +
                                    'GROUP BY t.emisor,t.receptor) ' +
            'or m.fechaEmision IS NULL) ' +
            'and u.idUsuario != ? ' +
            'GROUP BY u.nombre ' +
            'ORDER BY count(m.idMensaje) DESC';
                let query = mysql.format(selectQuery,[req.session.idUsuario,req.session.idUsuario,req.session.idUsuario]);
                pool.query(query,(err,data) => {
                    if(err){
                        console.error(err);
                        throw error;
                    }else{
                        res.render('listaUsuarios',{
                            login:true,
                            idUsuario: req.session.idUsuario,
                            usuarios:data,
                            nombreUsuario:req.session.usuario
                        });
                    }
            });
        }
    }else{
        res.render('index',{
            login: false,
            name: 'Por favor, inicie sesión'
        })
    }
};