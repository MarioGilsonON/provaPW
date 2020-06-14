"use strict";

const express = require('express');
const process = require('process');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoConnect = require('./config/dbconnect.js');
const app = express();
//models
const model = require('./model/model-users.js');
const post = require('./model/model-posts.js');
//===================================

//Controllers
const controlUsers = require('./controller/controller-users.js');
const controlPosts = require('./controller/controller-posts.js');
//=========================

mongoConnect.connect(() => {
    console.log('Database connected');
    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
});
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/lib/bootstrap', express.static(path.join(__dirname,'node_modules','bootstrap','dist')));
app.use('/lib/jquery', express.static(path.join(__dirname,'node_modules','jquery','dist')));


function authenticate(req, res, next) {
    if (req.session.authenticated)
        next();
    else
        res.redirect('/login');
}


process.on('exit', (code) => {
    console.log(`Server exiting with code ${code}`);
  mongoConnect.disconnect(() => {
        console.log('Database disconnected');
    });
});

let exitHandler = (code) => {
    process.exit();
}
process.once('SIGINT', exitHandler);
process.once('SIGUSR2', exitHandler);


//routes
app.get('/', (req,res)=>{
    res.render('inicio', {
      title:"Início",
      name:req.params.name
    });
});
app.get('/inicio', (req,res)=>{
    res.render('inicio', {
      title:"Início",
      name:req.params.name
    });
});

var postID="a0001";
app.get('/login', (req,res)=>{
   res.render('login', {
     title:"Login",
     style:"allStyle"

   });

});
app.get('/posts', controlPosts.definePost);
