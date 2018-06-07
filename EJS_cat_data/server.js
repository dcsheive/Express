var express = require('express');

var app = express();
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get("/cats", function (request, response){
    response.render('cats');
})
app.get('/cat1', function(request,response){
    cat_array = {
        'name': 'Marquese',
        'food': 'Spaget',
        'age': 5,
        'img':'cat1'

    }
    response.render('details',{cat: cat_array})
})
app.get('/cat2', function(request,response){
    cat_array = {
        'name': 'Mark',
        'food': 'Spaghetti',
        'age': 4,
        'img':'cat2'
    }
    response.render('details',{cat: cat_array})
})
app.get('/cat3', function(request,response){
    cat_array = {
        'name': 'Marshall',
        'food': 'Italian',
        'age': 6,
        'img':'cat3'

    }
    response.render('details',{cat: cat_array})
})
app.get('/cat4', function(request,response){
    cat_array = {
        'name': 'Michael',
        'food': 'Jimmy Johns',
        'age': 7,
        'img':'cat4'

    }
    response.render('details',{cat: cat_array})
})
app.get('/cat5', function(request,response){
    cat_array = {
        'name': 'Jimmy',
        'food': 'cat food',
        'age': 5,
        'img':'cat5'

    }
    response.render('details',{cat: cat_array})
})

app.listen(6789, function(){
    console.log('listening on port 6789')
})