"use strict";

const mongo = require("mongodb").MongoClient;
const dbConf = require('./conf.json').db;
const client = new mongo(dbConf.url, { useUnifiedTopology: true });

exports.colls = {};

//  conectando ao BD
exports.connect=(connectionReady)=>{
    client.connect((err) => {
        if (err === null) {
          let  db = client.db(dbConf.db);
            exports.colls.users = db.collection(dbConf.colls.users);
            exports.colls.posts = db.collection(dbConf.colls.posts);
            exports.colls.sequences = db.collection(dbConf.colls.sequences);
              exports.colls.seqPosts = db.collection(dbConf.colls.seqPosts);
            connectionReady();
          } else {
            console.log('Failed to connect to the db');
            console.log(err.stack);
              }
            });
          }

exports.disconnect = (disconnected)=>{
          if (client !== null && client.isConnected()) {
          client.close(() => {
            if (disconnected !== undefined)
                disconnected();
        });
      }
  }
//--------------------------
