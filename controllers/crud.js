const db = require('../database/db_connection')
const pool = db.pool;

exports.crearForo = (req, res) => {
    const nombre = req.body.nombreForo;
    const descripcion = req.body.descripcion;
    const propietario = req.body.idUsuario;
    pool.query('INSERT INTO foro SET ?', {nombre:nombre, descripcion:descripcion}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/')
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
