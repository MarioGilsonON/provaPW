"use strict";
const mongo = require("mongodb").MongoClient;
const dbConf = require('../config/conf.json');
const client = new mongo(dbConf.url, { useUnifiedTopology: true });
let db = null;
let usersColl = null;

//  conectando ao BD
function connect (connectionReady){
    client.connect((err) => {
        if (err === null) {
            db = client.db(dbConf.db);
            usersColl = db.collection(dbConf.colls.users)
            connectionReady();
          } else {
            console.log('Failed to connect to the db');
            console.log(err.stack);
              }
            });
          }

function disconnect (disconnected){
          if (client !== null && client.isConnected()) {
          client.close(() => {
            if (disconnected !== undefined)
                disconnected();
        });
      }
  }
//--------------------------
function users(name,location,post){
  this.id=null;
  this.name=name;
  this.location=location;
  this.post=post;
}

function nextID(idReady){
  const seqcoll = db.collection(dbConf.colls.sequences);
  seqcoll.findOneAndUpdate({name:'id'},{$inc: {value:1}},
  (err,res)=>{
      if(err != null){
        console.log(err);
      }
      idReady(res.value.value);
  });
}

const userDAO = {};
    userDAO.insert=(profile, sendStatus)=>{
      nextID((id)=>{
        if(id === null){
          console.log("Falha da geração de ID");
    sendStatus(false);
    }else{
      profile.id = id;
      usersColl.insertOne(profile, (err,res)=>{
      if(err === null){
        sendStatus(res.insertedCount > 0);
      }else{
        console.error(err.stack);
        sendStatus(false);
          }
        });
      }
  });

};


//======Listar Elementos da Coll======
userDAO.listAll = (sendResult) => {
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
    connect: connect,
     disconnect: disconnect,
     users: users,
     userDAO: userDAO

}
