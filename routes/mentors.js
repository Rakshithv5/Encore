
const mysql=require("mysql");
const express=require("express");
var app=express();
const Sequelize = require('sequelize');
let mentors=require('../models/mentor')
const Op = Sequelize.Op;

app.get("/",(req,res)=>{
    mentors.findAll()
    .then(ment =>{
       // console.log(ment);
        res.render('showMentors',{dropdown:ment});
    })
    .catch(err =>{ console.log(err)});
})


app.get('/:id', (req, res) => {
    const id = req.params.id;
    mentors.findAll({
      where: { id: id }
    })
      .then(ment => {
        res.send(ment);
      });
  });

// Add a gig
app.post('/add', (req, res) => {
    let { mname, mphone,address, age,gender, contact_email,departmentId } = req.body;
    let errors = [];
  
    // Validate Fields
    if(!mname) {
      errors.push({ text: 'Please add your name' });
    }
    if(!mphone) {
      errors.push({ text: 'Please add some phone number' });
    }
    if(!address) {
        errors.push({ text: 'Please add address' });
      }
    if(!age) {
      errors.push({ text: 'Please add your age' });
    }
    if(!gender) {
      errors.push({ text: 'Please add address' });
  }
    if(!contact_email) {
      errors.push({ text: 'Please add a contact email' });
    }
  
    // Check for errors
    if(errors.length > 0) {
      res.send( {
        errors,
        mname,
        mphone,
        address,
        age,
        gender,
        contact_email
      });
    } 
    else {
      // Insert into table
      mentors.create({
        mname,
        mphone,
        address,
        age,
        gender,
        contact_email,
        departmentId
      })
        .then(ment => res.redirect('/open'))
        .catch(err => res.redirect('/error'))
    }
    });

    app.get('/delete/:id', (req, res) => {
        const id = req.params.id;
        mentors.destroy({
          where: { id: id }
        })
        .then(deletedMentor => {
            res.redirect('/open')
          })
          .catch(err =>{
              res.send("something went wrong!!! Check your id");
          })
    });

module.exports =app;