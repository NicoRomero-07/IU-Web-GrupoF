const db = require('../database/db_connection');
const pool = db.pool;
const mysql = db.mysql;

// Controlador de búsqueda de categorias
exports.buscarCategoria = async(req, res)=>{
    if(typeof req.session.loggedin != "undefined"){
        let filtroCategoria = '%' + req.body.filtroPorCategoria + '%';
        let selectQuery = "SELECT * FROM categoria WHERE nombre like ? ;";
        let query = mysql.format(selectQuery,[filtroCategoria]);
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
            name: 'Por favor, inicie sesión'
        })
    }
};