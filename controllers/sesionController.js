const db = require('../database/db_connection');
const pool = db.pool;
const mysql = db.mysql;

// Controlador del apartado trending
exports.cerrarSesion = async(req, res)=>{
    if(typeof req.session.loggedin != "undefined"){
        req.session.loggedin = undefined;
        res.render('login');
    }else{
        res.render('index',{
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
};