const express = require('express');
const router = express.Router();
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
        


router.get('/',(req,res)=>{
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

module.exports = router;