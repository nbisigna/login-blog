const { Model, Sequelize } = require('sequelize');
const sequelize = require('../database');

class User extends Model {}

User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    resetPasswordToken: {
      type: Sequelize.STRING
    },
    resetPasswordExpires: {
      type: Sequelize.DATE
    }
  },
  {
    sequelize,
    modelName: 'user'
  }
);
// sequelize.sync();
module.exports = User;
