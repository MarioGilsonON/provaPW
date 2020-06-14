"use strict";

const model = require('./model-users.js');
const post = require('./model-posts.js');

const usersInfo = [
   new model.users(
  "Djonatas Santos Silva Silveira",
  "São Paulo - SP",
  "São Paulo não é um bom lugar para se viver"),
  new model.users(
 "Fulano de tal",
 "Rio de Janeiro - RJ",
 "RIO 40graus"
)
];

const postsInfo = [
   new post.posts(
  "Centurião da Silva",
  "a0001",
  "Incredibilis, Infirmus ... Etiam"),
  new post.posts(
 "Valquiria Rasteira",
 "a0001",
 "Rrrapniapnieh"
)
];

function testInsert(){
  model.connect(()=>{
  console.log("connected to database... up and runnin");

  let remaining = usersInfo.length;
      usersInfo.forEach(info =>
        model.UserDAO.insert(info, (status)=>{
          console.log(`Inserted user info with success, status: ${status}`);
          remaining--;
          if(remaining == 0)
            model.disconnect();

        })
      );
    });
}

function testInsertPost(){
  model.connect(()=>{
  console.log("connected to database... up and runnin again");

  let remaining = postsInfo.length;
      postsInfo.forEach(info =>
        post.postsDAO.insert(info, (status)=>{
  console.log(`Inserted posts info with success, status: ${status}`);
          remaining--;
          if(remaining == 0)
          model.disconnect();

        })
      );
    });
}



// function testListAll(){
//   model.connect(()=>{
//     model.UserDAO.listAll((docs)=>{
//       console.log("Listing elements: ");
//       console.log(docs);
//       model.disconnect();
//     });
//   });
// }

testInsert();
 // testInsertPost();
// testListAll();
