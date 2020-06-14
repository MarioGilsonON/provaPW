"use strict";
const mdlPost = require("../model/model-posts.js");

const dbconnection = require("../config/dbconnect.js");



exports.insert = (req,res)=>{
  dbconnection.connect(()=>{
  console.log("connected to database... up and runnin");
  mdlPost.PostsDAO.insert(req.body, (status)=>{
    console.log(`Post information:`);
    console.log(req.body);
        dbconnection.disconnect();
        });
    });
}


exports.listarPosts = (req,res) =>{
  mdlPost.PostsDAO.listar(post =>{
      res.render('posts_list',{
        post:post,
        style:"allStyle"
      })
  });
}



exports.findById = (req,res)=>{
  let id = req.body.id;
  mdlPost.PostsDAO.findById(id, (status)=>{
    if(status){
    }else{
      console.log(`Post ID:${id} não localizado.`);
        mdlPost.PostsDAO.listar(post =>{
          res.render('posts_list',{
            post:post,
            style:"allStyle"
          })
        });
      }
  });
}

exports.openPost = (req,res) => {
    const id = parseInt(req.params.id);
    console.log(`found the id:${id}`);
    mdlPost.PostsDAO.findById(id, post =>{
      console.log(`found the id:${id}`);
      res.render('paginaPost', {
        post:post,
        style:'allStyle'
      })
    })
}
