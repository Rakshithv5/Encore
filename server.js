const mysql         = require("mysql");
const express       = require("express");
const bodyParser    = require("body-parser");
const OIDCStrategy  = require('passport-azure-ad').OIDCStrategy;
var session         = require('express-session');
var passport        = require('passport');
var flash           = require('connect-flash');
var cookieParser    = require('cookie-parser');
var LocalStrategy   = require('passport-local').Strategy;
var bcrypt          = require('bcrypt-nodejs');
const morgan        = require('morgan')

require('dotenv').config();

var app=express();
app.use(bodyParser.json());

app.use(morgan())

app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
 } ));

 let tenentId = process.env.TENENT_ID;

passport.use(new OIDCStrategy(
    { 
        identityMetadata: `https://login.microsoftonline.com/${tenentId}/v2.0/.well-known/openid-configuration`,
        clientID: process.env.CLIENT_ID,  
        responseType: 'code id_token', 
        responseMode: 'form_post',  
        redirectUrl: process.env.REDIRECT_URL,  
        allowHttpForRedirectUrl: true,  
        clientSecret: process.env.CLIENT_SECRET,  
        validateIssuer: false,
        passReqToCallback: false, 
    },
    (iss, sub, profile, accessToken, refreshToken, done) => 
    {   
         return done(null, profile); 
    }));

    
    passport.serializeUser((user, done) => 
    {   
        done(null, user); 
    }); 
    
    passport.deserializeUser((obj, done) => 
    {   
        done(null, obj); 
    });
    
app.use(express.static(__dirname + "/public"));

app.set('view engine', 'ejs');
app.use(express.static('./client/build'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

var database        =  require('./config/database')
const student       =  require("./models/student");
const payment       =  require("./models/payment");
const department    =  require("./models/department");
const mentor        =  require("./models/mentor");
const comments      =  require("./models/comments");


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
    .catch((err)=> console.log('Unable to connect to the database:' + err))
  

var studentroutes= require("./routes/students")
var departmentroutes=require('./routes/department')
var mentorroutes= require("./routes/mentors")
var paymentroutes= require("./routes/payment")
var commentsroutes= require("./routes/comments");
const { log } = require("console");

app.use("/student",studentroutes);
app.use("/department",departmentroutes);
app.use("/mentor",mentorroutes);
app.use("/payment",paymentroutes);
app.use("/comments",commentsroutes);

app.use(passport.initialize());
app.use(passport.session()); 

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
    {
        return next();
    }else{
        res.redirect("/open")
    }
}

app.get('/',(req,res)=>{
    res.render("home")
})


app.get('/login', passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }), (req, res) => {
    res.render('open');
});

app.get('/open',(req,res)=>{
    if (req.isAuthenticated()) {
        res.render("open")
    }
    else
        res.redirect('/login')
})


app.post('/open', passport.authenticate('azuread-openidconnect', {
    failureRedirect: '/login'
  }), (req, res) => {
    
//    res.redirect('/extra');



 res.redirect("/open")
  });


app.get('/add',isLoggedIn,(req,res)=>{
    res.render("addStudent")
})

app.get('/sports',isLoggedIn,(req,res)=>{
    res.render("sports")
})

app.get('/cultural',isLoggedIn,(req,res)=>{
    res.render("cultural")
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/open');
}

app.get('/addMentor',isLoggedIn,(req,res)=>{
    res.render("addMentor");
})

app.get('/addDepartment',isLoggedIn,(req,res)=>{
    res.render("addDepartment")
})

app.get('/showStudent',isLoggedIn,(req,res)=>{
    res.render("showStudent")
})

app.get('/showDepartment',isLoggedIn,(req,res)=>{
    res.render("showDepartment")
})

app.get('/sample',(req,res)=>{
    res.render("sample")
})

app.get('/showMentors',isLoggedIn,(req,res)=>{
    res.render("showMentor")
})

app.get('/error',isLoggedIn,(req,res)=>{
    res.render("error")
})

app.get('/addPayment/:category',isLoggedIn,(req,res)=>{
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


app.get('/addComment',isLoggedIn,(req,res)=>{
    res.render('addComment')
})

app.get('/error_mentor',(req,res)=>{
    res.render('error_mentor')
})

app.get('/showComments',isLoggedIn,(req,res)=>{
    res.render('showComments')
})

app.get('/searchStudent',isLoggedIn,(req,res)=>{
    res.render('searchStudent')
})


var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'db_users'
});




app.use(flash());

connection.connect((err)=>{
    if(!err)console.log("Connected");
})


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



app.listen(process.env.PORT || 3000);