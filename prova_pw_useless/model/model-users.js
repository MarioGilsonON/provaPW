"use strict";


const colls = require('../config/dbconnect.js').colls;

function users(name,email,pass,location,post){
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
UserDAO.toObj = function(doc) {
    const user = new users();

    user.id = doc.id;
    user.name = doc.name;
    user.location = doc.location;
    user.post = doc.post;


    return user;
}

UserDAO.toDoc = function(user) {
    return {
        id: user.id,
        name: user.name,
        location: user.location,
        post: user.post
    }
}


//======Listar Elementos da Coll======
UserDAO.listAll = (sendResult) => {
  usersColl.find({},{projection:{_id:0}}).toArray((err,docs) =>{
    if(err === null){
      const usersProf = [];
      docs.forEach(doc => {
        const prof = new users(
            doc.name,
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


module.exports={

       users: users,
     UserDAO: UserDAO

}
