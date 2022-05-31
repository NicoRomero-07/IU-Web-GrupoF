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

//Acceso perfil autor
exports.vistaAutor = (req,res)=>{
    const id = req.params.id;
    selectQuery = 'SELECT nombre, email FROM ?? WHERE ?? = ?';
    query = mysql.format(selectQuery,["usuario","idusuario",id]);
    let usuarioAutor;
    pool.query(query,(error, autor)=>{
        if(error){
            throw error;
        }else{
            usuarioAutor=autor[0];
        }
    })
    selectQuery = 'SELECT idForo, propietario,nombre,descripcion,categoria FROM ?? WHERE ?? = ?';
    query = mysql.format(selectQuery,["foro","propietario",id]);
    pool.query(query,(error, foros)=>{
        if(error){
            throw error;
        }else{
            res.render('autorView',{autor:usuarioAutor, foros:foros, nombreUsuario:req.session.usuario, idUsuario: req.session.idUsuario});
        }
    })
    
}

//Acceso a crear foro
exports.createForoLoadView = (req,res)=>{

    if(typeof req.session.loggedin != "undefined"){

        pool.query('SELECT * FROM categoria', (error, categorias)=>{
            if(error){
                throw error;
            }else{
                res.render('createForo',{categorias:categorias, usuario:req.session.idUsuario, nombreUsuario:req.session.usuario, idUsuario: req.session.idUsuario});
            }
        })
    }else{
        res.render('index',{
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
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
                    usuarios:results,
                    idUsuario: req.session.idUsuario
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
