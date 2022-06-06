const db = require('../database/db_connection');
const pool = db.pool;
const mysql = db.mysql;

// Controlador del apartado trending
exports.listaUsuarios = async(req, res)=>{
    if(typeof req.session.loggedin != "undefined"){
        let selectQuery = 'SELECT u.nombre,u.idUsuario,m.contenido,min(m.fechaEmision) fechaEmision ' +
        'FROM usuario u ' +
        'LEFT JOIN mensaje_privado m ON (m.emisor = u.idUsuario or m.receptor = u.idUsuario) ' +
        'WHERE (m.fechaEmision IN (SELECT max(t.fechaEmision) ' +
                                'FROM mensaje_privado t ' +
                                'WHERE t.receptor = ? ' +
                                'OR t.emisor = ? ' +
                                'GROUP BY t.emisor AND t.receptor) ' +
        'OR m.fechaEmision IS NULL) ' +
        'AND u.idUsuario != ? ' +
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
            let selectQuery = 'SELECT u.nombre,u.idUsuario,m.contenido,min(m.fechaEmision) fechaEmision ' +
            'FROM usuario u ' +
            'LEFT JOIN mensaje_privado m ON (m.emisor = u.idUsuario or m.receptor = u.idUsuario) ' +
            'WHERE (m.fechaEmision IN (SELECT max(t.fechaEmision) ' +
                                    'FROM mensaje_privado t ' +
                                    'WHERE t.receptor = ? ' +
                                    'OR t.emisor = ? ' +
                                    'GROUP BY t.emisor AND t.receptor) ' +
            'OR m.fechaEmision IS NULL) ' +
            'AND u.idUsuario != ? ' +
            'AND u.nombre like ?'
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
            let selectQuery = 'SELECT u.nombre,u.idUsuario,m.contenido,min(m.fechaEmision) fechaEmision ' +
                'FROM usuario u ' +
                'LEFT JOIN mensaje_privado m ON (m.emisor = u.idUsuario or m.receptor = u.idUsuario) ' +
                'WHERE (m.fechaEmision IN (SELECT max(t.fechaEmision) ' +
                                        'FROM mensaje_privado t ' +
                                        'WHERE t.receptor = ? ' +
                                        'OR t.emisor = ? ' +
                                        'GROUP BY t.emisor AND t.receptor) ' +
                'OR m.fechaEmision IS NULL) ' +
                'AND u.idUsuario != ? ' +
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