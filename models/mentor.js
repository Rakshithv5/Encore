const Sequelize = require('sequelize');
const db = require('../config/database');


const Mentor = db.define('mentor', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  mname: {
    type: Sequelize.STRING
  },
  mphone: {
    type: Sequelize.STRING
  },
  address:{
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  },
  gender: {
    type: Sequelize.STRING
  },
  contact_email: {
    type: Sequelize.STRING,
    isEmail:true
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

module.exports = Mentor;