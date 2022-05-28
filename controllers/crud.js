const db = require('../database/db_connection')
const pool = db.pool;

exports.crearForo = (req, res)=>{
    const nombre =  req.body.nombreForo; 
    const descripcion = req.body.descripcion;
    
    pool.query('INSERT INTO foro SET ?', {nombre:nombre, descripcion:descripcion}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/')
        }
    });
    console.log(nombre + "-" + descripcion);
}