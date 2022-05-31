const db = require('../database/db_connection');
const pool = db.pool;
const mysql = db.mysql;

// Controlador del apartado trending
exports.lista = async(req, res)=>{
    if(typeof req.session.loggedin != "undefined"){
        let selectQuery = 'SELECT * FROM categoria;';
        let query = mysql.format(selectQuery,["categoria"]);
        pool.query(query,(err,data) => {
            if(err){
                console.error(err);
                throw error;
            }else{
                res.render('categorias',{
                    login:true,
                    idUsuario: req.session.idUsuario,
                    nombreUsuario:req.session.usuario,
                    categorias:data
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