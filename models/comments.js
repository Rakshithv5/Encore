const Sequelize = require('sequelize');
const db = require('../config/database');


const Comments = db.define('comment', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  teacher:{
    type: Sequelize.STRING
  },
  body:{
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()')
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()')
  }
},{
  timestamp:false
});

module.exports = Comments;