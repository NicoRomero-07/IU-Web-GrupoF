const db = require('../database/db_connection');
const pool = db.pool;
const mysql = db.mysql;

exports.getMensajes = async(req,res) =>{
    const id = req.session.idUsuario;
    const idReceptor = req.params.usuarioId;
    selectQuery = 'SELECT u.nombre, u.idUsuario, mp.* FROM usuario u JOIN mensaje_privado mp ON u.idUsuario = mp.emisor WHERE (mp.emisor = ? AND mp.receptor = ?) OR (mp.emisor = ? AND mp.receptor = ?) ORDER BY mp.fechaEmision';
    query = mysql.format(selectQuery,[id, idReceptor, idReceptor, id]);
    pool.query(query, async(error, data)=>{
        if(error){
            console.log(error);
        } else {
            selectQuery2 = 'SELECT nombre FROM usuario WHERE idUsuario = ?';
            query2 = mysql.format(selectQuery2, [idReceptor]);
            pool.query(query2, async(error, nombreReceptor) => {
                if(error) {
                    console.log(error);
                } else {
                    res.render("chatView", {
                        mensajes:data,
                        idUsuario:req.session.idUsuario,
                        idReceptor:idReceptor,
                        nombreUsuario:req.session.usuario,
                        nombreReceptor:nombreReceptor
                    });
                }
            })
        }
    })
}

exports.enviarMensaje = (req, res) => {
    const idUsuarioP = req.session.idUsuario;
    const idReceptorP = req.body.idReceptor;
    const contenido = req.body.mensaje;
    if(contenido != "") {
        pool.query('INSERT INTO mensaje_privado SET ?', {contenido:contenido, emisor:idUsuarioP, receptor:idReceptorP, fechaEmision:new Date()}, (error,results)=>{
            if(error){
                console.log(error);
            }else{
                res.redirect('/vistaChat/' + idReceptorP);
            }
        });
    } else {
        res.redirect('/vistaChat/' + idReceptorP);
    }
}