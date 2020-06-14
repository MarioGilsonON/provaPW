"use strict";

const express = require('express');
const process = require('process');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mdlUser = require('./model/model-users.js');
const mdlPost = require('./model/model-posts.js');
const ctrUser = require('./controller/controller-users.js');
const ctrPost = require('./controller/controller-posts.js');
const config = require("./config/conf.json");
const dbconnection = require("./config/dbconnect.js");

const app = express();

dbconnection.connect(() => {
    console.log('Database connected');
    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
});

// handlebars ---------------
app.engine('handlebars', handlebars({
  helpers:{
    equals: (a, b) => a == b
  }
}));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use(bodyParser.urlencoded({extended: true}));

//---------------------------

app.use(session ({
  secret: config.secret,
  resalve: false,
  saveUninitialized: false
}));

function authenticate(req, res, next) {
    if (req.session.authenticated)
        next();
    else
        res.render('login', {validate:"invalid"});
}


process.on('exit', (code) => {
    console.log(`Server exiting with code ${code}`);
  dbconnection.disconnect(() => {
        console.log('Database disconnected');
    });
});

let exitHandler = (code) => {
    process.exit();
}
process.once('SIGINT', exitHandler);
process.once('SIGUSR2', exitHandler);

app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.username = req.session.username;
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

//routes ------------------------------------------------->
app.get('/', (req,res)=>{
    res.render('inicio', {
      title:"Início",
      name:req.params.name
    });
});


app.get('/fazerPostagem', authenticate, (req,res)=>{
    res.render('fazPost', {
      title:"Novo post"
    });
});

app.get("/posts_list", ctrPost.listarPosts);
app.post("/submeterPostagem", ctrPost.insert);
app.get("/postPage/:id", ctrPost.openPost);

app.get("/login", ctrUser.login);
app.get("/logout", ctrUser.logout);
app.post("/enter", ctrUser.fazlogin);
