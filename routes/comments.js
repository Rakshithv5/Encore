
const mysql=require("mysql");
const express=require("express");
var app=express();
const Sequelize = require('sequelize');
let comments=require('../models/comments')
const Op = Sequelize.Op;

app.get("/",(req,res)=>{
    comments.findAll()
    .then(com =>{
       // console.log(com);
        res.render("showComments",{dropdown:com});
    })
    .catch(err =>{ console.log(err)});
})


app.get('/:id', (req, res) => {
    const id = req.params.id;
    comments.findAll({
      where: { id: id }
    })
      .then(com => {
        res.send(com);
      });
  });

// Add a gig
app.post('/add', (req, res) => {
    let { teacher, body, studentId } = req.body;
    let errors = [];
  
    // Validate Fields
    if(!teacher) {
      errors.push({ text: 'Please add your teacher' });
    }
    if(!body) {
      errors.push({ text: 'Please add some body' });
    }
    if(!studentId) {
      errors.push({ text: 'Please add your id' });
    }
    
  
    // Check for errors
    if(errors.length > 0) {
      res.send( {
        teacher,
         body, 
         studentId
      });
    } 
    else {
      // Insert into table
      comments.create({
        teacher, 
        body, 
        studentId
      })
        .then(com => res.redirect('/open'))
        .catch(err => res.send(err))
    }
    });

    app.get('/delete/:id', (req, res) => {
        const id = req.params.id;
        comments.destroy({
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