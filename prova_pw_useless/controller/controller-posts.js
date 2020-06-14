"use strict";

const modelPosts=require("../model/model-posts.js");

exports.definePost=(req,res)=>{
  modelPosts.postsDAO.listAll(posts =>
    res.render('posts_list', {
      style:'allStyle',
      posts:postsDAO.posts
    }));
}
