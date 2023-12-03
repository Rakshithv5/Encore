// const Sequelize = require('sequelize');
// const db = require('../config/database');


// const Department = db.define('department', {
//   id:{
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//     autoIncrement: true,
//   },
//   dname: {
//     type: Sequelize.STRING
//   },
//   price: {
//     type: Sequelize.STRING
//   },
//   category: {
//     type: Sequelize.STRING,
//   },
//   headId:{
//     type: Sequelize.INTEGER
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

// module.exports = Department;

const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Department = db.define('department', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  dname: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  headId: {
    type: DataTypes.INTEGER,
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

module.exports = Department;
