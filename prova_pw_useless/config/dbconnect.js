
"use strict";
const mongo = require("mongodb").MongoClient;
const dbConf = require('../config/conf.json');
const client = new mongo(dbConf.url, { useUnifiedTopology: true });


// connect & disconnect ----
exports.colls = {};

exports.connect= (connectionReady)=>{
    client.connect((err) => {
        if (err === null) {
            let db = client.db(dbConf.db);
          exports.userColls = db.collection(dbConf.colls.users)
            exports.postsColl = db.collection(dbConf.colls.posts)
            connectionReady();
          } else {
            console.log('Failed to connect to the db');
            console.log(err.stack);
              }
            });
          }

exports.disconnect= (disconnected)=>{
          if (client !== null && client.isConnected()) {
          client.close(() => {
            if (disconnected !== undefined)
                disconnected();
        });
      }
  }


//--------------------------
