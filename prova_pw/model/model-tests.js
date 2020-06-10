"use strict";

const model = require('./model-users.js');
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


function testInsert(){
  model.connect(()=>{
  console.log("connected to database... up and runnin");

  let remaining = usersInfo.length;
      usersInfo.forEach(info =>
        model.userDAO.insert(info, (status)=>{
          console.log(`Inserted Element ok good to go ok ok ok  ... status: ${status}`);
          remaining--;
          if(remaining == 0)
          model.disconnect();

        })
      );
    });
}


function testListAll(){
  model.connect(()=>{
    model.userDAO.listAll((docs)=>{
      console.log("Listing elements: ");
      console.log(docs);
      model.disconnect();
    });
  });
}

// testInsert();
testListAll();
