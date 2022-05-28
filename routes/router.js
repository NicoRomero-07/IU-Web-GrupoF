const express = require('express');
const router = express.Router();
const connection = require('../database/db_connection');
const pool = connection.pool;
const mysql = connection.mysql;

router.get('/foro/:id',(req,res,next)=>{
    const id = req.params.id;
    let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
    let query = mysql.format(selectQuery,["foro","idForo",id]);
    let foro;
    let mensajes;
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            throw error;
        }else{
            foro = data[0];
        }
    });
    selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
    query = mysql.format(selectQuery,["mensaje_foro","foro",id]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            throw error;
        }else{
            res.render('foroView',{foro:foro, mensajes:data, pool:pool, mysql:mysql}); 
        }
        
    });
    
});

//Acceso a crear foro
router.get('/createForo', (req,res)=>{

    if(typeof req.session.loggedin != "undefined"){

        pool.query('SELECT * FROM categoria', (error, categorias)=>{
            if(error){
                throw error;
            }else{
                res.render('createForo',{categorias:categorias, usuario:req.session.idUsuario});
            }
        })
    }else{
        res.render('index',{
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
});
//Acceso perfil autor
router.get('/perfilAutor/:id', (req,res)=>{
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
    selectQuery = 'SELECT idForo FROM ?? WHERE ?? = ?';
    query = mysql.format(selectQuery,["foro","propietario",id]);
    pool.query(query,(error, foros)=>{
        if(error){
            throw error;
        }else{
            res.render('autorView',{autor:usuarioAutor, foros:foros});
        }
    })
    
});


const crud = require('../controllers/crud');
router.post('/crearForo', crud.crearForo);

router.get('/',(req,res)=>{
    return res.render('login');
});

router.get('/register',(req,res)=>{
    res.render('register');
});

router.get('/confirmed',(req,res)=>{
    res.render('confirmed');
});

router.get('/confirmeEmail',(req,res)=>{
    res.render('confirmeEmail');
});

const bcrypt = require('bcryptjs/dist/bcrypt');
const bcryptjs = require('bcryptjs');

// Cotrolador del registro
router.post('/registerform', async(req, res)=>{
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
})

// Controlador del login
router.post('/loginform', async(req, res)=>{

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
})

router.get('/index',(req,res)=>{
    if(typeof req.session.loggedin != "undefined"){
        let selectQuery = 'SELECT * FROM ??';
        let query = mysql.format(selectQuery,["foro"]);
        pool.query(query,(err,data) => {
            if(err){
                console.error(err);
                throw error;
            }else{
                res.render('index',{
                    login:true,
                    id: req.session.idUsuario,
                    foros:data
                });
            }
    });
    }else{
        res.render('index',{
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
});

module.exports = router;