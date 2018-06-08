var express = require("express");
var path = require("path");
var session = require('express-session');
var app = express();
const server = app.listen(6789);
const io = require('socket.io')(server);
var bodyParser = require('body-parser');
var color = 'white'
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.render("index", {color:color});
})
io.on('connection', function (socket) {
    socket.on('color',function(data){
        color = data
        io.emit('updated_color', data);
    })
});
