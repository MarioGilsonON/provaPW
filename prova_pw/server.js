"use strict";

const express = require('express');
const process = require('process');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const model = require('./model/model-users.js');

const app = express();

model.connect(() => {
    console.log('Database connected');
    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
});
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(bodyParser.urlencoded({extended: true}));

function authenticate(req, res, next) {
    if (req.session.authenticated)
        next();
    else
        res.redirect('/login');
}


process.on('exit', (code) => {
    console.log(`Server exiting with code ${code}`);
  model.disconnect(() => {
        console.log('Database disconnected');
    });
});

let exitHandler = (code) => {
    process.exit();
}
process.once('SIGINT', exitHandler);
process.once('SIGUSR2', exitHandler);

let img="images";
//routes
app.get('/user/:name', (req,res)=>{
    res.render('inicio', {
      title:"Handlebars test",
      name:req.params.name,
      imagem:img
    });
});
