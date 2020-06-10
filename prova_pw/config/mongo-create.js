 db = connect('127.0.0.1:27017/myBlog');
 db.dropDatabase();
 db = connect('127.0.0.1:27017/myBlog');
 db.createCollection('users');
 db.users.createIndex(['id'], {unique: true});
 db.createCollection('sequences');
 db.sequences.insertOne({
     name: 'id',
     value: 1
 });
 db.createCollection('posts');
 db.posts.createIndex(['id'], {unique: true});
