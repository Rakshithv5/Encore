const mysql=require("mysql");
const express=require("express");
var app=express();
const Sequelize = require('sequelize');
let department=require('../models/department')
const Op = Sequelize.Op;

app.get("/",(req,res)=>{
    department.findAll()
    .then(result =>{
       res.render("showDepartment",{dropdown:result})
    })
    .catch(err =>{ console.log(err)});


})

app.get('/:id', (req, res) => {
    const id = req.params.id;
    department.findAll({
      where: { id: id }
    })
      .then(stud => {
        res.send(stud);
      });
  });


app.post('/add', (req, res) => {
    let { dname, price, category, headId } = req.body;
    let errors = [];
  
    // Validate Fields
    if(!dname) {
      errors.push({ text: 'Please add department name' });
    }
    if(!price) {
      errors.push({ text: 'Please add price' });
    }
    if(!category) {
      errors.push({ text: 'Please add your category' });
    }
    if(!headId) {
      errors.push({ text: 'Please add a contact email' });
    }
  
    // Check for errors
    if(errors.length > 0) {
      res.send( {
        errors,
        dname,
        price,
        category,
        headId
      });
    } 
    else {
      // Insert into table
      department.create({
        dname,
        price,
        category,
        headId
      })
        .then(stud => res.redirect('/open'))
        .catch(err => res.send(err))
    }
    });

    app.get('/delete/:id', (req, res) => {
        const id = req.params.id;
        department.destroy({
          where: { id: id }
        })
        .then(deleteddep => {
            res.redirect('/open');
          })
          .catch(err =>{
              res.send("0");
          })
    });

module.exports=app;