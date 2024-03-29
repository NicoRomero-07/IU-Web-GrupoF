const express = require('express');
const router = express.Router();
const connection = require('../database/db_connection');
const pool = connection.pool;
const mysql = connection.mysql;
const bcrypt = require('bcryptjs/dist/bcrypt');
const bcryptjs = require('bcryptjs');
const buscarForoController = require('../controllers/buscarForoController');
const datosLoginController = require('../controllers/datosLoginController');
const chatController = require('../controllers/chatController');
const editarPerfilController = require('../controllers/editarPerfilController');

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
            name: 'Por favor, inicie sesión'
        })
    }
});

const crud = require('../controllers/crud');
router.post('/crearForo', crud.crearForo);
router.get('/perfilAutor/:id', crud.vistaAutor);
router.get('/createForo', crud.createForoLoadView);
router.get('/borrarUsuario', crud.borrarUsuario);
router.get('/ultimoForo',crud.irUltimoForo);



const loginController = require('../controllers/loginController');
router.post('/loginform', loginController.loginform);

const registerController = require('../controllers/registerController');
router.post('/registerform', registerController.registerform);

const trendingController = require('../controllers/trendingController');
router.get('/trending', trendingController.trending);

const listaUsuariosController = require('../controllers/listaUsuariosController');
router.get('/listaUsuarios', listaUsuariosController.listaUsuarios);
//Filtrar lista usuarios
router.post('/listaUsuarios/filtro',listaUsuariosController.listaUsuariosFiltrada);

const categoriasController = require('../controllers/categoriasController');
router.get('/categorias', categoriasController.lista);

const sesionController = require('../controllers/sesionController');
router.get('/cerrarSesion', sesionController.cerrarSesion);

const documentacionController = require('../controllers/documentacionController');
router.get('/documentacion',documentacionController.documentacion);

const buscarCategoriaController = require('../controllers/buscarCategoriaController');
router.post('/categorias/filtro',buscarCategoriaController.buscarCategoria);

//Enviar mensaje foro
router.post('/enviarMensajeForo',crud.mesajeForo);



router.get('/',(req,res)=>{
    return res.render('login',{nombreUsuario:undefined, idUsuario: undefined});
});

router.get('/register',(req,res)=>{
    res.render('register', {nombreUsuario:undefined, idUsuario: undefined});
});

router.get('/confirmed',(req,res)=>{
    res.render('confirmed', {nombreUsuario:req.session.usuario});
});

router.get('/confirmeEmail',(req,res)=>{
    res.render('confirmeEmail', {nombreUsuario:req.session.usuario});
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
                let selectQuery = 'SELECT f.idForo, f.propietario,f.descripcion, f.nombre AS nombreForo, c.nombre AS nombreCategoria FROM ?? f JOIN ?? c ON c.idCategoria=f.categoria';
                let query = mysql.format(selectQuery,["foro","categoria"]);
                pool.query(query,(err,data) => {
                if(err){
                    console.error(err);
                    throw error;
                }else{
                    res.render('index',{
                        login:true,
                        idUsuario: req.session.idUsuario,
                        nombreUsuario: req.session.usuario,
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
            name: 'Por favor, inicie sesión'
        })
    }
});

router.post('/buscarForo', buscarForoController.buscarForo);
router.post('/deleteMensajeForo/:mensajeId', crud.deleteMensajeForo);
router.post('/enviarMensajePrivado', chatController.enviarMensaje);
router.post('/perfilEditado', editarPerfilController.modificarDatos);
router.get('/vistaPerfil', datosLoginController.getLogin);
router.get('/vistaChat/:usuarioId', chatController.getMensajes);
router.get('/editarPerfil', editarPerfilController.getDatos);


module.exports = router;