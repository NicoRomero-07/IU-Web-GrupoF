var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'userbdtaw',
    password : '1234',
    database : 'Bocaillo'
});

//CRUD Foro
function addRowForo(propietario,nombre,descripcion,categoria) {
    let selectQuery = 'INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)';
    let query = mysql.format(selectQuery,["foro","Propietario","Nombre","Descripcion","Categoria",propietario,nombre,descripcion,categoria]);
    pool.query(query,(err,data) => {
        if(err){
            console.error(err);
            return;
        }
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
    });
}



addRowUsuario("NicoZ","nicoZ@uma.es",123);

