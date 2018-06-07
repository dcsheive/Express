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
    res.render("index.html");
})
app.post('/result',function(req,res){
    survey = {
        name: req.body.name,
        location: req.body.sel1,
        language: req.body.sel2,
        comment: req.body.comment,
    }
    res.render('indexresult', {result: survey})
})

// post route for adding a user
// tell the express app to listen on port 8000
app.listen(6789, function() {
    console.log("listening on port 6789");
});