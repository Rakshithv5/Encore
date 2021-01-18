const Sequelize = require('sequelize');
const db = require('../config/database');


const Payment = db.define('payment', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
    start_date:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW
    },
    dname:{
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
});

module.exports=Payment;