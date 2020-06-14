"use strict";

const model = require('./model-users.js');
const posts = require('./model-posts.js');
const dbconnect = require('../config/dbconnect.js');

// const usersInfo = [
//    new model.users(
//   "Djonatas Santos Silva Silveira",
//   "São Paulo - SP",
//   "São Paulo não é um bom lugar para se viver"),
//   new model.users(
//  "Fulano de tal",
//  "Rio de Janeiro - RJ",
//  "RIO 40graus"
// )
// ];
const postsInfo = [
   new posts.Posts(
  "Cidade de Deus",
  "a0001",
  "São Paulo não é um bom lugar para se viver",
  "Jonatas"
) ,
  new posts.Posts(
    "Cidade dos Homens",
    "a0002",
    "Tropa de Elite Osso Duro de Roer",
    "Jonatas O'Outro"
)
];


function testInsert(){
  dbconnect.connect(()=>{
  console.log("connected to database... up and runnin");

  let remaining = postsInfo.length;
      postsInfo.forEach(info =>
        posts.PostsDAO.insert(info, (status)=>{
          console.log(`\nInserted Element ok good to go ok ok ok  ... status: ${status}`);
          remaining--;
          if(remaining == 0)
          dbconnect.disconnect();

        })
      );
    });
}

//
// function testListAll(){
//   model.connect(()=>{
//     model.userDAO.listAll((docs)=>{
//       console.log("Listing elements: ");
//       console.log(docs);
//       model.disconnect();
//     });
//   });
// }

testInsert();
// testListAll();
