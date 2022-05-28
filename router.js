const express = require('express');
const router = express.Router();
const app = express();
const connection = require('./database/db_connection');
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

router.get('/index',(req,res)=>{
    let selectQuery = 'SELECT * FROM ??';
    let query = mysql.format(selectQuery,["foro"]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            throw error;
        }else{
            res.render('index',{foros:data});
        }
    });
    
});

//Acceso a crear foro
router.get('/createForo', (req,res)=>{
    pool.query('SELECT * FROM categoria', (error, categorias)=>{
        if(error){
            throw error;
        }else{
            console.log(req.session);
            res.render('createForo',{categorias:categorias});
        }
    })
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


const crud = require('./controllers/crud');
router.post('/crearForo', crud.crearForo);

router.get('/',(req,res)=>{
    res.render('login');
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

module.exports = router;