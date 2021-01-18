
const mysql=require("mysql");
const express=require("express");
var app=express();
const Sequelize = require('sequelize');
let student=require('../models/student')
const Op = Sequelize.Op;
let department=require('../models/department')
let payment = require('../models/payment')

app.get("/",(req,res)=>{
    student.findAll({
      include:[{
        model:payment,
        as:"payments",
        attributes:['id','dname','start_date']
      }],
      raw:true
    })
    .then(result =>{
      // console.log(result);
       res.render("showStudent",{dropdown:result})
      // res.send(result)
    })
    .catch(err =>{ console.log(err)});
})


app.get("/adds",(req,res)=>{
  department.findAll()
  .then(result =>{
     // console.log(stud);
     res.send(result)
  })
  .catch(err =>{ console.log(err)});
})

app.get("/addc",(req,res)=>{
  department.findAll()
  .then(result =>{
     // console.log(stud);
     res.render('cultural', {dropdown: result})
  })
  .catch(err =>{ console.log(err)});
})






app.post('/num', (req, res) => {
    const id = req.body.id;
    student.findAll({
      where: { id: id },
      include:[{
        model:payment,
        as:"payments",
        attributes:['id','dname','start_date']
      }],
      raw:true
    })
      .then(stud => {
        res.render('showStudent',{dropdown:stud});
      });

      
  });

// Add a gig
app.post('/add', (req, res) => {
    let { sname, sphone, age, contact_email, gender} = req.body;
    // const sname = req.body.sname
    // const sphone = req.body.sphone
    // const age = req.body.age
    // const contact_email = req.body.contact_email
    // const gender = req.body.gender
    // const state = req.body.state

    console.log("HELLO GUYS");
    

    let errors = [];
  
    // Validate Fields
    if(!sname) {
      errors.push({ text: 'Please add your name' });
    }
    if(!sphone) {
      errors.push({ text: 'Please add some phone number' });
    }
    if(!age) {
      errors.push({ text: 'Please add your age' });
    }
    if(!contact_email) {
      errors.push({ text: 'Please add a contact email' });
    }
    if(!gender) {
      errors.push({ text: 'Please add your gender' });
    }
    
  
    // Check for errors
    if(errors.length > 0) {
      res.send( {
        errors,
        sname,
        sphone,
        age,
        contact_email,
        gender,
      });
    } 
    else {
      // Insert into table
      student.create({
        sname,
        sphone,
        age,
        contact_email,
        gender,
      })
        .then(stud => res.redirect("/open"))
        .catch(err => res.send(err))
    }
    });
    


    app.post('/delete', (req, res) => {
        const id = req.body.id;
        console.log(id);
        student.destroy({
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