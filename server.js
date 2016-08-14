var express = require('express');
var app = express();

var swig = require('swig');
swig.setDefaults({ cache: false });

app.set('views','./views');
app.set('view engine','html');
app.engine('html',swig.renderFile);

var db = require('./db/db');

db.connect();//don't connect here-- separate out this code into app.js and server.js
//if your going to test connection, do it in server.js

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

var categoriesRouter = require('./routes/categories');

app.use('/categories',categoriesRouter);

app.get('/', function(req,res){
	db.getCategories().then(function(categories){
		res.render('index', { categories: categories });
	})
  .catch(function(err){
    next(err);
  });
});

//use environment variables and connect in separate file
app.listen(3000,function(err)
{
	if (err)
		console.error(err);
	console.log("app listening");
})
