 db = connect('127.0.0.1:27017/myBlog');
 db.dropDatabase();
 db = connect('127.0.0.1:27017/myBlog');
 db.createCollection('users');
 db.users.createIndex({'id':1}, {unique: true});
 db.createCollection('sequences');
 db.sequences.insertOne({
     name: 'id',
     value: 1
 });
 db.seqPosts.insertOne({
     name: 'id',
     value: 1
 });
 db.createCollection('posts');
 db.posts.createIndex({'id': 1}, {unique: true});

//insert para teste
 db.users.insert({
  "name":"Lucas Santos",
 "email":"lucass96@gmail.com",
 "pass":"$2a$10$A7f7TEWemeSLsSOetV0pDOVgKBEk5Tqr5sA1hI.BIzQ6LXpUOzxmO",
 "location":"São Paulo - SP"
});
