// let Sequelize = require('sequelize');
// // Option 2: Passing parameters separately (other dialects)
// module.exports = new Sequelize('pqrs', 'root', 'AsdfLkjh@1234', {        //sequelize-db
//     host: 'localhost',
//     dialect: 'mysql' 
//   });

const { Sequelize }     = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DATABASE, process.env.SQL_USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mssql',  
    dialectOptions: {
        options: {
            encrypt: true,  
            trustServerCertificate: false, 
        },
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
});

module.exports = sequelize;
