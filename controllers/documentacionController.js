// Controlador del apartado trending
exports.documentacion = async(req, res)=>{
    if(typeof req.session.loggedin != "undefined"){
        res.render('documentacionView',{
            login: true
        })
    }else{
        res.render('index',{
            login: false,
            name: 'Por favor, inicie sesión'
        })
    }
};