const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { sequelize, modelName: 'post' }
);
// sequelize.sync();
module.exports = Post;
