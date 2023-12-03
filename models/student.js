// const Sequelize = require('sequelize');
// const db = require('../config/database');

// const Student = db.define('student', {
//   id:{
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//     autoIncrement: true,
//   },
//   sname: {
//     type: Sequelize.STRING
//   },
//   sphone: {
//     type: Sequelize.STRING
//   },
//   age: {
//     type: Sequelize.INTEGER
//   },
//   contact_email: {
//     type: Sequelize.STRING,
//     isEmail:true
//   }, 
//   gender:{
//     type:Sequelize.STRING
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

// module.exports = Student;

const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Student = db.define('student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  sname: {
    type: DataTypes.STRING,
  },
  sphone: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  contact_email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  gender: {
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

module.exports = Student;
