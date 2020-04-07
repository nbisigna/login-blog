process.env.NODE_ENV != 'production' ? require('dotenv').config() : null;
const express = require('express');
const app = express();
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

var cookieParser = require('cookie-parser');

app.use(cookieParser());

require('./server/database');

const posts = require('./server/routes/posts');
app.use('/posts', posts);
const users = require('./server/routes/users');
app.use('/users', users);

const port = process.env.PORT || 3000;

app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/404.html');
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
