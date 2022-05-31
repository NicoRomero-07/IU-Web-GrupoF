const express = require('express');
const router = express.Router();
const connection = require('../database/db_connection');
const pool = connection.pool;
const mysql = connection.mysql;
const bcrypt = require('bcryptjs/dist/bcrypt');
const bcryptjs = require('bcryptjs');
const buscarForoController = require('../controllers/buscarForoController');

router.get('/foro/:id', async (req, res) => {
    if (typeof req.session.loggedin != "undefined") {
        const id = req.params.id;
        let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
        let query = mysql.format(selectQuery, ["foro", "idForo", id]);

        function get_foro(query) {
            return new Promise((resolve, reject) => {
                pool.query(query, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data[0]);
                    }
                });
            });
        }
        const foro = await get_foro(query);
        

        selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
        query = mysql.format(selectQuery,["mensaje_foro","foro",id]);
        function get_mensajes(query){
            return new Promise((resolve,reject) =>{
                pool.query(query,(err,data) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(data);
                    }   
                });
            })
        }
        let mensajes = await get_mensajes(query);
        
        
        selectQuery = 'SELECT idUsuario,nombre FROM ??';
        query = mysql.format(selectQuery,["usuario"]);
    
        function get_usuarios (query){
            return new Promise((resolve,reject)=>{
                pool.query(query,(err,data) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(data);
                    }
                });
            });
        }
        const usuarios = await get_usuarios(query);

        mensajes.map(function (element){
            let i = 0;
            let encontrado = false;
            while (!encontrado && i < usuarios.length){
                if (usuarios[i].idUsuario == element.emisor){
                    element.usuario = usuarios[i].nombre;
                    encontrado = true;
                }
                i++;
            }
            return element;
        });
        let usuario = req.session.usuario;
        let idUsuario = req.session.idUsuario;
        res.render('foroView',{foro:foro, mensajes:mensajes, nombreUsuario:usuario,idUsuario:idUsuario}); 

    }else{
        res.render('index',{
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
});

//Acceso a crear foro
router.get('/createForo', (req,res)=>{

    if(typeof req.session.loggedin != "undefined"){

        pool.query('SELECT * FROM categoria', (error, categorias)=>{
            if(error){
                throw error;
            }else{
                res.render('createForo',{categorias:categorias, usuario:req.session.idUsuario, nombreUsuario:req.session.usuario});
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
    selectQuery = 'SELECT idForo, propietario,nombre,descripcion,categoria FROM ?? WHERE ?? = ?';
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

const trendingController = require('../controllers/trendingController');
router.get('/trending', trendingController.trending);

const listaUsuariosController = require('../controllers/listaUsuariosController');
router.get('/listaUsuarios', listaUsuariosController.listaUsuarios);

//Enviar mensaje foro
router.post('/enviarMensajeForo',crud.mesajeForo);

//Filtrar lista usuarios
router.post('/listaUsuarios/filtro',crud.filtrarUsuario)

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

//Controlador del index
router.get('/index',(req,res)=>{
    if(typeof req.session.loggedin != "undefined"){
        
        let selectQueryAutor = 'SELECT u.idUsuario, u.nombre, u.email FROM ?? mf JOIN ?? f ON f.idForo = mf.foro JOIN ?? u ON u.idUsuario = f.propietario GROUP BY u.idUsuario ORDER BY count(mf.idMensaje_foro) DESC';
        let queryAutor = mysql.format(selectQueryAutor,["mensaje_foro","foro","usuario"]);
        pool.query(queryAutor,(err,dataAutores) => {
            if(err){
                console.error(err);
                throw error;
            }else{
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
                        nombreUsuario: req.session.nombre,
                        foros:data,
                        autores:dataAutores
                    });
                }
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
router.post('/deleteMensajeForo/:mensajeId', crud.deleteMensajeForo);
//Datos login
router.get('/profileView/:id', (req,res)=>{
    const id = req.session.idUsuario;
    selectQuery = 'SELECT nombre, email FROM ?? WHERE ?? = ?';
    query = mysql.format(selectQuery,["usuario","idusuario",id]);
    let usuario;
    pool.query(query,(error, user)=>{
        if(error){
            throw error;
        }else{
            usuarioLogin=user[0];
        }
    })
});

module.exports = router;