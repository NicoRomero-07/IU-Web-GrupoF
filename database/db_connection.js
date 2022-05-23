const mysql = require('mysql');

const pool  = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'userbdtaw',
    password : '1234',
    database : 'bocaillo'
});

function readUsuario (id){
    let selectQuery = 'SELECT ?? FROM ?? WHERE ?? = ?';
    let query = mysql.format(selectQuery,["nombre","usuario","idUsuario",id]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data[0].nombre);
    });
};

module.exports = {pool,mysql,readUsuario};
/*
//CRUD Foro
function addRowForo(propietario,nombre,descripcion,categoria) {
    let selectQuery = 'INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)';
    let query = mysql.format(selectQuery,["foro","Propietario","Nombre","Descripcion","Categoria",propietario,nombre,descripcion,categoria]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
} 

function queryRowForo(userID) {
    let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';    
    let query = mysql.format(selectQuery,["foro","Propietario", userID]);
    pool.query(query,(err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        return(data);
    });
}  
function updateRowForo(foroID,propietario,nombre,descripcion,categoria) {
    let selectQuery = 'UPDATE ?? SET ??=?,??=?,??=?,??=? WHERE ?? = ?';
    let query = mysql.format(selectQuery,["foro","Propietario",propietario,"Nombre",nombre,"Descripcion",descripcion,"Categoria",categoria,"idForo",foroID]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
} 

function deleteRowForo(foroID) {
    let selectQuery = 'DELETE FROM ?? WHERE ?? = ?';
    let query = mysql.format(selectQuery,["foro","idForo",foroID]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
} 

//CRUD Usuario
function addRowUsuario(nombre,email,contrasenya) {
    let selectQuery = 'INSERT INTO ?? (??,??,??) VALUES (?,?,?)';
    let query = mysql.format(selectQuery,["usuario","nombre","email","contrasenya",nombre,email,contrasenya]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
}

function queryRowUsuario(nombreUsuario) {
    let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
    let query = mysql.format(selectQuery,["usuario","nombre",nombreUsuario]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
}   

function updateRowUsuario(usuarioID,nombre,email,contrasenya) {
    let selectQuery = 'UPDATE ?? SET ??=?, ??=?, ??=? WHERE ?? = ?';
    let query = mysql.format(selectQuery,["usuario","nombre",nombre,"email",email,"contrasenya",contrasenya,"idUsuario",usuarioID]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
}

function deleteRowUsuario(usuarioID) {
    let selectQuery = 'DELETE FROM ?? WHERE ?? = ?';
    let query = mysql.format(selectQuery,["usuario","idUsuario",usuarioID]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
}

//CRUD Categoria
function addRowCategoria(nombre) {
    let selectQuery = 'INSERT INTO ?? (??) VALUES (?)';
    let query = mysql.format(selectQuery,["categoria","nombre",nombre]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
}

function queryRowCategoria(nombre) {
    let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
    let query = mysql.format(selectQuery,["categoria","nombre",nombre]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
}   

function updateRowCategoria(categoriaID,nombre) {
    let selectQuery = 'UPDATE ?? SET ??=? WHERE ?? = ?';
    let query = mysql.format(selectQuery,["categoria","nombre",nombre,"idCategoria",categoriaID]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
}

function deleteRowCategoria(categoriaID) {
    let selectQuery = 'DELETE FROM ?? WHERE ?? = ?';
    let query = mysql.format(selectQuery,["categoria","idCategoria",categoriaID]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
}

//CRUD Mensaje Foro
function addRowMensajeForo(contenido,foro,emisor,fechaEmision) {
    let selectQuery = 'INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)';
    let query = mysql.format(selectQuery,["mensaje_foro","foro","emisor","fechaEmision",contenido,foro,emisor,fechaEmision]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
}

function queryRowMensajeForo(foroID) {
    let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
    let query = mysql.format(selectQuery,["mesaje_foro","foro",foroID]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
}   

function updateRowMensajeForo(mensajeID,contenido,foro,emisor,fechaEmision) {
    let selectQuery = 'UPDATE ?? SET ??=?,??=?,??=?,??=? WHERE ?? = ?';
    let query = mysql.format(selectQuery,["mensaje_foro","contenido",contenido,"foro",foro,"emisor",emisor,"fechaEmision",fechaEmision,"idMensaje_foro",mensajeID]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
}

function deleteRowMensajeForo(mensajeID) {
    let selectQuery = 'DELETE FROM ?? WHERE ?? = ?';
    let query = mysql.format(selectQuery,["mensaje_foro","idMensaje_foro",mensajeID]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
}

//CRUD Mensaje privado
function addRowMensajePrivado(contenido,emisor,receptor,fechaEmision) {
    let selectQuery = 'INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)';
    let query = mysql.format(selectQuery,["mensaje_privado","emisor","receptor","fechaEmision",contenido,emisor,receptor,fechaEmision]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
}

function queryRowMensajePrivado(emisorID,receptorID) {
    let selectQuery = 'SELECT * FROM ?? WHERE ?? = ? AND ?? = ?';
    let query = mysql.format(selectQuery,["mesaje_privado","emisor",emisorID,"receptor",receptorID]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
}   



function updateRowMensajePrivado(mensajeID,contenido,emisor,receptor,fechaEmision) {
    let selectQuery = 'UPDATE ?? SET ??=?,??=?,??=?,??=? WHERE ?? = ?';
    let query = mysql.format(selectQuery,["mensaje_privado","contenido",contenido,"emisor",emisor,"receptor",receptor,"fechaEmision",fechaEmision,"idMensaje",mensajeID]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
}

function deleteRowMensajePrivado(mensajeID) {
    let selectQuery = 'DELETE FROM ?? WHERE ?? = ?';
    let query = mysql.format(selectQuery,["mensaje_privado","idMensaje",mensajeID]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        return(data);
    });
}
*/





