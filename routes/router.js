const express = require('express');
const router = express.Router();
const connection = require('../database/db_connection');
const pool = connection.pool;
const mysql = connection.mysql;
const bcrypt = require('bcryptjs/dist/bcrypt');
const bcryptjs = require('bcryptjs');
const buscarForoController = require('../controllers/buscarForoController');


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
const loginController = require('../controllers/loginController');
router.post('/loginform', loginController.loginform);
const registerController = require('../controllers/registerController');
router.post('/registerform', registerController.registerform);

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
router.get('/listaUsuarios',(req,res)=>{
    res.render('listaUsuarios');
});

// Controlador del trending
router.get('/trending',(req,res)=>{
    if(typeof req.session.loggedin != "undefined"){
        let selectQuery = 'SELECT f.idForo,f.propietario,f.nombre,f.descripcion,count(m.idMesaje_foro) mensajes FROM bocaillo.foro f' + 
        ' join mesaje_foro m ON f.idForo = m.foro group by f.idForo ORDER BY COUNT(m.idMesaje_foro) DESC';
        let query = mysql.format(selectQuery,["foro"]);
        pool.query(query,(err,data) => {
            if(err){
                console.error(err);
                throw error;
            }else{
                res.render('trending',{
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

//Controlador del index
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

router.post('/buscarForo', buscarForoController.buscarForo);


module.exports = router;