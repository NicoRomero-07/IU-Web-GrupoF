const express = require('express');
const app = express();

app.use('/',require('./router'));
app.use(express.static( "views" ) );

app.set('view engine','ejs');

app.listen(5000,()=>{
    console.log('SERVER corriendo en http://localhost:5000');
});