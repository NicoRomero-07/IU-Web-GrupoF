const db = require('../database/db_connection');
const pool = db.pool;
const bcrypt = require('bcryptjs/dist/bcrypt');
const bcryptjs = require('bcryptjs');
const req = require('express/lib/request');
const res = require('express/lib/response');

// Cotrolador del registro
exports.registerform = async(req, res)=>{
    const usuario = req.body.usuario;
    const password = req.body.password;
    const password2 = req.body.password2;
    const email = req.body.email;
    if(password == password2){
        let passwordHash = await bcryptjs.hash(password,8);
        pool.query('INSERT INTO usuario SET ?',{nombre:usuario,email:email,contrasenya:passwordHash},async(error,results)=>{
            if(error){
                res.render('register',{
                    usuario:usuario,
                    alert:true,
                    alertTitle:"Registro",
                    alertMessage: "¡El usuario ya ha sido registrado, por favor inténtelo de nuevo!",
                    alertIcon: 'error',
                    showConfirmButton:true,
                    ruta:'register'
                })
            }else{
                res.render('register',{
                    alert:true,
                    alertTitle:"Registro",
                    alertMessage: "¡Registro completado con éxito!",
                    alertIcon: 'success',
                    showConfirmButton:false,
                    timer:3000,
                    ruta:'index'
                })
            }
        })
    }else{
        res.render('register',{
            usuario:usuario,
            alert:true,
            alertTitle:"Registro",
            alertMessage: "¡Las contraseñas no coinciden, por favor inténtelo de nuevo!",
            alertIcon: 'error',
            showConfirmButton:true,
            ruta:'register'
        })
    }
}