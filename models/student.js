const Sequelize = require('sequelize');
const db = require('../config/database');

const Student = db.define('student', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  sname: {
    type: Sequelize.STRING
  },
  sphone: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  },
  contact_email: {
    type: Sequelize.STRING,
    isEmail:true
  }, 
  gender:{
    type:Sequelize.STRING
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

module.exports = Student;