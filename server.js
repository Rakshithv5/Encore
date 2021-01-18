const mysql=require("mysql");
const express=require("express");
const bodyParser=require("body-parser");
var session  = require('express-session');
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var LocalStrategy   = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
const morgan = require('morgan')



var app=express();
app.use(bodyParser.json());

app.use(morgan())


app.use(express.static(__dirname + "/public"));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

var database =require('./config/database')
const student=  require("./models/student");
const payment=  require("./models/payment");
const department=  require("./models/department");
const mentor=  require("./models/mentor");
const comments=  require("./models/comments");


student.hasMany(payment);
department.hasMany(payment);
payment.belongsTo(student);
payment.belongsTo(student);
student.hasMany(comments);
comments.belongsTo(student);

department.hasMany(mentor);
mentor.belongsTo(department);



// student.sync({force:true}).then(() => {
//     console.log('table created');
// });

// department.sync({force:true}).then(() => {
//     console.log('table created');
// });
// payment.sync({force:true}).then(() => {
//     console.log('table created');
// });

// mentor.sync({force:true}).then(() => {
//     console.log('table created');
// });

// comments.sync({force:true}).then(() => {
//     console.log('table created');
// });



 database.authenticate()
    .then(()=> console.log('Connection has been established successfully.'))
    .catch((err)=> console.log('Unable to connect to the database:'))
  

var studentroutes= require("./routes/students")
var departmentroutes=require('./routes/department')
var mentorroutes= require("./routes/mentors")
var paymentroutes= require("./routes/payment")
var commentsroutes= require("./routes/comments")

app.use("/student",studentroutes);
app.use("/department",departmentroutes);
app.use("/mentor",mentorroutes);
app.use("/payment",paymentroutes);
app.use("/comments",commentsroutes);

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
    {
        return next();
    }
    console.log(req.isAuthenticated());
    
	res.redirect('/open');
}




app.get('/',(req,res)=>{
    res.render("home")
})

app.get('/login',(req,res)=>{
    res.render("login")
})

app.get('/open',(req,res)=>{
    res.render("open")
})

app.get('/add',(req,res)=>{
    res.render("addStudent")
})

app.get('/sports',(req,res)=>{
    res.render("sports")
})

app.get('/cultural',(req,res)=>{
    res.render("cultural")
})

app.get('/addMentor',isLoggedIn,(req,res)=>{
        res.render("addMentor")
    // else res.redirect('/login')
})

app.get('/addDepartment',isLoggedIn,(req,res)=>{
    res.render("addDepartment")
})

app.get('/showStudent',(req,res)=>{
    res.render("showStudent")
})

app.get('/showDepartment',(req,res)=>{
    res.render("showDepartment")
})

app.get('/sample',(req,res)=>{
    res.render("sample")
})

app.get('/showMentors',(req,res)=>{
    res.render("showMentor")
})

app.get('/error',(req,res)=>{
    res.render("error")
})

app.get('/addPayment/:category',(req,res)=>{
    var category=req.params.category;
    department.findAll({
        where: {category : category }
      })
        .then(dep => {
            res.render("addPayment",{dep:dep})
        //   res.send(dep);
        });
    //res.render("addPayment")
})


app.get('/addComment',(req,res)=>{
    res.render('addComment')
})

app.get('/error_mentor',(req,res)=>{
    res.render('error_mentor')
})

app.get('/showComments',(req,res)=>{
    res.render('showComments')
})

app.get('/searchStudent',(req,res)=>{
    res.render('searchStudent')
})



var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'db_users'
});

app.use(session({
	secret: 'secret123',
	resave: false,
    saveUninitialized: true,
    cookie: { secure: false },

 } )); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

connection.connect((err)=>{
    if(!err)console.log("Connected");
})

passport.serializeUser(function(user, done) {
    done(null, user.id);
    // console.log(user);
});

passport.deserializeUser(function(id, done) {
    
    connection.query("SELECT * FROM tbl_users WHERE id = ? ",[id], function(err, rows){
        done(err, rows[0]);
    });

});

passport.use(
    'local-signup',
    new LocalStrategy({
        username : 'username',
        password: 'password',
        passReqToCallback : true 
    },
    function(req, username, password, done) {
       
       
        connection.query("SELECT * FROM tbl_users WHERE username = ?",[username], function(err, rows) {
            if (err)
                return done(err);
            if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {
               
                var newUserMysql = {
                    username: username,
                    password: bcrypt.hashSync(password, null, null)  
                };

                var insertQuery = "INSERT INTO tbl_users ( username, password ) values (?,?)";
                
                connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],function(err, rows) {
                    newUserMysql.id = rows.insertId;
                    // console.log(newUserMyss
                    return done(null,newUserMysql);
                });
              
            }
        });
       
    })
);

passport.use(
    'local-login',
    new LocalStrategy({
       
        username: 'username',
        password: 'password',
        passReqToCallback : true 
    },
    function(req, username, password, done) { 
       
        connection.query("SELECT * FROM tbl_users WHERE username = ?",[username], function(err, rows){
            if (err)
                return done(err);
            if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'No user found.')); 
            }

            
            if (!bcrypt.compareSync(password, rows[0].password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

           
            return done(null, rows[0]);
        });
       
    })
);

app.get('/login', function(req, res) {

    
    res.render('login.ejs', { message: req.flash('loginMessage') });
});


app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/open',
    failureRedirect : '/login', 
    failureFlash : true 
}),
function(req, res) {
    console.log("hello");

    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
res.redirect('/');
});


app.get('/signup', function(req, res) {
    
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});


app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', 
    failureRedirect : '/signup', 
    failureFlash : true 
}));


// app.get('/profile', isLoggedIn, function(req, res) {
//     res.render('profile.ejs', {
//         user : req.user 
//     });
// });


app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



app.listen(3000);