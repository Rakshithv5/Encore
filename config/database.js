let Sequelize = require('sequelize');
// Option 2: Passing parameters separately (other dialects)
module.exports = new Sequelize('pqrs', 'root', '', {        //sequelize-db
    host: 'localhost',
    dialect: 'mysql' 
  });