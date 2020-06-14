"use strict";


const colls = require("../config/dbconnect.js").colls;



//_________________Definições_________________________

function Posts(title, img, content, author, location){
  this.id=null;
  this.title=title;
  this.img=img;
  this.content=content;
  this.author=author;
  this.location=location;
}

const PostsDAO = {};

function nextID(idReady){
  colls.seqPosts.findOneAndUpdate({name:'id'},{$inc: {value:1}},
  (err,res)=>{
      if(err != null){
        console.log(err);
      }
      idReady(res.value.value);
  });
}


PostsDAO.insert=(postinfo, sendStatus)=>{
      nextID((id)=>{
        if(id === null){
          console.log("Falha da geração de ID");
    sendStatus(false);
    }else{
      postinfo.id = id;
      colls.posts.insertOne(PostsDAO.toDoc(postinfo), (err,res)=>{
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

PostsDAO.toObj = function(doc) {
    const post = new Posts();

    post.id = doc.id;
    post.title=doc.title;
    post.img = doc.img;
    post.content = doc.content;
    post.author = doc.author;
    post.location = doc.location;

    return post;
}

PostsDAO.toDoc = function(post) {
    return {
        id: post.id,
        title: post.title,
        img: post.img,
        content: post.content,
        author: post.author,
        location:post.location
    }
}

//________________________________________________



PostsDAO.findById = function(id, sendResult) {
    colls.posts.findOne({ id: id }, (err, res) => {
        if (err !== null) {
            console.log(err.stack);
            sendResult(null);

        } else if (res === null) {
            sendResult(null);

        } else {
            sendResult(PostsDAO.toObj(res));
        }
    });
};


PostsDAO.listar = function(sendResult){
  colls.posts.find({}, {projection: {_id: 0}}).toArray((err, docs) => {
    const vecPosts = [];

    docs.forEach(doc => {
        const item = PostsDAO.toObj(doc);

        item.id = doc.id;
        vecPosts.push(item);
    });
    sendResult(vecPosts);
  })
}



// EXPORTS
module.exports={
  Posts:Posts,
  PostsDAO:PostsDAO
}
