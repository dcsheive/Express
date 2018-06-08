var express = require("express");
var path = require("path");
var session = require('express-session');
var app = express();
const server = app.listen(6789);
const io = require('socket.io')(server);
var bodyParser = require('body-parser');
var users = []
var messages = []
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
    req.session.idnum = users.length+1;
    res.render("index", {users:users, messages:messages, currentuser: req.session.idnum});
})
io.on('connection', function (socket) {
    socket.on('user',function(data){
        users.push({id:data.id, name:data.name})
    })
    socket.on('message',function(data){
        messages.push({name:users[data.id-1]['name'],message:data.message })
        io.emit('new_message',messages[messages.length-1]);
    })
});
