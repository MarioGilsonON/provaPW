"use strict";
const mongo = require("mongodb").MongoClient;
const dbConf = require('../config/conf.json');
const client = new mongo(dbConf.url, { useUnifiedTopology: true });
const colls = require('../config/dbconnect.js').colls;



function posts(author, imgcapa, content){
  this.post_id=null;
  this.author=author;
  this.imgcapa=imgcapa;
  this.content=content;
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


const postsDAO = {};
    postsDAO.insert=(post, sendStatus)=>{
      nextID((id)=>{
        if(id === null){
          console.log("Falha da geração de ID");
    sendStatus(false);
    }else{
      post.id = id;
      postsColl.insertOne(post, (err,res)=>{
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
postsDAO.listAll = (sendResult) => {
  colls.posts.find({},{projection:{_id:0}}).toArray((err,docs) =>{
    if(err === null){
      const postsProf = [];
      docs.forEach(doc => {
        const post = new posts(
          doc.author,
          doc.imgcapa,
          doc.content
          );
          post.id = doc.id;
          usersProf.push(prof);
        });

        sendResult(postsProf);
      }else{
      console.log(err.stack);
      sendResult([]);
    }
  });
}

module.exports={
  postsDAO:postsDAO,
  posts:posts
}
