// const Sequelize = require('sequelize');
// const db = require('../config/database');


// const Comments = db.define('comment', {
//   id:{
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//     autoIncrement: true,
//   },
//   teacher:{
//     type: Sequelize.STRING
//   },
//   body:{
//     type: Sequelize.STRING
//   },
//   createdAt: {
//     type: Sequelize.DATE,
//     defaultValue: Sequelize.literal('NOW()')
//   },
//   updatedAt: {
//     type: Sequelize.DATE,
//     defaultValue: Sequelize.literal('NOW()')
//   }
// },{
//   timestamp:false
// });

// module.exports = Comments;

const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Comments = db.define('comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  teacher: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('GETDATE()'), 
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('GETDATE()'), 
  },
}, {
  timestamps: false,
});

module.exports = Comments;
