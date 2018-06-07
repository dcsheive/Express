// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
var session = require('express-session');

// create the express app
var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
    if(!req.session.num){
        req.session.num = Math.trunc((Math.random()*100)) +1
    }
    if(!req.session.wrong){
        req.session.wrong = ""
    }
    if(!req.session.box){
        req.session.box = ''
    }
    res.render("index",{wrong: req.session.wrong, number: req.session.num, box:req.session.box});
})
app.post('/guess',function(req,res){
    if(isNaN(req.body.guessNum)){
        req.session.wrong = 'no'
        return res.redirect('/')
    }
    num = parseInt(req.body.guessNum);
    if (num < req.session.num){
        req.session.wrong = 'low'
        req.session.box = 'red'
    }
    else if (num > req.session.num){
        req.session.wrong = 'high'
        req.session.box = 'red'
    }
    else if( num == req.session.num){
        req.session.wrong = 'right'
        req.session.box = 'green'
    }
    return res.redirect('/')
})
app.post('/again', function(req,res){
    req.session.destroy()
    return res.redirect('/')
})

// post route for adding a user
// tell the express app to listen on port 8000
app.listen(6789, function() {
    console.log("listening on port 6789");
});