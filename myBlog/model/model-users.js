"use strict";

const colls= require("../config/dbconnect.js").colls;

// Definições
function Users(name,email,pass,location,post){
  this.id=null;
  this.name=name;
  this.email=email;
  this.pass=pass;
  this.location=location;
  this.post=post;
}

function nextID(idReady){
  colls.sequences.findOneAndUpdate({name:'id'},{$inc: {value:1}},
  (err,res)=>{
      if(err != null){
        console.log(err);
      }
      idReady(res.value.value);
  });
}


const UserDAO = {};

UserDAO.toDoc = function (profile) {
    return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        pass: profile.pass,
        location: profile.location,
        post: profile.post
    }
}
UserDAO.toObj = function (doc) {
  const user = new Users();
        user.id= doc.id,
        user.name= doc.name,
        user.email= doc.email,
        user.pass= doc.pass,
        user.location= doc.location,
        user.post= doc.post

}

UserDAO.findByEmail = function(email, sendResult) {
    colls.users.findOne({email: email}, (err, res) => {
        if (err !== null ) {
            console.log(err.stack);
            sendResult(null);
            console.log("error");
        } else if (res == null) {
          console.log("Email vazio");
            sendResult(res);
        } else {
          console.log("Email encontrado");

            sendResult(res);
        }
    });
};

    UserDAO.insert=(profile, sendStatus)=>{
      nextID((id)=>{
        if(id === null){
          console.log("Falha da geração de ID");
    sendStatus(false);
    }else{
      profile.id = id;
      colls.users.insertOne(useDAO.toDbLiteral(profile),
          (err, res) => {
              if (err === null) {
                  sendStatus(res.insertedCount > 0);
              } else {
                  console.log(err.stack);
                  sendStatus(false);
            }
          }
       );
     }
   });
};



//======Listar Elementos da Coll======

UserDAO.listAll = (sendResult) => {
  colls.users.find({},{projection:{_id:0}}).toArray((err,docs) =>{
    if(err === null){
      const usersProf = [];
      docs.forEach(doc => {
        const prof = new users(
            doc.name,
            doc.email,
            doc.pass,
            doc.location,
            doc.post
          );
          prof.id = doc.id;
          usersProf.push(prof);
        });

        sendResult(usersProf);
      }else{
      console.log(err.stack);
      sendResult([]);
    }
  });
}

//==================================

Users.prototype.isValid = function () {
    const reducer = (acc, cur) =>
        acc && cur !== undefined && cur !== null && cur.trim() != '';

    return [this.email, this.pass].reduce(reducer, true);
};

module.exports={
     Users: Users,
     UserDAO: UserDAO

}
