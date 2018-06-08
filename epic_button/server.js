var express = require("express");
var path = require("path");
var session = require('express-session');
var app = express();
const server = app.listen(6789);
const io = require('socket.io')(server);
var bodyParser = require('body-parser');
var count = 0
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
    res.render("index", {count:count});
})
io.on('connection', function (socket) {
    socket.on('click',function(){
        count += 1
        io.emit('updated_message', count);
    })
    socket.on('reset',function(){
        count = 0
        io.emit('updated_message', count);
    })
});
