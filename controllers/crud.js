const conn = require('../database/db_connection')

exports.crearForo = (req, res)=>{
    const nombre =  req.body.nombreForo; 
    const descripcion = req.body.descripcion;
    console.log(nombre + "-" + descripcion);
}