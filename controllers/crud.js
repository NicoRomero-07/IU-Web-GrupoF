const db = require('../database/db_connection')
const pool = db.pool;
const mysql = db.mysql;

exports.crearForo = (req, res) => {
    const nombre = req.body.nombreForo;
    const descripcion = req.body.descripcion;
    const propietario = req.body.idUsuario;
    const categoria = req.body.categoria;
    pool.query('INSERT INTO foro SET ?', {propietario: propietario,nombre:nombre, descripcion:descripcion, categoria:categoria}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/foro/'+results.insertId);
        }
    });
    console.log(nombre + "-" + descripcion);
}
exports.mesajeForo = (req, res)=>{
    const contenido = req.body.contenido;
    const idForo = req.body.id;
    const usuario = req.session.idUsuario;

    pool.query('INSERT INTO mensaje_foro SET ?', {contenido:contenido, foro:idForo, emisor:usuario,fechaEmision:new Date()}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/foro/'+idForo);
        }
    });
}

exports.filtrarUsuario = async(req, res) => {
    if(typeof req.session.loggedin != "undefined"){
        const filtro = req.body.busquedaClave;
        let selectQuery = 'SELECT * FROM ?? WHERE ?? LIKE ?';
        let query = mysql.format(selectQuery,["usuario","nombre","%"+filtro+"%"]);
        pool.query(query, (error,results)=>{
            if (error){
                throw (error);
            }else{
                res.render('listaUsuarios',{
                    login:true,
                    id: req.session.idUsuario,
                    usuarios:results
                });
            }  
        });
    }else{
        res.render('index',{
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
}

exports.deleteMensajeForo = (req, res) => {
    const mensajeId = req.params.mensajeId;
    const idForo = req.body.idForo;
    const usuario = req.session.idUsuario;

    pool.query('DELETE FROM mensaje_foro  WHERE idMensaje_foro = ? and emisor = ? ', [Number.parseInt(mensajeId), Number.parseInt(usuario)], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/foro/' + idForo);
        }
    });
}
