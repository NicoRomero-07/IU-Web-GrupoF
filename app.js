const express = require('express');

const { json } = require('express/lib/response');
const bcrypt = require('bcryptjs/dist/bcrypt');
const app = express();

app.set('view engine','ejs');

app.use(express.static( "views" ) );
app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use(express.urlencoded({extended:false}));
app.use(express(json));

app.use('/',require('./router'));

// 3 - Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'.env/.env'});

//4 - El directorio view
app.use('/resources',express.static('views'));
app.use('/resources',express.static(__dirname + '/views'));

// 5 - Establecemos el motor de plantillas ejs
app.set('view engine','ejs');

// 6 - Invocamos a bryptjs
const bcryptjs = require('bcryptjs');

// 7 - Variable de session
const session = require('express-session');
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));

//8 - Invocamos a la bd
const connection = require('./database/db_connection');
const pool = connection.pool;

// Cotrolador del registro
app.post('/registerform', async (req, res)=>{
    const usuario = req.body.usuario;
    const password = req.body.password;
    const password2 = req.body.password2;
    const email = req.body.email;
    let passwordHash = await bcryptjs.hash(password,8);
    if(password == password2){
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
app.post('/loginform', async (req, res)=>{

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
                res.redirect('./index');
            }
        })
})

app.listen(5000,()=>{
    console.log('SERVER corriendo en http://localhost:5000');
});