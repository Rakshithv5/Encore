let Sequelize = require('sequelize');
// Option 2: Passing parameters separately (other dialects)
module.exports = new Sequelize('pqrs', 'root', 'AsdfLkjh@1234', {        //sequelize-db
    host: 'localhost',
    dialect: 'mysql' 
  });