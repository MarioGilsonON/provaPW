
const mdlUser = require("../model/model-users.js");
const db = require("../config/conf.json").db;
const colls = require("../config/dbconnect.js").colls;
const bcrypt = require('bcryptjs');


exports.Insert = ()=>{
  dbconnection.connect(()=>{
  console.log("connected to database... up and runnin");
  mdlUser.userDAO.insert(info, (status)=>{
    console.log(`User subscribed! Status: ${status}`);
        mdlUser.disconnect();
        });
    });
}

// LOGIN
exports.login = (req,res)=>{
 res.render('login',{
   style:'allStyle'
 })
}

exports.fazlogin = (req, res) => {
    const lgduser = new mdlUser.Users();

    lgduser.email = req.body.email;
    lgduser.pass = req.body.pass;

    if (lgduser.isValid()) {

        mdlUser.UserDAO.findByEmail(lgduser.email, emailuser => {
            if (emailuser !== null) {
                bcrypt.compare(lgduser.pass, emailuser.pass,
                    (err, matched) => {
                        if (matched) {
                            req.session.authenticated = true;
                                if(req.session.authenticated === true){
                                  console.log("TA SUPER LOGADO");
                                res.render('inicio', {user:emailuser});
                                 }
                                else {console.log("NAUM LOGGED");}
                        } else{
                          console.log("NÃO LOGADO");
                        }
                      });
                    }
                  });
                }
              }


exports.logout = (req, res) => {
    if (req.session.authenticated) {
      if(req.session.authenticated){ console.log(" LOGADO SIM");}else{console.log("LOGADO NAO");}
        req.session.authenticated = false;
        req.session.flash = {
            type: 'logout'
        }
    }
    res.redirect('/');
};
