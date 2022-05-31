var express = require('express');

//Inicializamos variables
var { json } = require('express/lib/response');
var bcrypt = require('bcryptjs/dist/bcrypt');
var cookieParser = require('cookie-parser');
var app = express();
var path = require('path');

var session = require('express-session');
var indexRouter = require('./routes/router');

//Establecemos el motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

//Iniciamos session y otros parametros
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/views')));

app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));

app.use('/',indexRouter);

// 3 - Invocamos a dotenv
var dotenv = require('dotenv');
dotenv.config({path:'.env/.env'});

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log('SERVER corriendo en http://localhost:5000');
});

module.exports = app;