const db = require('../database/db_connection');
const pool = db.pool;
const bcrypt = require('bcryptjs/dist/bcrypt');
const bcryptjs = require('bcryptjs');

exports.loginform = async(req, res)=>{
    const usuario = req.body.usuario;
    const password = req.body.password;
    let passwordHash = await bcryptjs.hash(password,8);
        pool.query('SELECT * FROM usuario WHERE nombre = ?',[usuario],async(error,results)=>{
            if(results.length == 0){
                res.render('login',{
                    alert:true,
                    alertTitle:"Login",
                    alertMessage: "¡El nombre de usuario introducido no está disponible!",
                    alertIcon: 'error',
                    showConfirmButton:true,
                    ruta:''
                });
            }else if( !(await bcryptjs.compare(password, results[0].contrasenya)) ){
                res.render('login',{
                    alert:true,
                    alertTitle:"Login",
                    alertMessage: "¡Las contraseña introducida no es correcta, por favor inténtelo de nuevo!",
                    alertIcon: 'error',
                    showConfirmButton:true,
                    ruta:''
                });
            }else{
                req.session.loggedin = true;
                req.session.idUsuario = results[0].idUsuario;
                res.redirect('index');
            }
        })
}