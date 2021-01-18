
const mysql=require("mysql");
const express=require("express");
var app=express();
const Sequelize = require('sequelize');
let payment=require('../models/payment')
const Op = Sequelize.Op;
let department = require('../models/department')

app.get("/",(req,res)=>{
    payment.findAll()
    .then(stud =>{
       // console.log(stud);
        res.send(stud);
    })
    .catch(err =>{ console.log(err)});
})


app.get('/:id', (req, res) => {
    const id = req.params.id;
    payment.findAll({
      where: { id: id }
    })
      .then(pay => {
        res.send(pay);
      });
  });

// Add a gig
app.post('/add', (req, res) => {
    let { start_date, studentId,dname} = req.body;
    let errors = [];
  //res.send(dname);
    // Validate Fields
    if(!start_date) {
      errors.push({ text: 'Please add your start date' });
    }
    if(!studentId) {
      errors.push({ text: 'Please add some studentId' });
    }
    if(!dname) {
      errors.push({ text: 'Please add your dname' });
    }
  
    // Check for errors
    if(errors.length > 0) {
      res.send( {
        start_date,
        studentId,
        dname
      });
    } 
    else {
      // Insert into table
      department.findAll({
        where: { dname: dname },
        raw:true
      })
        .then(dep => {
          // let depid=dep.id;
          // console.log(dep.getDataValue('id'));
          // res.send(depid);
          //console.log(dep[0].id);
          let departmentId=dep[0].id;
          payment.create({
            start_date,
            dname,
            studentId,
            departmentId
          })
            .then(pay => res.redirect('/open'))
            .catch(err => res.redirect('/error_mentor'))
        });
  
       
      }
    });

    app.get('/delete/:id', (req, res) => {
        const id = req.params.id;
        payment.destroy({
          where: { id: id }
        })
        .then(deletedOwner => {
            res.redirect('/open');
          })
          .catch(err =>{
              res.send("something went wrong!!! Check your id");
          })
    });

module.exports =app;