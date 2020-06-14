
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
                            req.session.flash = {
                              type:'login',
                              name:emailuser.name
                            }
                            req.session.username = {
                              type:"autocomplete",
                              author:emailuser.name,
                              location:emailuser.location
                            }
                              res.render('inicio', {user:emailuser});

                        } else{
                          console.log("Erro no login ... ");
                        }
                      });
                    }
                  });
                }
              }


exports.logout = (req, res) => {
    if (req.session.authenticated) {
        req.session.authenticated = false;
        req.session.flash = {
            type: 'logout'
        }
    }
    res.redirect('/');
};
