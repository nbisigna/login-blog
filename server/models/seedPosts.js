const Post = require('./Post');

Post.bulkCreate([
  { title: 'first post', body: 'Hello world' },
  { title: 'second post', body: 'goodbye world' },
  { title: 'Yo sup', body: 'Hello how is everybody doing' }
]);
